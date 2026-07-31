import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HojaResumenService {
  private apiUrl = environment.apiUrl + '/hoja-resumen';
  constructor(private http: HttpClient) { }
  obtenerHistorialSocio(idsocio: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/socio/${idsocio}`);
  }


}
