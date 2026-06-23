import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Users } from '../../services/users';

interface UsuarioTabla {
  id: number;
  nombre: string;
  email: string;
  tipoUsuario: {
    nombre: string;
  };
}
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {
  usuarios: UsuarioTabla[] = [];
  // Variables de control para el Modal
  mostrarModal: boolean = false;

  // Objeto base para recolectar los datos del nuevo usuario
  nuevoUsuario = {
    nombre: '',
    email: '',
    password: '',
    tipoUsuarioId: '' as any // Por defecto rol Visor
  };
  modoEdicion: boolean = false;
  usuarioEditandoId: number | null = null;

  roles: any[] = [];

  constructor(private users: Users, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarUsuariosReal();
    this.cargarRolesReal();
  }
  cargarUsuariosReal(): void {
    this.users.getUsers().subscribe({
      next: (data) => {
        console.log("datos", data);
        this.usuarios = data;
        this.cdr.detectChanges(); // Forzar la detección de cambios
      },

      error: (err) => {
        console.error('Error al traer los usuarios de la BD:', err);
        alert('No se pudo conectar con el servidor para listar los usuarios.');
      }
    });
  }
  abrirModalCrear() {
    this.modoEdicion = false;
    this.usuarioEditandoId = null;
    this.nuevoUsuario = { nombre: '', email: '', password: '', tipoUsuarioId: '' as any }; // Reseteamos
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }
  abrirModalEditar(user: UsuarioTabla) {
    this.modoEdicion = true;
    this.usuarioEditandoId = user.id;
    this.nuevoUsuario = {
      nombre: user.nombre,
      email: user.email,
      password: '',
      tipoUsuarioId: user.tipoUsuario.nombre === 'Administrador' ? 1 : 2
    };

    this.mostrarModal = true;
    this.cdr.detectChanges();
  }
  cerrarModal() {
    this.mostrarModal = false;
    this.modoEdicion = false;
    this.usuarioEditandoId = null;
    this.nuevoUsuario = { nombre: '', email: '', password: '', tipoUsuarioId: '' as any };
    this.cdr.detectChanges();
  }

  guardarUsuario(event: Event) {
    event.preventDefault(); // Evita que la página parpadee al hacer submit

    if (this.modoEdicion && this.usuarioEditandoId) {
      // 🚀 MODO EDICIÓN: Llamamos al servicio de actualizar
      this.users.actualizarUsuario(this.usuarioEditandoId, this.nuevoUsuario).subscribe({
        next: (response) => {
          console.log('¡Usuario actualizado!', response);
          this.cerrarModal();
          this.cargarUsuariosReal();
        },
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else {
      //  MODO CREACIÓN: (Tu código actual que ya funciona)
      this.users.crearUsuario(this.nuevoUsuario).subscribe({
        next: (response) => {
          this.cerrarModal();
          this.cargarUsuariosReal();
        },
        error: (err) => console.error('Error al crear:', err)
      });
    }
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario de manera permanente?')) {

      this.users.eliminarUsuario(id).subscribe({
        next: (response) => {
          console.log('Usuario eliminado con éxito del sistema', response);


          this.cargarUsuariosReal();
        },
        error: (err) => {
          console.error('Error al intentar eliminar el usuario:', err);
          alert('Hubo un error en el servidor. No se pudo eliminar el registro.');
        }
      });

    }
  }

  cargarRolesReal(): void {
    this.users.getRoles().subscribe({
      next: (data) => {
        this.roles = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al traer roles de la BD:', err)
    });
  }
}
