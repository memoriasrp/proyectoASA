import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ObservacionesPrestamoService {
  private apiUrl = environment.apiUrl + '/observaciones-prestamo';
  constructor(private http: HttpClient) { }

  getPrestamosPaginados(page: number, limit: number, search?: string, moneda?: string): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    if (search) params = params.set('search', search);
    if (moneda !== undefined) params = params.set('moneda', moneda.toString());
    return this.http.get<any>(this.apiUrl, { params });
  }

  getPrestamosParaExportar(search?: string, moneda?: string): Observable<any[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (moneda !== undefined) params = params.set('moneda', moneda.toString());
    return this.http.get<any[]>(`${this.apiUrl}/exportar`, { params });
  }
}
