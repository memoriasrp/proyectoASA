import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SeguimientoHistorialService {

  private readonly API_URL = `${environment.apiUrl}/seguimiento`;

  constructor(private http: HttpClient) { }

  obtenerHistorialSocio(idsocio: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/socio/${idsocio}`);
  }
  // En tu frontend: services/seguimiento.service.ts
  obtenerProductosSocio(idsocio: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/socio/${idsocio}/productos`);
  }

  guardarSeguimiento(formData: FormData): Observable<any> {
    // Angular deduce automáticamente el 'Content-Type': 'multipart/form-data' al pasarle un FormData
    const token = localStorage.getItem('token'); // O de donde guardes el token JWT

    // 2. Crea las cabeceras e inyecta el "Bearer <token>"
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.API_URL, formData, { headers });
  }
}
