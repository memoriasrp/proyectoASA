import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
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
        // 3. Guardamos el periodo activo si existe
        if (res && res.periodoActivo) {
          console.log('Guardando periodo activo en localStorage:', res.periodoActivo);
          localStorage.setItem('periodo_activo', JSON.stringify(res.periodoActivo));
        }
      })
    );
  }
  getUsuarioActual(): any {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      // Decodifica la información técnica guardada dentro del JWT
      const payload: any = jwtDecode(token);
      return payload;
    } catch (error) {
      console.error('Error al decodificar el token', error);
      return null;
    }
  }
  // Método útil para obtener el menú desde cualquier componente
  getMenu(): any[] {
    console.log(localStorage);
    const menuString = localStorage.getItem('menu');
    if (menuString) {
      return JSON.parse(menuString); // Si existe, lo transformamos de texto a Arreglo
    }
    return []; // Si no hay nada, devolvemos un arreglo vacío
  }
  getPeriodoActivo(): any | null {
    const periodoString = localStorage.getItem('periodo_activo');
    if (periodoString) {
      return JSON.parse(periodoString); // Si existe, lo transformamos de texto a Objeto
    }
    return null; // Si no hay nada, devolvemos null
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
  }
}