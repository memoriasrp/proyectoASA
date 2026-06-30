import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AportacionesService {
  private apiUrl = `http://localhost:3000/aportaciones`;

  constructor(private http: HttpClient) { }

  getAportacionesPaginadas(page: number, limit: number, search?: string): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    if (search) params = params.set('search', search);
    return this.http.get<any>(this.apiUrl, { params });
  }

  getAportacionesParaExportar(search?: string): Observable<any[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<any[]>(`${this.apiUrl}/exportar`, { params });
  }
}
