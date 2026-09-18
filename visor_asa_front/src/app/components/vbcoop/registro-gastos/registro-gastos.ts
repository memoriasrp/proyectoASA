import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { RegistroGastosService } from '../../../services/vbcoop/registro-gastos-service';
import { TipoGastosService } from '../../../services/configuracion/tipo-gastos-service';
import { NgSelectModule } from '@ng-select/ng-select';
export interface TipoGasto {
  idtipogasto: number;
  descripcion: string;
}

@Component({
  selector: 'app-registro-gastos',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './registro-gastos.html',
  styleUrl: './registro-gastos.css',
})
export class RegistroGastos implements OnInit {
  regGastos: any[] = [];

  currentPage: number = 1;
  totalPages: number = 1;
  totalRecords: number = 0;

  // Filtros vinculados a los inputs del HTML
  // Filtros vinculados a los inputs del HTML
  searchTerm: string = '';
  tipoGastoSeleccionado: number = 0;
  fechaDesde: string = '';
  fechaHasta: string = '';

  busquedaRealizada: boolean = false;
  loading: boolean = false;

  tipoGastos$!: Observable<TipoGasto[]>;

  // Control de Modal
  mostrarModalGasto: boolean = false;

  // Modelo del formulario de nuevo gasto
  nuevoGasto = {
    idsocio: null,
    idtipogasto: null,
    montopactado: null,
    fecha: new Date().toISOString().substring(0, 10),
    observacion: ''
  };

  // Variables para la Búsqueda Integrada con ng-select
  socios$!: Observable<any[]>;
  sociosInput$ = new Subject<string>();
  cargandoSocios: boolean = false;

  listaSocios$!: Observable<{ idsocio: string; descripcion: string }[]>;

  constructor(
    private registroGastosService: RegistroGastosService,
    private tipoGastosService: TipoGastosService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.cargarOpciones();
    this.ejecutarBusqueda();
    this.cargarSociosSelect();
  }
  cargarTabla(): void {
    this.loading = true;
    this.cdr.detectChanges();
    // Convertimos las strings de fecha a objetos Date solo si tienen valor
    const desdeDate = this.fechaDesde ? new Date(this.fechaDesde) : undefined;
    const hastaDate = this.fechaHasta ? new Date(this.fechaHasta) : undefined;
    this.registroGastosService.getRegistroGastosPaginados(
      this.currentPage,
      20,
      this.tipoGastoSeleccionado,
      this.searchTerm,
      desdeDate,
      hastaDate
    ).subscribe({
      next: (res: any) => {
        this.regGastos = res.data.map((item: any) => {
          const pactado = Number(item.montopactado) || 0;
          const pagado = Number(item.montopagado) || 0;
          const saldoPendiente = pactado - pagado;

          return {
            ...item,
            saldoPendiente,
            condicionPago: saldoPendiente <= 0 ? 'CANCELADO' : 'PENDIENTE'
          };
        });

        // 2. Asignación de metadatos de paginación
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
  ejecutarBusqueda(): void {
    this.currentPage = 1; // Reseteamos a la primera página en cada nueva búsqueda
    this.busquedaRealizada = true;
    this.cargarTabla();
  }
  cargarOpciones(): void {
    this.tipoGastos$ = this.tipoGastosService.getTiposGastos();
  }
  limpiarFiltros() { }
  imprimirTabla() { }
  exportarAExcel() { }
  abrirModalSeguimiento(item: any) { }

  cambiarPagina(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.cargarTabla();
    }
  }

  cargarSociosSelect(): void {
    // Consume la función obtenerListaSociosSelect()
    this.listaSocios$ = this.registroGastosService.getListaSocios();
  }

  // Métodos de control del Modal
  abrirModalNuevoGasto(): void {
    this.limpiarFormularioGasto();
    this.mostrarModalGasto = true;
  }

  cerrarModalNuevoGasto(): void {
    this.mostrarModalGasto = false;
    this.limpiarFormularioGasto();
  }

  limpiarFormularioGasto(): void {
    this.nuevoGasto = {
      idsocio: null,
      idtipogasto: null,
      montopactado: null,
      fecha: new Date().toISOString().substring(0, 10),
      observacion: ''
    };
  }

  guardarGasto(): void {
    if (!this.nuevoGasto.idsocio || !this.nuevoGasto.idtipogasto || !this.nuevoGasto.montopactado) {
      return;
    }

    // this.gastosService.registrarGasto(this.nuevoGasto).subscribe({
    //   next: () => {
    //     this.cerrarModalNuevoGasto();
    //     this.ejecutarBusqueda(); // Recarga la tabla de la vista principal
    //   },
    //   error: (err) => console.error('Error al registrar gasto:', err)
    // });
  }
}


