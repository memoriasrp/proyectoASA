import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AportacionesService } from '../../../services/sbs/aportaciones';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-aportaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './aportaciones.html',
  styleUrl: './aportaciones.css',
})
export class Aportaciones implements OnInit {
  aportaciones: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  totalRecords: number = 0;
  private searchSubject = new Subject<string>();

  constructor(private aportacionesService: AportacionesService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarTabla();
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1; // Volvemos a la página 1 en cada nueva búsqueda
      this.cargarTabla();
    });
  }
  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.cargarTabla();
    }
  }
  cargarTabla() {
    this.aportacionesService.getAportacionesPaginadas(this.currentPage, 20, this.searchTerm)
      .subscribe({
        next: (res) => {
          this.aportaciones = res.data;
          this.totalPages = res.meta.totalPages;
          this.totalRecords = res.meta.total; // Almacenamos el conteo total

          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al consultar aportaciones SBS', err)
      });
  }

  exportarExcel(): void {
    this.aportacionesService.getAportacionesParaExportar(this.searchTerm).subscribe({
      next: (dataCompleta) => {
        if (!dataCompleta || dataCompleta.length === 0) return;

        // Mapeo seguro para evitar advertencias de tipado implícito en Angular
        const datosMapeados = dataCompleta.map((registro: any) => ({
          'Código': registro.codigo || '---',
          'Socio / Razón Social': registro.socio || '---',
          'Saldo Disponible (S/.)': registro.saldo ? Number(registro.saldo) : 0.00
        }));

        const worksheet = XLSX.utils.json_to_sheet(datosMapeados);
        worksheet['!cols'] = [{ wch: 15 }, { wch: 45 }, { wch: 20 }]; // Formato de anchos de celda

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Saldos de Aportaciones');
        XLSX.writeFile(workbook, 'Aportaciones_Socios_SBS.xlsx');
      }
    });
  }
}
