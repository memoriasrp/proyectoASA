import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as XLSX from 'xlsx-js-style';

import { CateraPrestamosService } from '../../../services/vbcoop/catera-prestamos-service';
import { SeguimientoHistorialService } from '../../../services/vbcoop/seguimiento-historial-service';

@Component({
  selector: 'app-cartera-prestamos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cartera-prestamos.html',
  styleUrl: './cartera-prestamos.css',
})
export class CarteraPrestamos implements OnInit {
  carteraPrestamos: any[] = [];

  listaPeriodos: any[] = [];
  periodoSeleccionado: string = '';

  periodos$!: Observable<string[]>;
  currentPage: number = 1;
  totalPages: number = 1;
  totalRecords: number = 0;

  // Filtros vinculados a los inputs del HTML
  searchTerm: string = '';
  monedaSeleccionada: string = '';
  productoSeleccionado: string = '';
  condicionSeleccionado: string = '';
  periodo: string = '';


  // Nueva variable de control para saber si ya buscaron al menos una vez
  busquedaRealizada: boolean = false;
  loading: boolean = false;

  mostrarModal = false;
  socioSeleccionado: any = null;
  detalle: string = '';
  archivoSeleccionado: File | null = null;
  cargando: boolean = false;
  archivosSeleccionados: File[] = [];

  constructor(private carteraPrestamosService: CateraPrestamosService,
    private seguimientoHistorialService: SeguimientoHistorialService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarCombos();
  }
  cargarCombos(): void {
    //    this.periodos$ = this.carteraPasivosService.getPeriodosDisponibles();
    this.carteraPrestamosService.getPeriodosDisponibles().subscribe({
      next: (data) => {
        this.listaPeriodos = data || [];
        const periodoActivo = this.listaPeriodos.find(p => p.activo === true);
        this.periodoSeleccionado = periodoActivo.periodo;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar periodos:', err);
      }
    });

    this.condicionSeleccionado = 'VIGENTE';
  }
  // En tu archivo cartera-prestamos.component.ts

