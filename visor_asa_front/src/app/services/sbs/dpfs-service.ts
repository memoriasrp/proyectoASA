import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DpfsService {
  private apiUrl = `http://localhost:3000/dpf`;

  constructor(private http: HttpClient) { }

  getDpfsPaginados(page: number, limit: number, search?: string, moneda?: string): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    if (search) params = params.set('search', search);
    if (moneda !== undefined) params = params.set('moneda', moneda.toString());
    return this.http.get<any>(this.apiUrl, { params });
  }

  getDpfsParaExportar(search?: string, moneda?: string): Observable<any[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (moneda !== undefined) params = params.set('moneda', moneda.toString());
    return this.http.get<any[]>(`${this.apiUrl}/exportar`, { params });
  }
}
