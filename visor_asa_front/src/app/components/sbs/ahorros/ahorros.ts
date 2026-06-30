import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as XLSX from 'xlsx';

import { AhorrosService } from '../../../services/sbs/ahorros-service';

@Component({
  selector: 'app-ahorros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ahorros.html',
  styleUrl: './ahorros.css',
})
export class Ahorros implements OnInit {
  ahorros: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  totalRecords: number = 0;
  private searchSubject = new Subject<string>();
  monedaSeleccionada: string = '';
  constructor(
    private ahorrosService: AhorrosService,
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
    this.ahorrosService.getAhorrosPaginados(this.currentPage, 20, this.searchTerm, this.monedaSeleccionada)
      .subscribe({
        next: (res) => {
          this.ahorros = res.data;
          this.totalPages = res.meta.totalPages;
          this.totalRecords = res.meta.total; // Almacenamos el conteo total

          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al consultar ahorros SBS', err)
      });
  }

  exportarExcel(): void {
    this.ahorrosService.getAhorrosParaExportar(this.searchTerm, this.monedaSeleccionada)
      .subscribe({
        next: (res) => {
          if (!res || res.length === 0) return;

          // 1. MAPEAMOS LOS DATOS PARA DARLES FORMATO Y CAMBIAR LA MONEDA
          const datosMapeados = res.map((item: any) => ({
            'Cuenta': item.cuenta || '---',
            'Socio / Nombres': item.nombres || '---',
            'ID Socio': item.idsocioc || '---',
            // 🟢 AQUÍ CAMBIAMOS EL 1,2 A S/. o $
            'Moneda': item.moneda == 1 ? 'S/.' : '$',

            // Aseguramos que los saldos e intereses viajen como números puros
            'Saldo 2023': item.saldo230831 ? Number(item.saldo230831) : 0,
            'Factor 2023': item.factor2023 ? Number(item.factor2023) : 0,
            'Interés 2023': item.interes2023 ? Number(item.interes2023) : 0,
            'Saldo 2024': item.saldo241231 ? Number(item.saldo241231) : 0,
            'Factor 2024': item.factor2024 ? Number(item.factor2024) : 0,
            'Interés 2024': item.interes2024 ? Number(item.interes2024) : 0,
            'Saldo 2025': item.saldo251231 ? Number(item.saldo251231) : 0
          }));

          // 2. CREAMOS LA HOJA CON LOS DATOS MAPEADOS HABILITANDO LOS ESTILOS
          const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosMapeados, { cellStyles: true });

          for (const cellRef in worksheet) {
            if (cellRef[0] === '!') continue; // Ignoramos metadatos internos de la hoja

            const cell = worksheet[cellRef];

            if (typeof cell.v === 'number') {
              cell.t = 'n'; // Forzamos tipo "Number" para evitar advertencias de Excel

              // Extraemos la letra de la columna para identificarla (A, B, C, D...)
              const columna = cellRef.replace(/[0-9]/g, '');

              // Basándonos en tu mapeo de columnas anteriores:
              // F = Factor 2023  |  I = Factor 2024
              if (columna === 'F' || columna === 'I') {
                cell.z = '0.0000';   // 💥 Máscara estricta de 4 decimales para los Factores
              } else {
                cell.z = '#,##0.00'; // Máscara de 2 decimales con comas de miles para Saldos e Intereses
              }
            }
          }

          // 4. OPCIONAL: Ajustamos el ancho de las columnas para que no se corte el texto
          worksheet['!cols'] = [
            { wch: 18 }, { wch: 40 }, { wch: 15 }, { wch: 10 },
            { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 },
            { wch: 15 }, { wch: 15 }, { wch: 15 }
          ];

          // 5. PROCESO DE DESCARGA ORIGINAL TRADICIONAL
          const workbook: XLSX.WorkBook = { Sheets: { 'Ahorros': worksheet }, SheetNames: ['Ahorros'] };
          const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

          const url = window.URL.createObjectURL(data);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'ahorros_consolidado_sbs.xlsx';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => console.error('Error al exportar ahorros SBS', err)
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

