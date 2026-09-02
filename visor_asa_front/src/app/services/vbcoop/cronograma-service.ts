import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CronogramaService {
  private apiUrl = environment.apiUrl + '/cronograma';
  constructor(private http: HttpClient) { }
  obtenerCronograma(idpagare: string, fecha: string): Observable<any[]> {
    const params = new HttpParams().set('fecha', fecha);
    return this.http.get<any[]>(`${this.apiUrl}/${idpagare}/cronograma`, { params });
  }
}
