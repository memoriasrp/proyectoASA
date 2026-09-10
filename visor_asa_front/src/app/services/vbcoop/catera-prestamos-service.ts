import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface RespuestaCartera {
  data: any[];
  total: number;
  grupos: string[]; // 👈 Define explícitamente string[]
}

@Injectable({
  providedIn: 'root',
})

export class CateraPrestamosService {
  private apiUrl = environment.apiUrl + '/carteraprestamos';

  constructor(private http: HttpClient) { }

  getCarteraPrestamosPaginados(
    page: number, limit: number, search?: string, moneda?: string, producto?: string, periodo?: string,
    condicion?: string, grupos?: string[] | null): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    if (search) params = params.set('search', search);
    if (moneda) params = params.set('moneda', moneda);
    if (producto) params = params.set('producto', producto);
    if (periodo) params = params.set('periodo', periodo);
    if (condicion) params = params.set('condicion', condicion);
    if (grupos && grupos.length > 0) {
      params = params.set('grupos', grupos.join(','));
    }
    return this.http.get<RespuestaCartera>(this.apiUrl, { params });
  }

  getCarteraPrestamosParaExportar(search?: string, moneda?: string, producto?: string, periodo?: string,
    condicion?: string, grupos?: string[] | null): Observable<any[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (moneda) params = params.set('moneda', moneda);
    if (producto) params = params.set('producto', producto);
    if (periodo) params = params.set('periodo', periodo);
    if (condicion) params = params.set('condicion', condicion);
    if (grupos && grupos.length > 0) {
      params = params.set('grupos', grupos.join(','));
    }
    return this.http.get<any[]>(`${this.apiUrl}/exportar`, { params });
  }

  getPeriodosDisponibles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/periodos-disponibles`);
  }
}
