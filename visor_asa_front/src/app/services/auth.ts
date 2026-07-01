import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = environment.apiUrl + '/auth'; // La URL de tu NestJS

  constructor(private http: HttpClient) { }
  login(credenciales: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credenciales).pipe(
      tap(res => {
        // 1. Guardamos el token de acceso habitual
        if (res && res.access_token) {
          localStorage.setItem('token', res.access_token);
        }
        // 2. Guardamos la estructura del menú convirtiendo el objeto/array a texto plano (JSON string)
        if (res && res.menu) {
          localStorage.setItem('menu', JSON.stringify(res.menu));
        }
      })
    );
  }

  // Método útil para obtener el menú desde cualquier componente
  getMenu(): any[] {
    const menuString = localStorage.getItem('menu');
    if (menuString) {
      return JSON.parse(menuString); // Si existe, lo transformamos de texto a Arreglo
    }
    return []; // Si no hay nada, devolvemos un arreglo vacío
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
  }
}