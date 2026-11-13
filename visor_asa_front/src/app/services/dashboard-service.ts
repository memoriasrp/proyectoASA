import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DashboardResumen {
  ahorros: {
    cantidadMN: number;
    cantidadME: number;
    cantidad: number;
    cantidadInicial: number;
    SaldoMN: number;
    SaldoME: number;
    Saldo: number;
    SaldoInicial: number;
  };
  dpf: {
    cantidadMN: number;
    cantidadME: number;
    cantidad: number;
    cantidadInicial: number;
    totalMN: number;
    totalME: number;
    total: number;
    totalInicial: number;
  };
  prestamos: {
    cantidadMN: number;
    cantidadME: number;
    cantidad: number;
    cantidadInicial: number;
    totalMN: number;
    totalME: number;
    total: number;
    totalInicial: number;
  };
  seguimientos: {
    total: number;
    mes: number;
    semana: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/resultados/dashboard`;

  constructor(private http: HttpClient) { }

  obtenerResumen(): Observable<DashboardResumen> {
    const token = localStorage.getItem('access_token') || localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<DashboardResumen>(`${this.apiUrl}/resumen`, { headers });
  }
}