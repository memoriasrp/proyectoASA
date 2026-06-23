import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PermisoPantallasService } from '../../services/permiso-pantallas-service';
import { TipoUsuariosServices } from '../../services/tipo-usuarios-services'; // 🆕 Para alimentar el Select de Roles
import { MenusService } from '../../services/menus';

@Component({
  selector: 'app-permiso-pantallas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './permiso-pantallas.html',
  styleUrl: './permiso-pantallas.css',
})
export class PermisoPantallas implements OnInit {
  permisos: any[] = [];
  roles: any[] = [];     // Lista desplegable de Roles
  menus: any[] = [];     // Lista desplegable de Menús

  mostrarModal = false;
  modoEdicion = false;
  permisoEditandoId: number | null = null;

  // Inicializamos campos vacíos para forzar al usuario a escoger
  nuevoPermiso = {
    tipoUsuarioId: '' as any,
    opcionMenuId: '' as any
  };

  constructor(
    private permisoService: PermisoPantallasService,
    private tipoUsuariosServices: TipoUsuariosServices,
    private menusService: MenusService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarPermisosReal();
    this.cargarSelectores();
  }

  cargarPermisosReal() {
    this.permisoService.getPermisos().subscribe({
      next: (data) => {
        this.permisos = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar permisos:', err)
    });
  }

  // 🚀 Trae los datos de las otras dos tablas para llenar los formularios selectores
  cargarSelectores() {
    this.tipoUsuariosServices.getRoles().subscribe({
      next: (data) => this.roles = data,
      error: (err) => console.error('Error al cargar roles para select:', err)
    });

    this.menusService.getMenus().subscribe({
      next: (data) => this.menus = data,
      error: (err) => console.error('Error al cargar menús para select:', err)
    });
  }

  abrirModalCrear() {
    this.modoEdicion = false;
    this.permisoEditandoId = null;
    this.nuevoPermiso = { tipoUsuarioId: '' as any, opcionMenuId: '' as any };
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  abrirModalEditar(permiso: any) {
    this.modoEdicion = true;
    this.permisoEditandoId = permiso.id;
    this.nuevoPermiso = {
      tipoUsuarioId: permiso.tipoUsuarioId,
      opcionMenuId: permiso.opcionMenuId
    };
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.cdr.detectChanges();
  }

  guardarPermiso(event: Event) {
    event.preventDefault();

    if (this.modoEdicion && this.permisoEditandoId) {
      this.permisoService.actualizarPermiso(this.permisoEditandoId, this.nuevoPermiso).subscribe({
        next: () => { this.cerrarModal(); this.cargarPermisosReal(); },
        error: (err) => console.error('Error al actualizar permiso:', err)
      });
    } else {
      this.permisoService.crearPermiso(this.nuevoPermiso).subscribe({
        next: () => { this.cerrarModal(); this.cargarPermisosReal(); },
        error: (err) => console.error('Error al asociar permiso:', err)
      });
    }
  }

  eliminarPermiso(id: number) {
    if (confirm('¿Estás seguro de que deseas revocar este acceso de pantalla?')) {
      this.permisoService.eliminarPermiso(id).subscribe({
        next: () => this.cargarPermisosReal(),
        error: (err) => console.error('Error al revocar acceso:', err)
      });
    }
  }
}
