import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as XLSX from 'xlsx';

import { CateraPrestamosService } from '../../../services/vbcoop/catera-prestamos-service';
@Component({
  selector: 'app-cartera-prestamos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cartera-prestamos.html',
  styleUrl: './cartera-prestamos.css',
})
export class CarteraPrestamos implements OnInit {
  carteraPrestamos: any[] = [];

  listaPeriodos: any[] = [];
  periodoSeleccionado: string = '';

  periodos$!: Observable<string[]>;
  currentPage: number = 1;
  totalPages: number = 1;
  totalRecords: number = 0;

  // Filtros vinculados a los inputs del HTML
  searchTerm: string = '';
  monedaSeleccionada: string = '';
  productoSeleccionado: string = '';
  condicionSeleccionado: string = '';
  periodo: string = '';


  // Nueva variable de control para saber si ya buscaron al menos una vez
  busquedaRealizada: boolean = false;
  loading: boolean = false;

  constructor(private carteraPrestamosService: CateraPrestamosService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarCombos();
  }
  cargarCombos(): void {
    //    this.periodos$ = this.carteraPasivosService.getPeriodosDisponibles();
    this.carteraPrestamosService.getPeriodosDisponibles().subscribe({
      next: (data) => {
        this.listaPeriodos = data || [];
        const periodoActivo = this.listaPeriodos.find(p => p.activo === true);
        this.periodoSeleccionado = periodoActivo.periodo;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar periodos:', err);
      }
    });

    this.condicionSeleccionado = 'VIGENTE';
  }
  ejecutarBusqueda(): void {
    this.currentPage = 1; // Reseteamos a la primera página en cada nueva búsqueda
    this.busquedaRealizada = true;
    this.cargarTabla();
  }
  cargarTabla(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.carteraPrestamosService.getCarteraPrestamosPaginados(
      this.currentPage,
      20,
      this.searchTerm,
      this.monedaSeleccionada,
      this.productoSeleccionado,
      this.periodoSeleccionado,
      this.condicionSeleccionado
    ).subscribe({
      next: (res) => {
        this.carteraPrestamos = res.data || [];
        const dataCruda = res.data || [];
        this.carteraPrestamos = dataCruda.map((item: any) => {
          // Asegúrate de que estos nombres coincidan exactamente con las columnas de tu BD (ej: monto_desembolsado, saldo_capital)
          const desembolsado = Number(item.desembolso) || 0;
          const saldo = Number(item.saldocapitalmo) || 0;
          let pctPagado = 0;
          if (desembolsado > 0) {
            // Fórmula: ((Desembolsado - Saldo) / Desembolsado) * 100
            pctPagado = ((desembolsado - saldo) / desembolsado) * 100;
            // Forzamos límites seguros entre 0% y 100% para evitar desbordes visuales
            pctPagado = Math.min(Math.max(pctPagado, 0), 100);
          }

          return {
            ...item,
            porcentajePagado: pctPagado,
            porcentajeFaltante: 100 - pctPagado
          };
        });
        this.totalPages = res.meta?.totalPages || 1;
        this.totalRecords = res.meta?.total || 0;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al consultar movimientos prestamos:', err);
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
    this.periodo = '';
    this.condicionSeleccionado = 'VIGENTE';
    this.carteraPrestamos = [];
    this.currentPage = 1;
    this.totalPages = 1;
    this.totalRecords = 0;
    this.busquedaRealizada = false; // Regresa al estado inicial informativo
    this.cdr.detectChanges();
  }

  // Función de Exportación a Excel nativa
  exportarAExcel(): void {
    this.carteraPrestamosService.getCarteraPrestamosParaExportar(this.searchTerm, this.monedaSeleccionada, this.productoSeleccionado, this.periodoSeleccionado, this.condicionSeleccionado)
      .subscribe({
        next: (res) => {
          if (!res || res.length === 0) return;
          if (this.carteraPrestamos.length === 0) {
            alert('No hay datos en la tabla para exportar.');
            return;
          }
          const formatearFecha = (fechaInput: any): string => {
            if (!fechaInput) return '';

            // Si el backend lo manda como Date u objeto, lo pasamos a string ISO
            const fechaStr = typeof fechaInput === 'string'
              ? fechaInput
              : new Date(fechaInput).toISOString();

            // fechaStr suele venir como "YYYY-MM-DD..." (ej: "2010-05-27T00:00:00.000Z")
            if (fechaStr.length >= 10) {
              const partes = fechaStr.slice(0, 10).split('-'); // Rompe en ['YYYY', 'MM', 'DD']
              if (partes.length === 3) {
                return `${partes[2]}/${partes[1]}/${partes[0]}`; // Retorna "DD/MM/YYYY" exactamente
              }
            }

            return '';
          };
          // Mapeamos las columnas para que salgan con nombres limpios en el reporte de la cooperativa
          //	"totalitem"	"totalmov"	"fecdeposito"	"fecultmov"	"condicion"

          const datosExportar = res.map(item => ({
            'Tipo': item.tipo,
            'Cuenta': item.idcdp,
            'ID Socio': item.idsocio,
            'Socio': item.nombre,
            'Documento': item.numdoc,
            'Producto': item.descri,
            'Moneda': item.moneda === 'S' ? 'Soles' : 'Dólares',
            'Fecha': formatearFecha(item.fecing),
            'Capital MO': item.cap_originalmo * (1),
            'Capital MN': item.cap_originalmn * (1),
            'pagointeres_periodomo': item.pagointeres_periodomo * (1),
            'pagointeres_periodomn': item.pagointeres_periodomn * (1),
            'saldo_periodomo': item.saldo_periodomo * (1),
            'saldo_periodomn': item.saldo_periodomn * (1),
            'plazo': item.plazo,
            'tasa': item.tasa,
            'tasa Anual': item.tasaanual,
            'item': item.totalitem,
            '# Movimientos': item.totalmov,
            'Fec Ult Movimiento': formatearFecha(item.fecultmov),
            'Condicion': item.condicion
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
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Movimientos Prestamos');

          // Descarga el Excel
          XLSX.writeFile(workbook, `Reporte_carteraPrestamos_${new Date().toISOString().slice(0, 10)}.xlsx`);
        }
        ,
        error: (err) => console.error('Error al exportar ahorros SBS', err)
      });
  }
} 
