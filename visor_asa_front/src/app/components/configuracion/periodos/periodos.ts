import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeriodosService } from '../../../services/configuracion/periodos-service';

interface PeriodoTabla {
  periodo: string;
  fecha: Date;
  tc: number;
}

@Component({
  selector: 'app-periodos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './periodos.html',
  styleUrl: './periodos.css',
})
export class Periodos implements OnInit {
  periodos: PeriodoTabla[] = [];
  mostrarModal: boolean = false;
  modoEdicion: boolean = false;
  periodoEditando: string | null = null;

  currentPage: number = 1;
  totalPages: number = 1;
  totalRecords: number = 0;

  constructor(private periodosService: PeriodosService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarPeriodos();
  }
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.cargarPeriodos();
    }
  }
  cargarPeriodos(): void {
    // Asegúrate de tener declaradas tus variables de control de páginas arriba

    this.periodosService.getPeriodos(this.currentPage, 20).subscribe({
      next: (res) => {
        // 🟢 EXTRAEMOS LA DATA REAL (El arreglo)
        this.periodos = res.data || [];

        // 🟢 CAPTURAMOS LOS METADATOS DE PAGINACIÓN (Para tus botones de la tabla)
        if (res.meta) {
          this.totalPages = res.meta.totalPages;
          this.totalRecords = res.meta.total;
        }

        this.changeDetectorRef.detectChanges();
      },
      error: (err) => console.error('Error al traer los periodos:', err)
    });
  }
}
