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
import { AsignarIdsocio } from './components/sbs/asignar-idsocio/asignar-idsocio'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas

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

            { path: 'socios', component: Socios },
            { path: '', redirectTo: 'inicio', pathMatch: 'full' }
        ]
    },
    {
        path: 'sbs',
        component: Dashboard, // Usa el mismo componente base para mantener el sidebar/diseño
        children: [
            { path: 'aportaciones', component: Aportaciones },
            { path: 'ahorros', component: Ahorros },
            { path: 'dpfs', component: Dpfs },
            { path: 'creditos', component: Creditos },
            { path: 'asignar-id-socio', component: AsignarIdsocio }, // 👈 Tu nueva pantalla de nulos
            { path: '', redirectTo: 'ahorros', pathMatch: 'full' } // Redirección interna por defecto
        ]
    },
    {
        path: 'vbcoop',
        component: Dashboard, // Sigue heredando tu plantilla o sidebar maestro
        children: [
            // Aquí irás metiendo los componentes específicos de VBCOOP en el futuro
            // { path: 'reportes', component: ReportesVbcoop },
            // { path: 'configuracion', component: ConfigVbcoop },
            { path: '', redirectTo: 'inicio', pathMatch: 'full' }
        ]
    },
    {
        path: 'configuracion',
        component: Dashboard, // Sigue heredando tu plantilla o sidebar maestro
        children: [
            { path: 'menus', component: Menus },
            { path: 'usuarios', component: Usuarios },
            { path: 'tipo-usuarios', component: TipoUsuarios },
            { path: 'permiso-pantallas', component: PermisoPantallas },
            { path: '', redirectTo: 'inicio', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'login' } // Si ponen cualquier ruta rara, al login
];
