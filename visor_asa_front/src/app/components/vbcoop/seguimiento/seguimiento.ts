import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { environment } from '../../../../environments/environment';
import { SeguimientoService } from '../../../services/vbcoop/seguimiento-service';
import { SeguimientoHistorialService } from '../../../services/vbcoop/seguimiento-historial-service';

@Component({
  selector: 'app-seguimiento',
  imports: [RouterModule, FormsModule, CommonModule,],
  templateUrl: './seguimiento.html',
  styleUrl: './seguimiento.css',
})
export class Seguimiento implements OnInit {
  idsocio: string = '';

  // Listas de soporte para los combos
  todosLosProductos: any[] = []; // Guarda la respuesta cruda del backend
  tiposUnicos: string[] = [];     // Llenará el combo 1 (Tipos)
  cuentasFiltradas: any[] = [];   // Llenará el combo 2 (Cuentas/idcdp)

  // Modelos enlazados al Formulario
  tipoSeleccionado: string = 'GENERAL'; // Por defecto arranca en GENERAL
  cuentaSeleccionada: any = null;       // Almacenará el objeto completo de la cuenta o null si es GENERAL

  detalle: string = '';
  archivoSeleccionado: File | null = null;
  cargando: boolean = false;
  archivosSeleccionados: File[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seguimientoHistorialService: SeguimientoHistorialService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.idsocio = this.route.snapshot.paramMap.get('idsocio') || '';
    if (this.idsocio) {
      this.cargarCuentas();
    } else {
      this.router.navigate(['/vbcoop/socios']);
    }
  }

  cargarCuentas(): void {
    this.seguimientoHistorialService.obtenerProductosSocio(this.idsocio).subscribe({
      next: (data: any[]) => {
        this.todosLosProductos = data;

        // Extraemos los tipos únicos y removemos espacios en blanco (ej: 'AHORRO', 'PRESTAMO')
        const tipos = data.map(item => item.tipo ? item.tipo.trim().toUpperCase() : '');

        // Filtramos vacíos y creamos un Set para evitar duplicados. 
        // Agregamos siempre 'GENERAL' como primera opción fija.
        this.tiposUnicos = ['GENERAL', ...Array.from(new Set(tipos)).filter(t => t && t !== 'GENERAL')];

        // Inicializamos las cuentas del segundo combo (como arranca en GENERAL, estará en modo general)
        this.onTipoChange();
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Error al traer productos', err)
    });
  }

  onTipoChange(): void {
    // Reseteamos el segundo combo por defecto
    this.cuentaSeleccionada = null;

    if (this.tipoSeleccionado === 'GENERAL') {
      // Si seleccionó GENERAL en el combo 1, el combo 2 solo tiene una opción ficticia 'GENERAL'
      this.cuentasFiltradas = [];
    } else {
      // Filtramos las cuentas del array maestro que correspondan exactamente al tipo seleccionado
      this.cuentasFiltradas = this.todosLosProductos.filter(
        item => item.tipo && item.tipo.trim().toUpperCase() === this.tipoSeleccionado
      );
      this.cdRef.detectChanges();
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('El archivo supera los 10MB permitidos.');
        event.target.value = '';
        return;
      }
      this.archivoSeleccionado = file;
    }
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
    this.cdRef.detectChanges(); // Forzar dibujo de la lista de adjuntos
  }
  removerArchivo(index: number): void {
    this.archivosSeleccionados.splice(index, 1);
    this.cdRef.detectChanges();
  }
  guardar(): void {
    if (!this.detalle.trim()) {
      alert('Debe ingresar el detalle de la gestión.');
      return;
    }

    this.cargando = true;
    const formData = new FormData();

    formData.append('idsocio', this.idsocio);
    formData.append('detalle', this.detalle);
    formData.append('tipoproducto', this.tipoSeleccionado);

    const idUsuarioLogeado = localStorage.getItem('idusuario') || '1';
    formData.append('idusuario', idUsuarioLogeado);

    if (this.tipoSeleccionado !== 'GENERAL' && this.cuentaSeleccionada) {
      formData.append('idproducto', this.cuentaSeleccionada.idcdp);
    } else {
      formData.append('idproducto', '');
    }

    if (this.archivosSeleccionados.length > 0) {
      this.archivosSeleccionados.forEach((archivo) => {
        // Usamos exactamente el mismo nombre de campo 'file' que espera el Backend
        formData.append('file', archivo, archivo.name);
      });
    }

    this.seguimientoHistorialService.guardarSeguimiento(formData).subscribe({
      next: () => {
        alert('Seguimiento y adjuntos registrados con éxito.');
        this.router.navigate(['/vbcoop/seguimiento-historial', this.idsocio]);
      },
      error: (err) => {
        console.error(err);
        alert('Error al guardar el registro.');
        this.cargando = false;
        this.cdRef.detectChanges();
      }
    });
  }
}
