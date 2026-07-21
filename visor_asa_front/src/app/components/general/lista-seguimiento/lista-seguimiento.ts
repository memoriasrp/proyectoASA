import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as XLSX from 'xlsx';

import { RouterModule } from '@angular/router';


import { ListaSegimientoService } from '../../../services/general/lista-segimiento-service';

@Component({
  selector: 'app-lista-seguimiento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './lista-seguimiento.html',
  styleUrl: './lista-seguimiento.css',
})
export class ListaSeguimiento implements OnInit {
  seguimientos: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  totalRecords: number = 0;
  private searchSubject = new Subject<string>();
  constructor(
    private listaSegimientoService: ListaSegimientoService,
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
    this.listaSegimientoService.getListaSeguimientoPaginados(this.currentPage, 50,
      this.searchTerm)
      .subscribe({
        next: (res: any) => {
          this.seguimientos = Array.isArray(res) ? res : (res.data || []);
          this.totalPages = res.meta.totalPages;
          this.totalRecords = res.meta.total; // Almacenamos el conteo total

          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al consultar los DPFs', err)
      });
  }

  // Cambiar de página respetando los filtros actuales
  cambiarPagina(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.cargarTabla();
    }
  }

  limpiarFiltros(): void {
    this.searchTerm = '';

    this.seguimientos = [];
    this.currentPage = 1;
    this.totalPages = 1;
    this.totalRecords = 0;
    this.cdr.detectChanges();
  }


}
