import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class MovactivosService {
  private apiUrl = environment.apiUrl + '/movactivos';

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }
  getMovactivosPaginados(page: number, limit: number, search?: string, moneda?: string, producto?: string, desde?: Date, hasta?: Date): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    if (search) params = params.set('search', search);
    if (moneda) params = params.set('moneda', moneda);
    if (producto) params = params.set('producto', producto);
    if (desde) params = params.set('desde', desde.toISOString());
    if (hasta) params = params.set('hasta', hasta.toISOString());
    return this.http.get<any>(this.apiUrl, { params });
  }

  getMovactivosParaExportar(search?: string, moneda?: string, producto?: string, desde?: Date, hasta?: Date): Observable<any[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (moneda) params = params.set('moneda', moneda);
    if (producto) params = params.set('producto', producto);
    if (desde) params = params.set('desde', desde.toISOString());
    if (hasta) params = params.set('hasta', hasta.toISOString());
    return this.http.get<any[]>(`${this.apiUrl}/exportar`, { params });
  }

  getProductosUnicos(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/productos-unicos`);
  }

  registrarMovimiento(formData: any): Observable<any> {

    return this.http.post<any>(this.apiUrl, formData, { headers: this.getHeaders() });
  }

  updateMovimiento(id: Text, formData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData, { headers: this.getHeaders() });
  }
}
