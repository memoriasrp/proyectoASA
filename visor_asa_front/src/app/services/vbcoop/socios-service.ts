import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SociosService {
  private http = inject(HttpClient);
  // Ajusta el puerto o URL según manejes tu entorno local
  private apiUrl = environment.apiUrl + '/socios';
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // O donde guardes tu token del visor
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  getSocios(page: number, limit: number, search?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<any>(this.apiUrl, { params });
  }
  getSociosParaExportar(search?: string): Observable<any> {
    let params = new HttpParams();

    if (search) {
      params = params.set('search', search);
    }
    params = params.set('exportar', 'true');

    return this.http.get<any[]>(`${this.apiUrl}/exportar`, {
      headers: this.getHeaders(),
      params: params
    });
  }
}