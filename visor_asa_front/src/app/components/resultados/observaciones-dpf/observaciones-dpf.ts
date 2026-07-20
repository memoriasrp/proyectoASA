import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as XLSX from 'xlsx';

import { ObservacionesDpfService } from '../../../services/resultados/observaciones-dpf-service';
import { SeguimientoHistorialService } from '../../../services/vbcoop/seguimiento-historial-service';

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

  mostrarModal = false;
  socioSeleccionado: any = null;
  detalle: string = '';
  archivoSeleccionado: File | null = null;
  cargando: boolean = false;
  archivosSeleccionados: File[] = [];

  private searchSubject = new Subject<string>();

  constructor(
    private observacionesDpfService: ObservacionesDpfService,
    private seguimientoHistorialService: SeguimientoHistorialService,
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

  abrirModalSeguimiento(item: any) {
    this.socioSeleccionado = item;
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }
  cerrarModal() {
    this.mostrarModal = false;
    this.socioSeleccionado = null;
    this.cdr.detectChanges();
  }
  guardarSeguimiento() {
    if (!this.detalle.trim()) {
      alert('Debe ingresar el detalle de la gestión.');
      return;
    }
    this.cargando = true;
    const formData = new FormData();
    formData.append('idsocio', this.socioSeleccionado.idsocio);
    formData.append('detalle', this.detalle);
    const idUsuarioLogeado = localStorage.getItem('idusuario') || '1';
    formData.append('idusuario', idUsuarioLogeado);
    formData.append('tipoproducto', 'DPF');
    formData.append('idproducto', this.socioSeleccionado.cuenta);

    if (this.archivosSeleccionados.length > 0) {
      this.archivosSeleccionados.forEach((archivo) => {
        // Usamos exactamente el mismo nombre de campo 'file' que espera el Backend
        formData.append('file', archivo, archivo.name);
      });
    }
    this.seguimientoHistorialService.guardarSeguimiento(formData).subscribe({
      next: () => {
        alert('Seguimiento y adjuntos registrados con éxito.');
        this.cerrarModal();
      },
      error: (err) => {
        console.error(err);
        alert('Error al guardar el registro.');
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });

  }
  removerArchivo(index: number): void {
    this.archivosSeleccionados.splice(index, 1);
    this.cdr.detectChanges();
  }
  onFilesSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validación individual de tamaño (10MB)
        if (file.size > 10 * 1024 * 1024) {
          alert(`El archivo "${file.name}" supera los 10MB permitidos y no será agregado.`);
          continue;
        }

        // Evitamos duplicar si el usuario selecciona el mismo archivo de nuevo
        if (!this.archivosSeleccionados.some(f => f.name === file.name && f.size === file.size)) {
          this.archivosSeleccionados.push(file);
        }
      }
    }
    this.cdr.detectChanges(); // Forzar dibujo de la lista de adjuntos
  }
}
