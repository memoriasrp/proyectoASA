import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TipoGastosService {
  private apiUrl = `${environment.apiUrl}/tipogastos`;

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token') || localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  createTipoGasto(tipoGastos: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, tipoGastos, { headers: this.getHeaders() });
  }

  getTiposGastos(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }
  getTipoGasto(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  updateTipoGasto(id: number, tipoGastos: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, tipoGastos, { headers: this.getHeaders() });
  }

  deleteTipoGasto(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url, { headers: this.getHeaders() });
  }
}
