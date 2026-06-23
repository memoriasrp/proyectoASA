import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './components/login/login'; // <-- Importa el componente
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Login],
  template: '<router-outlet></router-outlet>',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'visor_asa_front';
}
