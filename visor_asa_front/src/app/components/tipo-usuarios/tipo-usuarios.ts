// src/app/components/tipo-usuarios/tipo-usuarios.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipoUsuariosServices } from '../../services/tipo-usuarios-services';
import { MenusService } from '../../services/menus';
import { PermisoPantallasService } from '../../services/permiso-pantallas-service';

interface MenuConCheck {
  id: number;
  nombre: string;
  ruta: string;
  activo: boolean; // Flag para mapear el checkbox en la vista
}

@Component({
  selector: 'app-tipo-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tipo-usuarios.html',
  styleUrl: './tipo-usuarios.css',
})
export class TipoUsuarios implements OnInit {
  roles: any[] = [];
  menusCheck: MenuConCheck[] = []; // Lista unificada para armar los checkboxes
  mostrarModal = false;
  modoEdicion = false;
  rolEditandoId: number | null = null;
  rolSeleccionado: any = null;
  nuevoRol = { nombre: '' };

  constructor(private tipoService: TipoUsuariosServices, private menusService: MenusService,
    private permisosService: PermisoPantallasService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void { this.cargarRolesReal(); }

  cargarRolesReal() {
    this.tipoService.getRoles().subscribe({
      next: (data) => { this.roles = data; this.cdr.detectChanges(); },
      error: (err) => console.error(err)
    });
  }

  abrirModalCrear() {
    this.modoEdicion = false;
    this.rolEditandoId = null;
    this.nuevoRol = { nombre: '' };
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }
  abrirModalPermisos(rol: any) {
    this.rolSeleccionado = rol;
    this.menusCheck = [];

    // 1. Traemos TODOS los menús disponibles del sistema
    this.menusService.getMenus().subscribe({
      next: (todosLosMenus) => {

        // 2. Traemos TODOS las asignaciones actuales de la tabla intermedia
        this.permisosService.getPermisos().subscribe({
          next: (permisosExistentes) => {

            // Filtramos solo los accesos que le pertenecen a este Rol específico
            const accesosDelRol = permisosExistentes
              .filter(p => p.tipoUsuarioId === rol.id)
              .map(p => p.opcionMenuId);

            // 3. Cruzamos la información para armar los objetos con su flag activo
            this.menusCheck = todosLosMenus.map((menu: any) => ({
              id: menu.id,
              nombre: menu.nombre,
              ruta: menu.ruta,
              activo: accesosDelRol.includes(menu.id)
            }));

            this.mostrarModal = true;
            this.cdr.detectChanges();
          }
        });
      }
    });
  }
  abrirModalEditar(rol: any) {
    this.modoEdicion = true;
    this.rolEditandoId = rol.id;
    this.nuevoRol = { nombre: rol.nombre };
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.rolSeleccionado = null;
    this.menusCheck = [];
    this.cdr.detectChanges();
  }
  guardarRol(event: Event) {
    event.preventDefault();
    if (this.modoEdicion && this.rolEditandoId) {
      this.tipoService.actualizarRol(this.rolEditandoId, this.nuevoRol).subscribe({
        next: () => { this.cerrarModal(); this.cargarRolesReal(); },
        error: (err) => console.error(err)
      });
    } else {
      this.tipoService.crearRol(this.nuevoRol).subscribe({
        next: () => { this.cerrarModal(); this.cargarRolesReal(); },
        error: (err) => console.error(err)
      });
    }
  }

  eliminarRol(id: number) {
    if (confirm('¿Estás seguro de eliminar este rol?')) {
      this.tipoService.eliminarRol(id).subscribe({
        next: () => this.cargarRolesReal(),
        error: (err) => console.error(err)
      });
    }
  }
  guardarPermisosMatriz(event: Event) {
    event.preventDefault();

    // Filtramos únicamente los IDs de los menús que el usuario dejó marcados con el Checkbox
    const idsSeleccionados = this.menusCheck
      .filter(m => m.activo)
      .map(m => m.id);

    this.tipoService.actualizarPermisosRol(this.rolSeleccionado.id, idsSeleccionados).subscribe({
      next: (res) => {
        console.log('¡Matriz guardada con éxito!', res);
        this.cerrarModal();
        this.cargarRolesReal(); // Refrescamos la vista principal
      },
      error: (err) => console.error('Error al guardar la matriz:', err)
    });
  }
}
