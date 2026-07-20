import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as XLSX from 'xlsx';

import { ObservacionesPrestamoService } from '../../../services/resultados/observaciones-prestamo-service';
import { SeguimientoHistorialService } from '../../../services/vbcoop/seguimiento-historial-service';

@Component({
  selector: 'app-observaciones-prestamo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './observaciones-prestamo.html',
  styleUrl: './observaciones-prestamo.css',
})
export class ObservacionesPrestamo implements OnInit {
  prestamos: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  totalRecords: number = 0;
  private searchSubject = new Subject<string>();
  monedaSeleccionada: string = '';
  excluirCastigados: boolean = true; //
  excluirFalsificados: boolean = true; //

  mostrarModal = false;
  socioSeleccionado: any = null;
  detalle: string = '';
  archivoSeleccionado: File | null = null;
  cargando: boolean = false;
  archivosSeleccionados: File[] = [];

  constructor(
    private observacionesPrestamoService: ObservacionesPrestamoService,
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
    this.observacionesPrestamoService.getPrestamosPaginados(this.currentPage, 50,
      this.searchTerm, this.monedaSeleccionada, this.excluirCastigados, this.excluirFalsificados)
      .subscribe({
        next: (res) => {
          this.prestamos = res.data;
          this.totalPages = res.meta.totalPages;
          this.totalRecords = res.meta.total; // Almacenamos el conteo total

          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al consultar los DPFs', err)
      });
  }

  exportarExcel(): void {
    this.observacionesPrestamoService.getPrestamosParaExportar(this.searchTerm, this.monedaSeleccionada, this.excluirCastigados, this.excluirFalsificados)
      .subscribe({
        next: (res) => {
          if (!res || res.length === 0) return;

          // 1. MAPEAMOS LOS DATOS PARA DARLES FORMATO Y CAMBIAR LA MONEDA
          const datosMapeados = res.map((item: any) => ({
            'Cuenta': item.cuenta || '---',
            'ID Socio': item.idsocioc || '---',
            'Socio / Nombres': item.nombres || '---',
            'Moneda': item.moneda == 1 ? 'S/.' : '$',
            // Aseguramos que los saldos e intereses viajen como números puros
            'Saldo 2023': item.saldo230831 ? Number(item.saldo230831) : 0,
            'Factor 2023': item.factor23 ? Number(item.factor23) : 0,
            'Interés 2023': item.interes23 ? Number(item.interes23) : 0,
            'Saldo 2024': item.saldo241231 ? Number(item.saldo241231) : 0,
            'Factor 2024': item.factor24 ? Number(item.factor24) : 0,
            'Interés 2024': item.interes24 ? Number(item.interes24) : 0,
            'Saldo 2025': item.saldo251231 ? Number(item.saldo251231) : 0
          }));

          // 2. CREAMOS LA HOJA CON LOS DATOS MAPEADOS HABILITANDO LOS ESTILOS
          const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosMapeados, { cellStyles: true });

          for (const cellRef in worksheet) {
            if (cellRef[0] === '!') continue; // Ignoramos metadatos internos de la hoja

            const cell = worksheet[cellRef];

            if (typeof cell.v === 'number') {
              cell.t = 'n'; // Forzamos tipo "Number" para evitar advertencias de Excel

              // Extraemos la letra de la columna para identificarla (A, B, C, D...)
              const columna = cellRef.replace(/[0-9]/g, '');

              // Basándonos en tu mapeo de columnas anteriores:
              // F = Factor 2023  |  I = Factor 2024
              if (columna === 'F' || columna === 'I') {
                cell.z = '0.0000';
              } else {
                cell.z = '#,##0.00'; // Máscara de 2 decimales con comas de miles para Saldos e Intereses
              }
            }
          }

          // 4. OPCIONAL: Ajustamos el ancho de las columnas para que no se corte el texto
          worksheet['!cols'] = [
            { wch: 20 }, { wch: 15 }, { wch: 40 }, { wch: 10 },
            { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 },
            { wch: 15 }, { wch: 15 }, { wch: 15 }
          ];

          // 5. PROCESO DE DESCARGA ORIGINAL TRADICIONAL
          const workbook: XLSX.WorkBook = { Sheets: { 'Dpfs': worksheet }, SheetNames: ['Dpfs'] };
          const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

          const url = window.URL.createObjectURL(data);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'dpfs_sbs.xlsx';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => console.error('Error al exportar ahorros SBS', err)
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
    formData.append('tipoproducto', 'PRESTAMO');
    formData.append('idproducto', this.socioSeleccionado.idpagare);

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
