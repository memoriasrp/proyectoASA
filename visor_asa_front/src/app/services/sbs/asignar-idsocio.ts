import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
export interface ResumenNulos {
  aportes: number;
  ahorrosMN: number;
  ahorrosME: number;
  dpfMN: number;
  dpfME: number;
  prestamos: number;
}


@Injectable({
  providedIn: 'root',
})
export class AsignarIdsocioService {
  private apiUrl = `${environment.apiUrl}/sbs/asignar-idsocio`;


  constructor(private http: HttpClient) { }

  getResumen(): Observable<ResumenNulos> {
    return this.http.get<ResumenNulos>(`${this.apiUrl}/resumen`);
  }

  conciliarModulo(modulo: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/conciliar/${modulo}`, {});
  }

  getDetalleNulos(modulo: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/detalle/${modulo}`);
  }
}
