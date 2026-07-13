import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ObservacionesDpfService {
  private apiUrl = environment.apiUrl + '/carteradpf';

  constructor(private http: HttpClient) { }

  getObservacionesDpfPaginados(page: number, limit: number): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.http.get<any>(this.apiUrl, { params });
  }

  getObservacionesDpfParaExportar(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/exportar`);
  }
}
