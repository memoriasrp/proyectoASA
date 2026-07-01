import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignarIdsocioService, ResumenNulos } from '../../../services/sbs/asignar-idsocio';

@Component({
  selector: 'app-asignar-idsocio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asignar-idsocio.html',
  styleUrl: './asignar-idsocio.css',
})
export class AsignarIdsocio implements OnInit {
  resumen: ResumenNulos = { aportes: 0, ahorrosMN: 0, ahorrosME: 0, dpfMN: 0, dpfME: 0, prestamos: 0 };
  loading: boolean = true;

  // Añade estas variables a tu componente
  moduloActivoVisualizar: string | null = null;
  sociosPendientes: any[] = [];
  loadingDetalle: boolean = false;

  constructor(
    private apiService: AsignarIdsocioService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarResumen();
  }

  cargarResumen() {
    this.loading = true;
    this.apiService.getResumen().subscribe({
      next: (data) => {
        this.resumen = data;
        this.loading = false;
        this.cdr.detectChanges(); // Forzamos renderizado
      },
      error: (err) => {
        console.error('Error al traer el resumen', err);
        this.loading = false;
      }
    });
  }

  // Función para cuando hagan clic en un botón (puedes redirigir a cada pantalla)
  irAModulo(modulo: string) {
    if (confirm(`¿Deseas iniciar la búsqueda automática de ID Socio para ${modulo}?`)) {
      this.loading = true;
      this.apiService.conciliarModulo(modulo).subscribe({
        next: (resultado) => {
          alert(`Proceso terminado.\nRegistros evaluados: ${resultado.procesados}\nAsignados con éxito: ${resultado.actualizados}`);
          this.cargarResumen(); // Recargamos los contadores para ver cuántos nulos quedan
        },
        error: (err) => {
          console.error('Error en la conciliación', err);
          this.loading = false;
        }
      });
    }
  }

  verSocios(modulo: string) {
    if (this.moduloActivoVisualizar === modulo) {
      // Si vuelven a hacer clic en el mismo, se cierra el panel
      this.moduloActivoVisualizar = null;
      return;
    }

    this.moduloActivoVisualizar = modulo;
    this.loadingDetalle = true;
    this.sociosPendientes = [];

    this.apiService.getDetalleNulos(modulo).subscribe({
      next: (data) => {
        this.sociosPendientes = data;
        this.loadingDetalle = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar socios nulos', err);
        this.loadingDetalle = false;
      }
    });
  }
}
