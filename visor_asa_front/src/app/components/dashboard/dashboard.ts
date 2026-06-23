import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  isSidebarOpen = false;
  menuItems: any[] = []; // <-- Aquí guardaremos los menús del usuario
  usuarioNombre: string = 'Silvia Rodriguez';

  constructor(private auth: Auth, private router: Router) { }
  // src/app/components/dashboard/dashboard.component.ts

  ngOnInit(): void {
    // En lugar de confiar en la memoria volátil, jalamos directamente el texto del disco duro
    const menuGuardado = localStorage.getItem('menu');

    if (menuGuardado) {
      this.menuItems = JSON.parse(menuGuardado); // Convertimos el texto de vuelta a Array
    } else {
      // Por si acaso, usamos tu método alternativo del servicio
      this.menuItems = this.auth.getMenu();
    }

    // Lógica para el nombre dinámico que ya tenías...
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          window.atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
        );
        const payload = JSON.parse(jsonPayload);
        this.usuarioNombre = payload.nombre || 'Usuario';
      } catch (error) {
        this.usuarioNombre = 'Usuario';
      }
    }
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
