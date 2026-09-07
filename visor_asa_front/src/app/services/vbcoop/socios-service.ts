import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodoEstadoService } from '../../services/init/periodo-estado.service';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SociosService {
  private http = inject(HttpClient);
  private periodoEstadoService = inject(PeriodoEstadoService);
  // Ajusta el puerto o URL según manejes tu entorno local
  private apiUrl = environment.apiUrl + '/socios';


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token') || localStorage.getItem('token');


    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  getSocios(page: number, limit: number, search?: string): Observable<any> {
    const token = localStorage.getItem('access_token') || localStorage.getItem('token');

    const periodoInfo = this.periodoEstadoService.periodoActual;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    if (periodoInfo && periodoInfo.periodo) {
      headers = headers.set('x-periodo', periodoInfo.periodo);
      headers = headers.set('x-tipo-cambio', periodoInfo.tc ? periodoInfo.tc.toString() : '0');
    }
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<any>(this.apiUrl, { headers, params });
  }
  getSociosParaExportar(search?: string): Observable<any> {
    const token = localStorage.getItem('access_token') || localStorage.getItem('token');

    const periodoInfo = this.periodoEstadoService.periodoActual;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    if (periodoInfo && periodoInfo.periodo) {
      headers = headers.set('x-periodo', periodoInfo.periodo);
      headers = headers.set('x-tipo-cambio', periodoInfo.tc ? periodoInfo.tc.toString() : '0');
    }
    let params = new HttpParams();

    if (search) {
      params = params.set('search', search);
    }
    params = params.set('exportar', 'true');

    return this.http.get<any[]>(`${this.apiUrl}/exportar`, {
      headers: headers,
      params: params
    });
  }
}