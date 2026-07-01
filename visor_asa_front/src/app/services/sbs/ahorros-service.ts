import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AhorrosService {
  private apiUrl = environment.apiUrl + '/ahorros';

  constructor(private http: HttpClient) { }

  getAhorrosPaginados(page: number, limit: number, search?: string, moneda?: string): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    if (search) params = params.set('search', search);
    if (moneda) params = params.set('moneda', moneda);
    return this.http.get<any>(this.apiUrl, { params });
  }

  getAhorrosParaExportar(search?: string, moneda?: string): Observable<any[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (moneda) params = params.set('moneda', moneda);
    return this.http.get<any[]>(`${this.apiUrl}/exportar`, { params });
  }

}
