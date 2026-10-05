import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CateraPasivosService {
  private apiUrl = environment.apiUrl + '/carterapasivos';

  constructor(private http: HttpClient) { }

  getCarteraPasivosPaginados(
    page: number, limit: number, search?: string,
    moneda?: string, producto?: string, periodo?: string,
    condicion?: string, orderBy?: string, orderDir?: string): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    if (search) params = params.set('search', search);
    if (moneda) params = params.set('moneda', moneda);
    if (producto) params = params.set('producto', producto);
    if (periodo) params = params.set('periodo', periodo);
    if (condicion) params = params.set('condicion', condicion);
    if (orderBy) params = params.set('orderBy', orderBy);
    if (orderDir) params = params.set('orderDir', orderDir);
    return this.http.get<any>(this.apiUrl, { params });
  }

  getCarteraPasivosParaExportar(
    search?: string, moneda?: string, producto?: string,
    periodo?: string, condicion?: string, orderBy?: string, orderDir?: string): Observable<any[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (moneda) params = params.set('moneda', moneda);
    if (producto) params = params.set('producto', producto);
    if (periodo) params = params.set('periodo', periodo);
    if (condicion) params = params.set('condicion', condicion);
    if (orderBy) params = params.set('orderBy', orderBy);
    if (orderDir) params = params.set('orderDir', orderDir);
    return this.http.get<any[]>(`${this.apiUrl}/exportar`, { params });
  }

  getPeriodosDisponibles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/periodos-disponibles`);
  }
}
