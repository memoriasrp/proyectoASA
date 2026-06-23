import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TipoUsuariosServices {
  private apiUrl = 'http://localhost:3000/tipo-usuarios';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  crearRol(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, { headers: this.getHeaders() });
  }

  actualizarRol(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() });
  }

  eliminarRol(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  actualizarPermisosRol(idRol: number, menuIds: number[]): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.put<any>(`${this.apiUrl}/${idRol}/permisos`, { menuIds }, { headers });
  }
}
