import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './components/login/login'; // <-- Importa el componente
import { registerLocaleData } from '@angular/common';
import localeEsPe from '@angular/common/locales/es-PE';

registerLocaleData(localeEsPe, 'es-PE');
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'visor_asa_front';
}
