import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as XLSX from 'xlsx';

import { CreditosService } from '../../../services/sbs/creditos-service';

@Component({
  selector: 'app-creditos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './creditos.html',
  styleUrl: './creditos.css',
})
export class Creditos implements OnInit {
  creditos: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  totalRecords: number = 0;
  private searchSubject = new Subject<string>();
  monedaSeleccionada: string = '';

  constructor(
    private creditosService: CreditosService,
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
    this.creditosService.getCreditosPaginados(this.currentPage, 20, this.searchTerm, this.monedaSeleccionada)
      .subscribe({
        next: (res) => {
          this.creditos = res.data;
          this.totalPages = res.meta.totalPages;
          this.totalRecords = res.meta.total; // Almacenamos el conteo total

          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al consultar créditos SBS', err)
      });
  }

  exportarExcel(): void {
    this.creditosService.getCreditosParaExportar(this.searchTerm, this.monedaSeleccionada).subscribe({
      next: (dataCompleta) => {
        if (!dataCompleta || dataCompleta.length === 0) return;

        // Mapeo seguro para evitar advertencias de tipado implícito en Angular
        const datosMapeados = dataCompleta.map((registro: any) => ({
          'Credito': registro.idpagare || '---',
          'IdSocio': registro.idsocio || '---',
          'Socio / Razón Social': registro.socio || '---',
          'Fecha Ingreso': this.formatearFecha(registro.femision),
          'MN': registro.moneda === 1 ? 'S/.' : '$',
          'Saldo Disponible M.O': registro.saldo ? Number(registro.saldo) : 0.00,
          'Saldo Disponible M.N': registro.saldomn ? Number(registro.saldomn) : '',
          //  'R Provi': registro.rprovi,
          'Provision': registro.provision ? Number(registro.provision) : '',
          'Saldo 24.12.31': registro.saldo241231 ? Number(registro.saldo241231) : '',
          'Saldo 2025': registro.saldo2025 ? Number(registro.saldo2025) : '',
          'Provision 2025': registro.provision2025 ? Number(registro.provision2025) : '',
          'Saldo 2025.12.31': registro.saldo20251231 ? Number(registro.saldo20251231) : '',

        }));

        const worksheet = XLSX.utils.json_to_sheet(datosMapeados, { cellStyles: true });

        for (const cellRef in worksheet) {
          if (cellRef[0] === '!') continue; // Ignora los metadatos internos de la hoja

          const cell = worksheet[cellRef];

          // Si la celda contiene un valor numérico real
          if (typeof cell.v === 'number') {
            cell.t = 'n';
            cell.z = '#,##0.00';
          }
        }
        worksheet['!cols'] = [
          { wch: 15 }, { wch: 15 }, { wch: 45 },
          { wch: 15 }, { wch: 10 },// { wch: 20 },
          { wch: 15 }, { wch: 15 }, { wch: 15 },
          { wch: 15 }, { wch: 15 }, { wch: 15 },
          { wch: 15 }]; // Formato de anchos de celda

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Saldos de Créditos');
        XLSX.writeFile(workbook, 'Créditos_Socios_SBS.xlsx');
      }
    });
  }

  formatearFecha(fechaStr: any): string {
    if (!fechaStr || fechaStr === '---') return '---';
    try {
      const fecha = new Date(fechaStr);
      if (isNaN(fecha.getTime())) return fechaStr; // Si ya venía formateada, la deja igual

      const dia = String(fecha.getDate()).padStart(2, '0');
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const anio = fecha.getFullYear();
      return `${dia}/${mes}/${anio}`;
    } catch {
      return '---';
    }
  }
}
