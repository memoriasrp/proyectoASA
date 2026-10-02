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

  nombreSocio: string = '';
  nombreGasto: string = '';

  busquedaRealizada: boolean = false;
  loading: boolean = false;
  editar: boolean = false;

  tipoGastos$!: Observable<TipoGasto[]>;

  // Control de Modal
  mostrarModalGasto: boolean = false;
  mostrarModalPagoGasto: boolean = false;

  // Modelo del formulario de nuevo gasto
  nuevoGasto = {
    id: 0,
    idsocio: null,
    idtipogasto: null,
    montopactado: null,
    fecha: new Date().toISOString().substring(0, 10),
    observacion: '',
    montopagado: 0,
    fechaPago: new Date().toISOString().substring(0, 10),

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
    this.editar = false;
    this.limpiarFormularioGasto();
    this.mostrarModalGasto = true;
  }

  obtenerNombreSocioObservable(idBuscado: string): Observable<string> {
    return this.listaSocios$.pipe(
      map((lista: any[]) => {
        const socio = lista.find(item => item.idsocio === idBuscado);
        if (!socio) return 'Socio no encontrado';

        return socio.descripcion;
      })
    );
  }

  pagarRegistro(registro: any): void {
    this.obtenerNombreSocioObservable(registro.idsocio).subscribe(nombre => {
      this.nombreSocio = nombre;
    });
    this.nombreGasto = registro.tipogastos.descripcion;

    this.mostrarModalPagoGasto = true;
    this.nuevoGasto.idsocio = registro.idsocio;
    this.nuevoGasto.idtipogasto = registro.idtipogasto;
    this.nuevoGasto.montopactado = registro.montopactado;
    this.nuevoGasto.montopagado = registro.montopagado;
    this.nuevoGasto.id = registro.id;
    if (registro.fecha) {
      // Convertimos a objeto Date y extraemos el formato 'YYYY-MM-DD'
      const dateObj = new Date(registro.fecha);
      this.nuevoGasto.fecha = dateObj.toISOString().split('T')[0];
    } else {
      this.nuevoGasto.fecha = '';
    }
    this.nuevoGasto.observacion = registro.detalle;
    if (registro.fechaPago) {
      const dateObj = new Date(registro.fechapago);
      this.nuevoGasto.fechaPago = dateObj.toISOString().split('T')[0];
    } else {
      // Fecha actual por defecto
      const hoy = new Date();
      this.nuevoGasto.fechaPago = hoy.toISOString().split('T')[0];
    }

  }
  cerrarModalNuevoGasto(): void {
    this.mostrarModalGasto = false;
    this.limpiarFormularioGasto();
    this.ejecutarBusqueda();
    this.cdr.detectChanges();
  }

  CancelarPagoGasto(): void {
    this.mostrarModalPagoGasto = false;
    this.ejecutarBusqueda();
    this.cdr.detectChanges();
  }
  limpiarFormularioGasto(): void {
    this.nuevoGasto = {
      id: 0,
      idsocio: null,
      idtipogasto: null,
      montopactado: null,
      fecha: new Date().toISOString().substring(0, 10),
      observacion: '',
      montopagado: 0,
      fechaPago: new Date().toISOString().substring(0, 10),
    };
  }

  guardarGasto(): void {
    if (!this.nuevoGasto.idsocio || !this.nuevoGasto.idtipogasto || !this.nuevoGasto.montopactado) {
      alert('Debe ingresar todos los campos.');
      return;
    }
    const payload = {
      idsocio: this.nuevoGasto.idsocio,
      idtipogastos: Number(this.nuevoGasto.idtipogasto),
      montopactado: Number(this.nuevoGasto.montopactado || 0),
      montopagado: Number(this.nuevoGasto.montopagado || 0),
      detalle: this.nuevoGasto.observacion,
      fecha: this.nuevoGasto.fecha

    };
    if (!this.editar)
      this.registroGastosService.registrarGasto(payload).subscribe({
        next: (res) => {
          alert('Gasto registrado con éxito.');
          this.cerrarModalNuevoGasto();
        },
        error: (err) => {
          console.error('Error del servidor:', err);
          alert('Error al guardar el registro.');
          this.cdr.detectChanges();
        }
      });
    else {
      this.registroGastosService.updateGasto(this.nuevoGasto.id, payload).subscribe({
        next: (res) => {
          alert('Gasto registrado con éxito.');
          this.cerrarModalNuevoGasto();
        },
        error: (err) => {
          console.error('Error del servidor:', err);
          alert('Error al guardar el registro.');
          this.cdr.detectChanges();
        }
      });
    }
  }

  editarRegistro(registro: any): void {
    this.editar = true;
    this.nuevoGasto.idsocio = registro.idsocio;
    this.nuevoGasto.idtipogasto = registro.idtipogasto;
    this.nuevoGasto.montopactado = registro.montopactado;
    this.nuevoGasto.montopagado = registro.montopagado;
    this.nuevoGasto.id = registro.id;
    if (registro.fecha) {
      // Convertimos a objeto Date y extraemos el formato 'YYYY-MM-DD'
      const dateObj = new Date(registro.fecha);
      this.nuevoGasto.fecha = dateObj.toISOString().split('T')[0];
    } else {
      this.nuevoGasto.fecha = '';
    }
    this.nuevoGasto.observacion = registro.detalle;
    this.mostrarModalGasto = true;
  }

  eliminarRegistro(idRegistro: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario de manera permanente?')) {

      this.registroGastosService.deleteGasto(idRegistro).subscribe({
        next: (response) => {
          console.log('Usuario eliminado con éxito del sistema', response);


          this.ejecutarBusqueda();
        },
        error: (err) => {
          console.error('Error al intentar eliminar el gasto:', err);
          alert('Hubo un error en el servidor. No se pudo eliminar el registro.');
        }
      });

    }

  }
}


