import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SociosService } from '../../../services/vbcoop/socios-service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-socios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './socios.html',
  styleUrl: './socios.css',
})
export class Socios implements OnInit {
  private sociosService = inject(SociosService);
  private cdr = inject(ChangeDetectorRef);

  socios: any[] = [];
  searchTerm: string = '';

  // Estado inicial de la paginación
  currentPage: number = 1;
  pageSize: number = 20;
  totalRecords: number = 0;
  totalPages: number = 0;

  // Manejo de debounce para optimizar el buscador de socios (+1000 registros)
  private searchSubject = new Subject<string>();

  ngOnInit(): void {
    this.loadSocios();

    // Configuración del buscador: espera 400ms después de que el usuario deja de escribir
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1; // Volvemos a la página 1 en cada nueva búsqueda
      this.loadSocios();
    });
  }

  loadSocios(): void {
    this.sociosService.getSocios(this.currentPage, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response) => {
          this.socios = response.data;
          this.totalRecords = response.meta.total;
          this.totalPages = response.meta.totalPages;

          // Previene desfases visuales en el renderizado standalone
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al consultar el padrón de socios', err)
      });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadSocios();
    }
  }

  exportarExcel(): void {
    if (this.socios.length === 0) {
      alert('No hay datos disponibles para exportar.');
      return;
    }
    const filtroActual = this.searchTerm; // Ajusta al nombre de tu variable de filtro

    // 2. Llamamos al servicio pidiéndole TODO lo filtrado sin paginar (ej. pasando limite: 0 o todo: true)
    this.sociosService.getSociosParaExportar(filtroActual).subscribe({
      next: (todosLosSociosFiltrados) => {
        if (!todosLosSociosFiltrados || todosLosSociosFiltrados.length === 0) {
          alert('No hay datos filtrados para exportar.');
          return;
        }
        // Mapeamos los datos para cambiar las claves técnicas por títulos bonitos en el Excel
        const datosMapeados = todosLosSociosFiltrados.map((socio: any) => ({
          'Código de Socio': socio.idsocio,
          'Apellidos y Nombres': socio.paterno + ' ' + socio.materno + ', ' + socio.nombres, // Ajusta a tus propiedades reales
          'N° Documento': socio.numdoc || socio.ruc || '---',
          'Fecha Ingreso': this.formatearFecha(socio.fecing),
          'Fecha Retiro': this.formatearFecha(socio.fecret) || '---'
        }));
        // 4. Construimos y descargamos el reporte completo
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosMapeados);
        const maxAnios = [{ wch: 15 }, { wch: 60 }, { wch: 15 }, { wch: 15 }, { wch: 15 }];
        worksheet['!cols'] = maxAnios;

        const workbook: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Padrón de Socios');
        XLSX.writeFile(workbook, 'Padron_Socios_Filtrados.xlsx');
      },
      error: (err) => console.error('Error al obtener la data completa para Excel', err)
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
