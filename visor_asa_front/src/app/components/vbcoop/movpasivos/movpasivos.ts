import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as XLSX from 'xlsx';

import { MovpasivosService } from '../../../services/vbcoop/movpasivos-service';
@Component({
  selector: 'app-movpasivos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movpasivos.html',
  styleUrl: './movpasivos.css',
})
export class Movpasivos implements OnInit {
  movPasivos: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  totalRecords: number = 0;

  // Filtros vinculados a los inputs del HTML
  searchTerm: string = '';
  monedaSeleccionada: string = '';
  productoSeleccionado: string = '';
  fechaDesde: string = '';
  fechaHasta: string = '';

  // Nueva variable de control para saber si ya buscaron al menos una vez
  busquedaRealizada: boolean = false;
  loading: boolean = false;

  constructor(
    private movpasivosService: MovpasivosService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Initialization logic here
  }

  ejecutarBusqueda(): void {
    this.currentPage = 1; // Reseteamos a la primera página en cada nueva búsqueda
    this.busquedaRealizada = true;
    this.cargarTabla();
  }

  // Modificado para usar directamente el estado actual de las variables del componente
  cargarTabla(): void {
    this.loading = true;
    this.cdr.detectChanges();
    // Convertimos las strings de fecha a objetos Date solo si tienen valor
    const desdeDate = this.fechaDesde ? new Date(this.fechaDesde) : undefined;
    const hastaDate = this.fechaHasta ? new Date(this.fechaHasta) : undefined;

    this.movpasivosService.getMovpasivosPaginados(
      this.currentPage,
      20,
      this.searchTerm,
      this.monedaSeleccionada,
      this.productoSeleccionado,
      desdeDate,
      hastaDate
    ).subscribe({
      next: (res) => {
        this.movPasivos = res.data || [];
        this.totalPages = res.meta?.totalPages || 1;
        this.totalRecords = res.meta?.total || 0;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al consultar movimientos pasivos:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Cambiar de página respetando los filtros actuales
  cambiarPagina(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.cargarTabla();
    }
  }

  limpiarFiltros(): void {
    this.searchTerm = '';
    this.monedaSeleccionada = '';
    this.productoSeleccionado = '';
    this.fechaDesde = '';
    this.fechaHasta = '';
    this.movPasivos = [];
    this.currentPage = 1;
    this.totalPages = 1;
    this.totalRecords = 0;
    this.busquedaRealizada = false; // Regresa al estado inicial informativo
    this.cdr.detectChanges();
  }

  // Función de Exportación a Excel nativa
  exportarAExcel(): void {
    if (this.movPasivos.length === 0) {
      alert('No hay datos en la tabla para exportar.');
      return;
    }

    // Mapeamos las columnas para que salgan con nombres limpios en el reporte de la cooperativa
    const datosExportar = this.movPasivos.map(item => ({
      'ID Socio': item.idsocio,
      'Socio': item.nombre,
      'Documento': item.numdoc,
      'Moneda': item.moneda === 'S' ? 'Soles' : 'Dólares',
      'Tipo': item.tipo,
      'Cuenta': item.idcdp,
      'Producto': item.descri,
      'Fecha': item.fecha ? new Date(item.fecha) : '',
      'Operación': item.operacion,
      'Movimiento': item.car_abo === 'C' ? 'Cargo' : 'Abono',
      'Capital': item.capital * (1),
      'Interes': item.interes * (1),
      'Total': item.car_abo === 'C' ? item.total * (-1) : item.total * (1),
      'NumOperacion': item.idnumope,
      'Usuario': item.idusuario,
      'Plazo': item.plazo,
      'tasa': item.tasa,
      'tasa Anual': item.tasaanual,
      'F. Ingreso': item.fecing ? new Date(item.fecing) : '',
      'F. Emision': item.fechaemi ? new Date(item.fechaemi) : '',
      'F. Vencimiento': item.fechaven ? new Date(item.fechaven) : '',
      'F. Cancelacion': item.fechacan ? new Date(item.fechacan) : '',




    }));

    const worksheet = XLSX.utils.json_to_sheet(datosExportar);
    worksheet['!cols'] = [
      { wch: 15 }, { wch: 50 }, { wch: 15 }, { wch: 10 },
      { wch: 10 }, { wch: 15 }, { wch: 20 }, { wch: 15 },
      { wch: 10 }, { wch: 10 }, { wch: 15 }, { wch: 15 }
      , { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 },
      { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 },
      { wch: 15 }, { wch: 15 }
    ];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Movimientos Pasivos');

    // Descarga el Excel
    XLSX.writeFile(workbook, `Reporte_MovPasivos_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }
}