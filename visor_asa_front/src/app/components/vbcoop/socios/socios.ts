import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SociosService } from '../../../services/vbcoop/socios-service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-socios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './socios.html',
  styleUrl: './socios.css',
})
export class Socios implements OnInit {
  private sociosService = inject(SociosService);
  private cdr = inject(ChangeDetectorRef);

  socios: any[] = [];
  searchTerm: string = '';

  // Estado inicial de la paginación
  currentPage: number = 1;
  pageSize: number = 20;
  totalRecords: number = 0;
  totalPages: number = 0;

  // Manejo de debounce para optimizar el buscador de socios (+1000 registros)
  private searchSubject = new Subject<string>();

  ngOnInit(): void {
    this.loadSocios();

    // Configuración del buscador: espera 400ms después de que el usuario deja de escribir
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1; // Volvemos a la página 1 en cada nueva búsqueda
      this.loadSocios();
    });
  }

  loadSocios(): void {
    this.sociosService.getSocios(this.currentPage, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response) => {
          this.socios = response.data;
          this.totalRecords = response.meta.total;
          this.totalPages = response.meta.totalPages;

          // Previene desfases visuales en el renderizado standalone
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al consultar el padrón de socios', err)
      });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadSocios();
    }
  }
}
