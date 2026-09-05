import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeriodosService } from '../../../services/configuracion/periodos-service';

interface PeriodoTabla {
  periodo: string;
  fecha: string;
  tc: number;
  aportes: number;
  ahorros: number;
  dpf: number;
  prestamos: number;
  activo: boolean; // Nuevo campo para indicar si el periodo está activo o no
}

@Component({
  selector: 'app-periodos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './periodos.html',
  styleUrl: './periodos.css',
})
export class Periodos implements OnInit {
  periodos: PeriodoTabla[] = [];
  mostrarModal: boolean = false;
  modoEdicion: boolean = false;
  periodoEditando: string | null = null;
  periodoEditandoId: string | null = null;

  currentPage: number = 1;
  totalPages: number = 1;
  totalRecords: number = 0;

  nuevoPeriodo = {
    periodo: '',
    fecha: '',
    tc: 0,
    activo: false // Valor por defecto para el campo activo
  };

  constructor(private periodosService: PeriodosService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarPeriodos();
  }
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.cargarPeriodos();
    }
  }
  cargarPeriodos(): void {
    // Asegúrate de tener declaradas tus variables de control de páginas arriba

    this.periodosService.getPeriodos(this.currentPage, 20).subscribe({
      next: (res) => {
        // 🟢 EXTRAEMOS LA DATA REAL (El arreglo)
        this.periodos = res.data || [];

        // 🟢 CAPTURAMOS LOS METADATOS DE PAGINACIÓN (Para tus botones de la tabla)
        if (res.meta) {
          this.totalPages = res.meta.totalPages;
          this.totalRecords = res.meta.total;
        }

        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al traer los periodos:', err)
    });
  }

  abrirModalCrear() {
    this.modoEdicion = false;
    this.periodoEditandoId = null;
    this.nuevoPeriodo = { periodo: '', fecha: '', tc: 0, activo: false };
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  abrirModalEditar(periodo: PeriodoTabla) {
    this.modoEdicion = true;
    this.periodoEditandoId = periodo.periodo;
    const fechaFormateada = periodo.fecha
      ? new Date(periodo.fecha).toISOString().split('T')[0]
      : '';
    this.nuevoPeriodo = {
      periodo: periodo.periodo,
      fecha: fechaFormateada,
      tc: periodo.tc,
      activo: periodo.activo // Asegúrate de que el objeto nuevoPeriodo tenga la propiedad activo si es necesario
    };
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }
  activarPeriodo(periodo: string) {
    this.periodosService.activarPeriodo(periodo).subscribe({
      next: () => {
        this.cargarPeriodos();
      },
      error: (err) => console.error('Error al activar periodo:', err)
    });
  }
  RecalcularPeriodo(periodo: string) {
    this.periodosService.RecalcularPeriodo(periodo).subscribe({
      next: () => {
        this.cargarPeriodos();
      },
      error: (err) => console.error('Error al recalcular periodo:', err)
    });
  }
  cerrarModal() {
    this.mostrarModal = false;
    this.modoEdicion = false;
    this.periodoEditandoId = null;
    this.nuevoPeriodo = { periodo: '', fecha: '', tc: 0, activo: false };
    this.cdr.detectChanges();
  }

  guardarPeriodo(event: Event) {
    event.preventDefault();
    console.log('Guardar periodo:', this.nuevoPeriodo);
    if (this.modoEdicion && this.periodoEditandoId) {
      this.periodosService.actualizarPeriodo(this.periodoEditandoId, this.nuevoPeriodo).subscribe({
        next: () => {
          this.cerrarModal();
          this.cargarPeriodos();
        },
        error: (err) => console.error('Error al actualizar periodo:', err)
      });
    } else {
      this.periodosService.crearPeriodo(this.nuevoPeriodo).subscribe({
        next: () => {
          this.cerrarModal();
          this.cargarPeriodos();
        },
        error: (err) => console.error('Error al crear periodo:', err)
      });
    }
  }

  eliminarPeriodo(periodo: string) {
    console.log('Eliminar periodo con ID:', periodo);
    if (confirm('¿Estás seguro de que deseas eliminar esta opción de periodo?')) {
      this.periodosService.eliminarPeriodo(periodo).subscribe({
        next: () => this.cargarPeriodos(),
        error: (err) => console.error('Error al eliminar periodo:', err)
      });
    }
  }

}
