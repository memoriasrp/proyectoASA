import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class RegistroGastosService {
  private apiUrl = environment.apiUrl + '/registrogastos';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token') || localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getRegistroGastosPaginados(page: number, limit: number, tipoGastos: number, search?: string, desde?: Date, hasta?: Date): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    params = params.set('idTipoGastos', tipoGastos);;
    if (search) params = params.set('search', search);
    if (desde) params = params.set('desde', desde.toISOString());
    if (hasta) params = params.set('hasta', hasta.toISOString());

    return this.http.get<any>(this.apiUrl, { params });
  }

  getListaSocios(): Observable<{ idsocio: string; descripcion: string }[]> {
    return this.http.get<{ idsocio: string; descripcion: string }[]>(this.apiUrl + '/socios', { headers: this.getHeaders() });
  }
}
