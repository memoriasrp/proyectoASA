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

  // Guardaremos los menús organizados por el nombre de su grupo
  menusAgrupados: { [key: string]: any[] } = {};
  grupos: string[] = []; // Lista con las llaves de los grupos para el @for
  menuItems: any[] = [];
  usuarioNombre: string = '';

  constructor(private auth: Auth, private router: Router) { }
  ngOnInit(): void {
    const menuGuardado = localStorage.getItem('menu');

    if (menuGuardado) {
      this.menuItems = JSON.parse(menuGuardado);
    } else {
      this.menuItems = this.auth.getMenu() || [];
    }

    // 2. Ejecutamos la agrupación pasándole la lista
    this.agruparMenu(this.menuItems);
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          window.atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
        );

        // 1. Aquí se crea la variable payload
        const payload = JSON.parse(jsonPayload);

        // 2. MUEVE ESTA LÍNEA AQUÍ ADENTRO:
        // Así TypeScript garantiza que 'payload' existe y tiene el nombre
        this.usuarioNombre = payload.nombre || 'Usuario';

      } catch (error) {
        // Si el token está malogrado o corrupto, cae aquí
        this.usuarioNombre = 'Usuario';
      }
    } else {
      // Por si no hay ningún token en el localStorage
      this.usuarioNombre = 'Usuario';
    }
    // ... (Tu lógica de decodificación del token se queda exactamente igual) ...
  }

  private agruparMenu(menuList: any[]): void {
    if (!menuList || menuList.length === 0) return;

    this.menusAgrupados = menuList.reduce((acc, item) => {
      // Si el grupo viene vacío de la base de datos ponemos un grupo por defecto
      const grupoName = item.grupo || 'GENERAL';
      if (!acc[grupoName]) {
        acc[grupoName] = [];
      }
      acc[grupoName].push(item);
      return acc;
    }, {} as { [key: string]: any[] });

    // Esto le da las llaves al @for principal del HTML
    this.grupos = Object.keys(this.menusAgrupados);
  }

  // ... (Tus métodos toggleSidebar y logout se quedan igual) ...




  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}