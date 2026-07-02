import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovpasivosService {
  private apiUrl = environment.apiUrl + '/movpasivos';

  constructor(private http: HttpClient) { }

  getMovpasivosPaginados(page: number, limit: number, search?: string, moneda?: string, producto?: string, desde?: Date, hasta?: Date): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    if (search) params = params.set('search', search);
    if (moneda) params = params.set('moneda', moneda);
    if (producto) params = params.set('producto', producto);
    if (desde) params = params.set('desde', desde.toISOString());
    if (hasta) params = params.set('hasta', hasta.toISOString());
    return this.http.get<any>(this.apiUrl, { params });
  }

  getMovpasivosParaExportar(search?: string, moneda?: string, producto?: string, desde?: Date, hasta?: Date): Observable<any[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (moneda) params = params.set('moneda', moneda);
    if (producto) params = params.set('producto', producto);
    if (desde) params = params.set('desde', desde.toISOString());
    if (hasta) params = params.set('hasta', hasta.toISOString());
    return this.http.get<any[]>(`${this.apiUrl}/exportar`, { params });
  }
}
