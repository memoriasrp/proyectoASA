import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PeriodoActivo {
  periodo: string;
  tc: number;
}

@Injectable({
  providedIn: 'root'
})
export class PeriodoEstadoService {

  // Subject con el estado inicial (leído de localStorage si existe)
  private periodoSubject = new BehaviorSubject<PeriodoActivo | null>(this.obtenerSesionGuardada());

  // Observable expuesto para suscribirse en cualquier módulo
  public periodo$: Observable<PeriodoActivo | null> = this.periodoSubject.asObservable();

  // periodo-estado.service.ts

  setPeriodoActivo(data: PeriodoActivo): void {
    // 1. Guardar en el almacenamiento local
    localStorage.setItem('periodo_activo', JSON.stringify(data));

    // Se usa setTimeout para notificar a la cabecera en el siguiente ciclo de detección de cambios
    setTimeout(() => {
      this.periodoSubject.next(data);
    });
  }

  // Obtener el valor síncrono actual en cualquier lugar
  get periodoActual(): PeriodoActivo | null {
    return this.periodoSubject.value;
  }

  // Limpiar sesión al cerrar sesión
  limpiarEstado(): void {
    localStorage.removeItem('periodo_activo');
    this.periodoSubject.next(null);
  }

  private obtenerSesionGuardada(): PeriodoActivo | null {
    const data = localStorage.getItem('periodo_activo');
    return data ? JSON.parse(data) : null;
  }
}