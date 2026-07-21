import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MenusService } from '../../services/menus';
export interface GrupoMenu {
  id: number;
  nombre: string;
}
interface MenuTabla {
  id: number;
  nombre: string;
  ruta: string;
  icono: string;
  orden: number;
  grupoId: number;
  grupo: GrupoMenu | null;
}

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './menus.html',
  styleUrl: './menus.css',
})

export class Menus implements OnInit {
  menus: MenuTabla[] = [];
  mostrarModal: boolean = false;
  modoEdicion: boolean = false;
  menuEditandoId: number | null = null;

  nuevoMenu = {
    nombre: '',
    ruta: '',
    icono: '',
    orden: 0,
    grupoId: 0,
    grupo: null
  };
  // 🛠️ SOLUCIÓN TS2307: Arreglo local con los valores exactos del Enum de tu Postgres
  listaGrupos: GrupoMenu[] = [];
  constructor(private menusService: MenusService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarMenusReal();
    this.cargarGrupos();
  }

  cargarMenusReal(): void {
    this.menusService.getMenus().subscribe({
      next: (data) => {
        this.menus = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al traer los menús:', err)
    });
  }
  cargarGrupos(): void {
    this.menusService.getGrupos().subscribe({
      next: (grupos) => {
        this.listaGrupos = grupos;
      },
      error: (err) => {
        console.error('Error al cargar los grupos desde el servidor', err);
      }
    });
  }
  abrirModalCrear() {
    this.modoEdicion = false;
    this.menuEditandoId = null;
    this.nuevoMenu = { nombre: '', ruta: '', icono: '', orden: 0, grupoId: 0, grupo: null };
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  abrirModalEditar(menu: MenuTabla) {
    this.modoEdicion = true;
    this.menuEditandoId = menu.id;
    this.nuevoMenu = {
      nombre: menu.nombre,
      ruta: menu.ruta,
      icono: menu.icono,
      orden: menu.orden,
      grupoId: menu.grupoId,
      grupo: null
    };
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }


  cerrarModal() {
    this.mostrarModal = false;
    this.modoEdicion = false;
    this.menuEditandoId = null;
    this.nuevoMenu = { nombre: '', ruta: '', icono: '', orden: 0, grupoId: 0, grupo: null };
    this.cdr.detectChanges();
  }

  guardarMenu(event: Event) {
    event.preventDefault();

    if (this.modoEdicion && this.menuEditandoId) {
      this.menusService.updateMenu(this.menuEditandoId, this.nuevoMenu).subscribe({
        next: () => {
          this.cerrarModal();
          this.cargarMenusReal();
        },
        error: (err) => console.error('Error al actualizar menú:', err)
      });
    } else {
      this.menusService.createMenu(this.nuevoMenu).subscribe({
        next: () => {
          this.cerrarModal();
          this.cargarMenusReal();
        },
        error: (err) => console.error('Error al crear menú:', err)
      });
    }
  }

  eliminarMenu(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta opción de menú?')) {
      this.menusService.deleteMenu(id).subscribe({
        next: () => this.cargarMenusReal(),
        error: (err) => console.error('Error al eliminar menú:', err)
      });
    }
  }
}
