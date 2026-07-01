import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class Users {
  private apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }
  crearUsuario(usuarioData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Apuntamos al endpoint POST que crearemos en NestJS
    return this.http.post<any>(this.apiUrl, usuarioData, { headers });
  }
  eliminarUsuario(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log('Eliminando usuario con ID:', id);
    return this.http.delete<any>(this.apiUrl + `/${id}`, { headers });
  }
  actualizarUsuario(id: number, usuarioData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.put<any>(this.apiUrl + `/${id}`, usuarioData, { headers });
  }

  getRoles(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<any[]>(this.apiUrl + `/roles`, { headers });
  }
}
