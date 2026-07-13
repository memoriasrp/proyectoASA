import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as XLSX from 'xlsx';

import { ObservacionesDpfService } from '../../../services/resultados/observaciones-dpf-service';
@Component({
  selector: 'app-observaciones-dpf',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './observaciones-dpf.html',
  styleUrl: './observaciones-dpf.css',
})
export class ObservacionesDpf implements OnInit {
  observacionesDpf: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  totalRecords: number = 0;

  loading: boolean = false;

  private searchSubject = new Subject<string>();

  constructor(
    private observacionesDpfService: ObservacionesDpfService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarTabla();
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1; // Volvemos a la página 1 en cada nueva búsqueda
      this.cargarTabla();
    });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.cargarTabla();
    }
  }

  cargarTabla() {
    this.loading = true;
    this.cdr.detectChanges();
    this.observacionesDpfService.getObservacionesDpfPaginados(this.currentPage, 20)
      .subscribe({
        next: (res) => {
          this.observacionesDpf = res.data;
          this.totalPages = res.meta.totalPages;
          this.totalRecords = res.meta.total; // Almacenamos el conteo total
          this.loading = false;
          this.cdr.detectChanges();

        },
        error: (err) => {
          console.error('Error al cargar observaciones DPF:', err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }
}
