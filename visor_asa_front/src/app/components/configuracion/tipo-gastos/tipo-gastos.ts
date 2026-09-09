import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TipoGastosService } from '../../../services/configuracion/tipo-gastos-service';


interface TipoGastoTabla {
  idtipogasto: number;
  descripcion: string;

}


@Component({
  selector: 'app-tipo-gastos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],

  templateUrl: './tipo-gastos.html',
  styleUrl: './tipo-gastos.css',
})
export class TipoGastos implements OnInit {
  tipoGastos: TipoGastoTabla[] = [];
  mostrarModal: boolean = false;
  modoEdicion: boolean = false;
  tipoGastoEditando: string | null = null;
  tipoGastoEditandoId: number | null = null;

  nuevoTipoGasto = {
    idtipogasto: 0,
    descripcion: ''
  };

  constructor(private tipoGastosService: TipoGastosService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadTiposGastos();
  }

  loadTiposGastos(): void {
    this.tipoGastosService.getTiposGastos().subscribe({
      next: (data) => {
        this.tipoGastos = data;
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('Error al traer los usuarios de la BD:', err);
        alert('No se pudo conectar con el servidor para listar los usuarios.');
      }
    });

  }

  abrirModalCrear() {
    this.modoEdicion = false;
    this.tipoGastoEditandoId = null;
    this.nuevoTipoGasto = { idtipogasto: 0, descripcion: '' }; // Reseteamos
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  abrirModalEditar(tipoGasto: TipoGastoTabla) {
    this.modoEdicion = true;
    this.tipoGastoEditandoId = tipoGasto.idtipogasto;
    this.nuevoTipoGasto = {
      idtipogasto: tipoGasto.idtipogasto,
      descripcion: tipoGasto.descripcion
    };

    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.modoEdicion = false;
    this.tipoGastoEditandoId = null;
    this.nuevoTipoGasto = { idtipogasto: 0, descripcion: '' };
    this.cdr.detectChanges();
  }

  guardarTipoGasto(event: Event) {
    event.preventDefault(); // Evita que la página parpadee al hacer submit
    this.nuevoTipoGasto.descripcion = this.nuevoTipoGasto.descripcion.trim().toUpperCase();
    if (this.modoEdicion && this.tipoGastoEditandoId) {
      this.tipoGastosService.updateTipoGasto(this.tipoGastoEditandoId, this.nuevoTipoGasto).subscribe({
        next: (response) => {
          this.cerrarModal();
          this.loadTiposGastos();
        },
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else {
      //  MODO CREACIÓN: (Tu código actual que ya funciona)
      this.tipoGastosService.createTipoGasto(this.nuevoTipoGasto).subscribe({
        next: (response) => {
          this.cerrarModal();
          this.loadTiposGastos();
        },
        error: (err) => console.error('Error al crear:', err)
      });
    }
  }

  eliminarTipoGasto(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este tipo de gasto de manera permanente?')) {

      this.tipoGastosService.deleteTipoGasto(id).subscribe({
        next: (response) => {
          this.loadTiposGastos();
        },
        error: (err) => {
          console.error('Error al intentar eliminar el tipo de gasto:', err);
          alert('Hubo un error en el servidor. No se pudo eliminar el registro.');
        }
      });

    }
  }

}