  imprimirTabla(): void {
    this.loading = true;
    this.cdr.detectChanges();

    // 1. Pedimos al API TODOS los registros acumulados en una sola página
    this.carteraPrestamosService.getCarteraPrestamosParaExportar(this.searchTerm, this.monedaSeleccionada, this.productoSeleccionado, this.periodoSeleccionado, this.condicionSeleccionado)
      .subscribe({
        next: (res) => {
          // Guardamos la página de 20 registros que el usuario estaba viendo actualmente
          const paginaOriginalRespaldada = [...this.carteraPrestamos];

          // Mapeamos todos los registros recibidos (calculando los porcentajes)
          const todosLosRegistros = (res || []).map((item: any) => {
            const desembolsado = Number(item.desembolso) || 0;
            const saldo = Number(item.saldocapitalmo) || 0;
            let pctPagado = 0;
            if (desembolsado > 0) {
              pctPagado = Math.min(Math.max(((desembolsado - saldo) / desembolsado) * 100, 0), 100);
            }
            return {
              ...item,
              porcentajePagado: pctPagado,
              porcentajeFaltante: 100 - pctPagado
            };
          });

          // 2. Reemplazamos temporalmente la lista en pantalla por el universo completo
          this.carteraPrestamos = todosLosRegistros;
          this.loading = false;
          this.cdr.detectChanges();

          // 3. Esperamos un instante a que Angular dibuje todas las filas y abrimos la impresión
          setTimeout(() => {
            window.print();

            // 4. Al cerrar el cuadro de diálogo, restauramos la vista de 20 registros al instante
            this.carteraPrestamos = paginaOriginalRespaldada;
            this.cdr.detectChanges();
          }, 350);
        },
        error: (err) => {
          console.error('Error al descargar data completa para impresión:', err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  ejecutarBusqueda(): void {
    this.currentPage = 1; // Reseteamos a la primera página en cada nueva búsqueda
    this.busquedaRealizada = true;
    this.cargarTabla();
  }
  cargarTabla(): void {
    this.loading = true;
    this.cdr.detectChanges();

    this.carteraPrestamosService.getCarteraPrestamosPaginados(
      this.currentPage,
      20,
      this.searchTerm,
      this.monedaSeleccionada,
      this.productoSeleccionado,
      this.periodoSeleccionado,
      this.condicionSeleccionado
    ).subscribe({
      next: (res: any) => {
        // 🟢 DETECCION FLEXIBLE: Si 'res' es directamente el array o viene en 'res.data'
        const dataCruda = Array.isArray(res) ? res : (res.data || []);

        this.carteraPrestamos = dataCruda.map((item: any) => {
          const desembolsado = Number(item.desembolso) || 0;
          const saldo = Number(item.saldocapitalmo) || 0;
          let pctPagado = 0;

          if (desembolsado > 0) {
            pctPagado = ((desembolsado - saldo) / desembolsado) * 100;
            pctPagado = Math.min(Math.max(pctPagado, 0), 100);
          }

          return {
            ...item,
            porcentajePagado: pctPagado,
            porcentajeFaltante: 100 - pctPagado
          };
        });

        this.totalPages = res.meta?.totalPages || 1;
        this.totalRecords = res.meta?.total || dataCruda.length;

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al consultar movimientos prestamos:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
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
    this.monedaSeleccionada = '';
    this.productoSeleccionado = '';
    this.periodo = '';
    this.condicionSeleccionado = 'VIGENTE';
    this.carteraPrestamos = [];
    this.currentPage = 1;
    this.totalPages = 1;
    this.totalRecords = 0;
    this.busquedaRealizada = false; // Regresa al estado inicial informativo
    this.cdr.detectChanges();
  }

  // Función de Exportación a Excel nativa
  exportarAExcel(): void {
    this.carteraPrestamosService.getCarteraPrestamosParaExportar(
      this.searchTerm,
      this.monedaSeleccionada,
      this.productoSeleccionado,
      this.periodoSeleccionado,
      this.condicionSeleccionado
    ).subscribe({
      next: (res) => {
        if (!res || res.length === 0) return;
        if (this.carteraPrestamos.length === 0) {
          alert('No hay datos en la tabla para exportar.');
          return;
        }

        const formatearFecha = (fechaInput: any): string => {
          if (!fechaInput) return '';
          const fechaStr = typeof fechaInput === 'string'
            ? fechaInput
            : new Date(fechaInput).toISOString();

          if (fechaStr.length >= 10) {
            const partes = fechaStr.slice(0, 10).split('-');
            if (partes.length === 3) {
              return `${partes[2]}/${partes[1]}/${partes[0]}`;
            }
          }
          return '';
        };

        // 1. Mapeamos los datos garantizando tipos numéricos reales
        const datosExportar = res.map(item => {
          const desembolso = Number(item.desembolso) || 0;
          const saldoCapitalMo = Number(item.saldocapitalmo) || 0;

          let pctPagadoDecimal = 0;
          if (desembolso > 0) {
            pctPagadoDecimal = (desembolso - saldoCapitalMo) / desembolso;
          }

          return {
            'Pagare': item.idpagare,
            'ID Socio': item.idsocio,
            'Socio': item.nombre,
            'Documento': item.numdoc,
            'Producto': item.descri,
            'MN': item.moneda === 'S' ? 'S/.' : '$',
            'F.Desem': formatearFecha(item.fechades),
            'F.Ult.Mov': formatearFecha(item.fecultmovimiento),
            'Desembolso MO': desembolso,
            'Cuotas': `${item.cuotas_pagadas || 0} de ${item.plazo || 0}`,
            'P.Interes mo': Number(item.pagointeresmo) || 0,
            'P.Interes mn': Number(item.pagointeresmn) || 0,
            'P.Mora mo': Number(item.pagomoramo) || 0,
            'P.Mora mn': Number(item.pagomoramn) || 0,
            'P.Seguro mo': Number(item.pagoseguromn) || 0,
            'P.Seguro mn': Number(item.pagoseguromn) || 0,
            'saldo_periodomo': saldoCapitalMo,
            'saldo_periodomn': Number(item.saldocapitalmn) || 0,
            '% de pago': pctPagadoDecimal,
            'tasa': Number(item.tasa) || 0,
            '# Mov.': Number(item.totalmov) || 0,
            'Condicion': item.condicion
          };
        });

        // Generamos la hoja de cálculo inicial
        const worksheet = XLSX.utils.json_to_sheet(datosExportar);

        // 2. 🟢 DEFINICIÓN DE ESTILOS DE EXCEL
        const bordeDelgado = {
          top: { style: 'thin', color: { rgb: '000000' } },
          bottom: { style: 'thin', color: { rgb: '000000' } },
          left: { style: 'thin', color: { rgb: '000000' } },
          right: { style: 'thin', color: { rgb: '000000' } }
        };

        const estiloCabecera = {
          font: { bold: true, color: { rgb: 'FFFFFF' }, size: 10 },
          fill: { fgColor: { rgb: '27AE60' } }, // Color verde corporativo de fondo
          alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
          border: bordeDelgado
        };

        const columnasMoneda = ['I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];
        const columnaPorcentaje = 'S';
        const columnaTasa = 'T';

        // 3. 🟢 RECORRER Y ESTILIZAR TODAS LAS CELDAS
        for (const cellAddress in worksheet) {
          if (cellAddress[0] === '!') continue; // Saltar metadata de la hoja

          const celda = worksheet[cellAddress];
          const columna = cellAddress.replace(/[0-9]/g, '');
          const fila = parseInt(cellAddress.replace(/[^0-9]/g, ''), 10);

          // Inicializamos el objeto de estilos en la celda
          celda.s = {
            border: bordeDelgado, // Bordes negros finos para todas las celdas
            font: { size: 9 },
            alignment: { vertical: 'center' }
          };

          if (fila === 1) {
            // A. Si es la fila 1, aplicamos el diseño de cabecera en negrita
            celda.s = estiloCabecera;
          } else {
            // B. Si es fila de datos, aplicamos los formatos numéricos y alineaciones correspondientes
            if (celda.t === 'n') {
              if (columnasMoneda.includes(columna)) {
                celda.z = '#,##0.00';
                celda.s.alignment = { horizontal: 'right' }; // Números a la derecha
              } else if (columna === columnaPorcentaje) {
                celda.z = '0.00%';
                celda.s.alignment = { horizontal: 'right' };
              } else if (columna === columnaTasa) {
                celda.z = '0.00';
                celda.s.alignment = { horizontal: 'right' };
              }
            } else {
              // Textos alineados a la izquierda o centro
              if (['A', 'B', 'D', 'F', 'G', 'H', 'J', 'U', 'V'].includes(columna)) {
                celda.s.alignment = { horizontal: 'center' };
              } else {
                celda.s.alignment = { horizontal: 'left' };
              }
            }
          }
        }

        // Configuración de anchos de columnas
        worksheet['!cols'] = [
          { wch: 12 }, { wch: 10 }, { wch: 40 }, { wch: 10 },
          { wch: 40 }, { wch: 5 }, { wch: 10 }, { wch: 10 },
          { wch: 15 }, { wch: 10 }, { wch: 15 }, { wch: 15 },
          { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 },
          { wch: 15 }, { wch: 15 }, { wch: 12 }, { wch: 8 },
          { wch: 8 }, { wch: 12 }
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Movimientos Prestamos');

        // Descarga el Excel con estilos
        XLSX.writeFile(workbook, `Reporte_carteraPrestamos_${new Date().toISOString().slice(0, 10)}.xlsx`);
      },
      error: (err) => console.error('Error al exportar cartera de préstamos:', err)
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
    formData.append('tipoproducto', this.socioSeleccionado.tipo);
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
