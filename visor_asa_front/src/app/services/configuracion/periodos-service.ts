import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PeriodoEstadoService } from '../init/periodo-estado.service';
@Injectable({
  providedIn: 'root',
})
export class PeriodosService {
  private apiUrl = `${environment.apiUrl}/periodos`;

  constructor(private http: HttpClient, private periodoEstadoService: PeriodoEstadoService) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getPeriodos(page: number, limit: number): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());

    return this.http.get<any>(this.apiUrl, { params });
  }
  crearPeriodo(periodo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, periodo, { headers: this.getHeaders() });
  }

  actualizarPeriodo(periodoId: string, periodo: any): Observable<any> {
    const url = `${this.apiUrl}/${periodoId}`;
    return this.http.put<any>(url, periodo, { headers: this.getHeaders() });
  }

  activarPeriodo(periodoId: string): Observable<any> {
    const url = `${this.apiUrl}/${periodoId}/activar`;
    return this.http.patch<any>(url, {}, { headers: this.getHeaders() }).pipe(
      tap((periodoActivado) => {
        // Verifica si la respuesta contiene el periodo y el tipo de cambio (tc)
        if (periodoActivado) {
          this.periodoEstadoService.setPeriodoActivo({
            periodo: periodoActivado.periodo,
            tc: periodoActivado.tc
          });
        }
      })
    );
  }
  RecalcularPeriodo(periodoId: string): Observable<any> {
    const url = `${this.apiUrl}/${periodoId}/recalcular`;
    return this.http.patch<any>(url, { headers: this.getHeaders() });
  }

  eliminarPeriodo(periodoId: string): Observable<any> {
    const url = `${this.apiUrl}/${periodoId}`;
    return this.http.delete<any>(url, { headers: this.getHeaders() });
  }

}
