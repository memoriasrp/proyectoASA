import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodoEstadoService } from '../../services/init/periodo-estado.service';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CronogramaService {
  private apiUrl = environment.apiUrl + '/cronograma';
  constructor(private http: HttpClient,
    private periodoEstadoService: PeriodoEstadoService) { }

  obtenerCronograma(idpagare: string, fecha: string): Observable<any[]> {
    const token = localStorage.getItem('access_token') || localStorage.getItem('token');
    const periodoInfo = this.periodoEstadoService.periodoActual;

    // 1. Inyectamos la autorización, el periodo y el tipo de cambio en las cabeceras
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    if (periodoInfo && periodoInfo.periodo) {
      headers = headers.set('x-periodo', periodoInfo.periodo);
      headers = headers.set('x-tipo-cambio', periodoInfo.tc ? periodoInfo.tc.toString() : '0');
    }

    const params = new HttpParams().set('fecha', fecha);

    // 2. 🟢 Pasamos AMBOS objetos ({ headers, params }) en la opción del GET
    return this.http.get<any[]>(`${this.apiUrl}/${idpagare}/cronograma`, { headers, params });
  }
}
