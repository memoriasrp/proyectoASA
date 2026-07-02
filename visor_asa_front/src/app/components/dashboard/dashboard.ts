import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout'; // 🟢 Importación requerida para detectar el tamaño de pantalla
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  isSidebarOpen = true;
  isMobile = false;

  // Guardaremos los menús organizados por el nombre de su grupo
  menusAgrupados: { [key: string]: any[] } = {};
  grupos: string[] = []; // Lista con las llaves de los grupos para el @for
  menuItems: any[] = [];
  usuarioNombre: string = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private breakpointObserver: BreakpointObserver // 🟢 Inyección del observador de pantalla
  ) { }

  ngOnInit(): void {
    // 🟢 1. CONTROL DE RESPONSIVIDAD AUTOMÁTICA EN TIEMPO REAL
    this.breakpointObserver.observe(['(max-width: 768px)']).subscribe(result => {
      this.isMobile = result.matches;

      if (this.isMobile) {
        this.isSidebarOpen = false; // 📳 Si la pantalla se reduce a móvil, el menú se autocolapsa
      } else {
        this.isSidebarOpen = true;  // 💻 Si se agranda a PC, el menú se autoexpande solo
      }
    });

    // 2. Extracción y agrupación de los menús (Tu lógica original)
    const menuGuardado = localStorage.getItem('menu');

    if (menuGuardado) {
      this.menuItems = JSON.parse(menuGuardado);
    } else {
      this.menuItems = this.auth.getMenu() || [];
    }

    this.agruparMenu(this.menuItems);

    // 3. Extracción del nombre de usuario desde el JWT (Tu lógica original)
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
    } else {
      this.usuarioNombre = 'Usuario';
    }
  }

  private agruparMenu(menuList: any[]): void {
    if (!menuList || menuList.length === 0) return;

    this.menusAgrupados = menuList.reduce((acc, item) => {
      const grupoName = item.grupo || 'GENERAL';
      if (!acc[grupoName]) {
        acc[grupoName] = [];
      }
      acc[grupoName].push(item);
      return acc;
    }, {} as { [key: string]: any[] });

    this.grupos = Object.keys(this.menusAgrupados);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}