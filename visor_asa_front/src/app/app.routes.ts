import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Inicio } from './components/inicio/inicio';
import { Mapa } from './components/mapa/mapa';
import { Menus } from './components/menus/menus';
import { Usuarios } from './components/usuarios/usuarios';
import { TipoUsuarios } from './components/tipo-usuarios/tipo-usuarios';
import { PermisoPantallas } from './components/permiso-pantallas/permiso-pantallas'; // 🆕 Importación de la pantalla de Permisos
import { Socios } from './components/vbcoop/socios/socios';
import { Aportaciones } from './components/sbs/aportaciones/aportaciones';
import { Creditos } from './components/sbs/creditos/creditos'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas
import { Ahorros } from './components/sbs/ahorros/ahorros'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas
import { Dpfs } from './components/sbs/dpfs/dpfs'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    {
        path: 'dashboard',
        component: Dashboard,
        children: [
            // Aquí irás metiendo las pantallas internas de tu visor más adelante
            { path: 'inicio', component: Inicio },
            { path: 'mapa', component: Mapa },
            { path: 'menus', component: Menus },
            { path: 'usuarios', component: Usuarios },
            { path: 'tipo-usuarios', component: TipoUsuarios },
            { path: 'permiso-pantallas', component: PermisoPantallas },
            { path: 'socios', component: Socios },
            { path: 'aportaciones', component: Aportaciones },
            { path: 'ahorros', component: Ahorros },
            { path: 'dpfs', component: Dpfs },

            { path: 'creditos', component: Creditos },
            { path: '', redirectTo: 'inicio', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'login' } // Si ponen cualquier ruta rara, al login
];
