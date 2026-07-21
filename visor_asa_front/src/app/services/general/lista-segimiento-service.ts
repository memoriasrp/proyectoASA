import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ListaSegimientoService {
  private apiUrl = environment.apiUrl + '/lista-seguimiento';
  constructor(private http: HttpClient) { }

  getListaSeguimientoPaginados(page: number, limit: number, search?: string,): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    if (search) params = params.set('search', search);

    return this.http.get<any>(this.apiUrl, { params });
  }

  getListaSeguimientoParaExportar(search?: string): Observable<any[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);

    return this.http.get<any[]>(`${this.apiUrl}/exportar`, { params });
  }
}
