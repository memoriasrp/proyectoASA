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
import { AsignarIdsocio } from './components/sbs/asignar-idsocio/asignar-idsocio';
import { Periodos } from './components/configuracion/periodos/periodos';
import { Movpasivos } from './components/vbcoop/movpasivos/movpasivos';
import { Movactivos } from './components/vbcoop/movactivos/movactivos'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas
import { Seguimiento } from './components/vbcoop/seguimiento/seguimiento'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas
import { SeguimientoHistorial } from './components/vbcoop/seguimiento-historial/seguimiento-historial'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas
import { CarteraPasivos } from './components/vbcoop/cartera-pasivos/cartera-pasivos'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas
import { CarteraPrestamos } from './components/vbcoop/cartera-prestamos/cartera-prestamos'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas
import { ObservacionesDpf } from './components/resultados/observaciones-dpf/observaciones-dpf'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas
import { ObservacionesAhorro } from './components/resultados/observaciones-ahorro/observaciones-ahorro'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas
import { ObservacionesPrestamo } from './components/resultados/observaciones-prestamo/observaciones-prestamo';
import { ObservacionesAportes } from './components/resultados/observaciones-aportes/observaciones-aportes';
import { ListaSeguimiento } from './components/general/lista-seguimiento/lista-seguimiento';
import { RegistroPago } from './components/vbcoop/registro-pago/registro-pago';

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
            { path: 'listaSeguimiento', component: ListaSeguimiento },
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
            { path: '', redirectTo: 'inicio', pathMatch: 'full' } // Redirección interna por defecto
        ]
    },
    {
        path: 'resultados',
        component: Dashboard, // Usa el mismo componente base para mantener el sidebar/diseño
        children: [
            { path: 'carterapasivos', component: CarteraPasivos, data: { productoDefecto: 'TODOS' } },
            { path: 'carterapasivos/ahorros', component: CarteraPasivos, data: { productoDefecto: 'AHORRO' } },
            { path: 'carterapasivos/dpf', component: CarteraPasivos, data: { productoDefecto: 'DPF' } },
            { path: 'carterapasivos/aportes', component: CarteraPasivos, data: { productoDefecto: 'APORTE' } },
            { path: 'carteraprestamos', component: CarteraPrestamos },
            { path: 'observaciones-dpf', component: ObservacionesDpf },
            { path: 'observaciones-ahorros', component: ObservacionesAhorro },
            { path: 'observaciones-prestamos', component: ObservacionesPrestamo },
            { path: 'observaciones-aportes', component: ObservacionesAportes },
            { path: '', redirectTo: 'inicio', pathMatch: 'full' } // Redirección interna por defecto
        ]
    },
    {
        path: 'vbcoop',
        component: Dashboard, // Sigue heredando tu plantilla o sidebar maestro
        children: [
            // Aquí irás metiendo los componentes específicos de VBCOOP en el futuro
            // { path: 'reportes', component: ReportesVbcoop },
            // { path: 'configuracion', component: ConfigVbcoop },
            { path: 'movpasivos', component: Movpasivos, data: { productoDefecto: 'TODOS' } },
            { path: 'movpasivos/ahorros', component: Movpasivos, data: { productoDefecto: 'AHORRO' } },
            { path: 'movpasivos/aportes', component: Movpasivos, data: { productoDefecto: 'APORTE' } },
            { path: 'movpasivos/dpf', component: Movpasivos, data: { productoDefecto: 'DPF' } },
            { path: 'movactivos', component: Movactivos },
            { path: 'seguimiento-historial/:idsocio', component: SeguimientoHistorial },
            { path: 'seguimiento-nuevo/:idsocio', component: Seguimiento },
            { path: 'registro-pago', component: RegistroPago },
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
            { path: 'periodos', component: Periodos },
            { path: '', redirectTo: 'inicio', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'login' } // Si ponen cualquier ruta rara, al login
];
