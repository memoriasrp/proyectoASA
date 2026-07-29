import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as XLSX from 'xlsx-js-style';

import { CateraPrestamosService } from '../../../services/vbcoop/catera-prestamos-service';

import { MovactivosService } from '../../../services/vbcoop/movactivos-service';
@Component({
  selector: 'app-registro-pago',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-pago.html',
  styleUrl: './registro-pago.css',
})
export class RegistroPago implements OnInit {
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

  mostrarModal = false;
  pagareSeleccionado: any = null;
  detalle: string = '';
  cargando: boolean = false;

  cuotasPendientes: number[] = [];
  cuotaSeleccionada: number | null = null;
  capital: number | null = null;
  interes: number | null = null;
  mora: number | null = null;
  seguro: number | null = null;
  aporte: number | null = null;
  fecha: string = '';
  idnumope: string = '';

  constructor(private carteraPrestamosService: CateraPrestamosService,
    private movactivosService: MovactivosService,
    private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.cargarCombos();
    this.ejecutarBusqueda();
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
      next: (res: any) => {
        // 🟢 DETECCION FLEXIBLE: Si 'res' es directamente el array o viene en 'res.data'
        const dataCruda = Array.isArray(res) ? res : (res.data || []);

        this.carteraPrestamos = dataCruda.map((item: any) => {
          const desembolsado = Number(item.desembolso) || 0;
          const saldo = Number(item.saldocapitalmo) || 0;
          let pctPagado = 0;

          if (desembolsado > 0) {
            pctPagado = ((desembolsado - saldo) / desembolsado) * 100;
            pctPagado = Math.min(Math.max(pctPagado, 0), 100);
          }

          return {
            ...item,
            porcentajePagado: pctPagado,
            porcentajeFaltante: 100 - pctPagado
          };
        });

        this.totalPages = res.meta?.totalPages || 1;
        this.totalRecords = res.meta?.total || dataCruda.length;

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


  abrirModalPago(item: any) {
    this.pagareSeleccionado = item;
    this.generarCuotasPendientes();
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  generarCuotasPendientes(): void {
    this.cuotasPendientes = [];
    const cuotasPagadas = parseInt(this.pagareSeleccionado?.cuotas_pagadas, 10) || 0;
    const inicio = cuotasPagadas + 1;
    for (let i = inicio; i <= this.pagareSeleccionado.plazo; i++) {
      this.cuotasPendientes.push(i);
    }

    // Opcional: preseleccionar la primera cuota pendiente (ej. Cuota 51)
    if (this.cuotasPendientes.length > 0) {
      this.cuotaSeleccionada = this.cuotasPendientes[0];
    }
  }



  // Propiedad calculada para el total
  get totalPagar(): number {
    const c = Number(this.capital) || 0;
    const i = Number(this.interes) || 0;
    const m = Number(this.mora) || 0;
    const s = Number(this.seguro) || 0;
    const a = Number(this.aporte) || 0;

    return c + i + m + s + a;
  }

  // Método opcional para validar/formatear a 2 decimales en el evento (blur)
  validarDecimal(campo: 'capital' | 'interes' | 'mora' | 'seguro' | 'aporte'): void {
    if (this[campo] !== null && this[campo] !== undefined) {
      // Redondea a 2 decimales
      this[campo] = parseFloat(Number(this[campo]).toFixed(2));
      if (campo == 'capital' && this[campo] > this.pagareSeleccionado.saldocapitalmo) {
        alert("EL MONTO A PAGAR DEL CAPITAL NO PUEDO SER MAYOR AL SALDO CAPITAL");
        this[campo] = parseFloat(Number(this.pagareSeleccionado.saldocapitalmo).toFixed(2));
      }
    }

  }

  cerrarModal() {
    this.mostrarModal = false;
    this.pagareSeleccionado = null;
    this.cdr.detectChanges();
    this.ejecutarBusqueda();
  }
  guardarSeguimiento() {
    if (!this.fecha || !this.idnumope || !this.cuotaSeleccionada) {
      alert('Por favor complete la Fecha, Número de Operación y la Cuota.');
      return;
    }

    // 1. Mapeo del payload alineado a la tabla consolidado.movimientosprestamos
    const nuevoMovimiento = {
      // Claves y datos del Préstamo (extraídos del objeto seleccionado)
      idpagare: this.pagareSeleccionado?.idpagare,
      idsocio: this.pagareSeleccionado?.idsocio || null,
      nombre: this.pagareSeleccionado?.nombre || null,
      numdoc: this.pagareSeleccionado?.numdoc || null,
      descri: this.pagareSeleccionado?.descri || null,
      moneda: this.pagareSeleccionado?.moneda || 'S',

      // Datos de la Operación (Formulario)
      fecha: this.fecha,                             // 'YYYY-MM-DD'
      idnumope: this.idnumope,                       // Ej. 'OP-123456'
      nrocuota: Number(this.cuotaSeleccionada),       // Cuota seleccionada
      car_abo: 'A',                                  // 'A' de Abono/Pago

      // Conceptos monetarios
      capital: Number(this.capital) || 0,
      interes: Number(this.interes) || 0,
      mora: Number(this.mora) || 0,
      seguro: Number(this.seguro) || 0,
      aporte: Number(this.aporte) || 0,
      total: this.totalPagar,                        // Suma de los 5 conceptos
      importe: this.totalPagar,                      // Mismo monto abonado

      // Auditoría y Operación
      operacion: 'DOC',

      idusuario: localStorage.getItem('idusuario') || '1'

    }
    // 2. Envío al servicio HTTP
    this.movactivosService.registrarMovimiento(nuevoMovimiento).subscribe({
      next: (res) => {
        alert('El pago se guardó correctamente.');
        this.cerrarModal();
        // Opcional: Emitir evento para refrescar la tabla principal de préstamos
        // this.onPagoExitoso.emit();
      },
      error: (err) => {
        alert('Ocurrió un error al intentar guardar el registro.');
      }
    });
  }
}
