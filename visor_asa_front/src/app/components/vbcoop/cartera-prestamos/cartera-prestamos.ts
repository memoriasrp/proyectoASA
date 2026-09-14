import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as XLSX from 'xlsx-js-style';

import { CateraPrestamosService } from '../../../services/vbcoop/catera-prestamos-service';
import { SeguimientoHistorialService } from '../../../services/vbcoop/seguimiento-historial-service';


export interface GrupoOption {
  nombre: string;
  seleccionado: boolean;
}
@Component({
  selector: 'app-cartera-prestamos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cartera-prestamos.html',
  styleUrl: './cartera-prestamos.css',
})
export class CarteraPrestamos implements OnInit {
  carteraOriginal: any[] = [];
  carteraPrestamos: any[] = [];
  dataSource: any;
  listaPeriodos: any[] = [];
  gruposSeleccionados: string[] = [];
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

  gruposDisponibles: GrupoOption[] = [];

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
      next: (data: any[]) => {
        this.dataSource = data || [];
        this.listaPeriodos = this.dataSource.periodos || [];
        const periodoActivo = this.listaPeriodos.find(p => p.activo === true);
        this.gruposDisponibles = this.dataSource.gruposDisponibles.map((nombre: string) => ({
          nombre,
          seleccionado: true
        }));
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


    const hayDesmarcados = this.gruposDisponibles.some(grupo => !grupo.seleccionado);

    // 2. Si hay desmarcados enviamos el arreglo de seleccionados; si todos están marcados, enviamos null
    const gruposSeleccionados: string[] | null = hayDesmarcados
      ? this.gruposDisponibles
        .filter(grupo => grupo.seleccionado)
        .map(grupo => grupo.nombre)
      : null;

    // 3. Petición al servicio pasándole los parámetros
    this.carteraPrestamosService.getCarteraPrestamosPaginados(
      this.currentPage,
      20,
      this.searchTerm,
      this.monedaSeleccionada,
      this.productoSeleccionado,
      this.periodoSeleccionado,
      this.condicionSeleccionado,
      gruposSeleccionados

    ).subscribe({
      next: (res: any) => {

        const dataCruda = Array.isArray(res) ? res : (res.data || []);
        this.carteraOriginal = res || [];
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

  marcarTodosGrupos(estado: boolean): void {
    this.gruposDisponibles.forEach(g => g.seleccionado = estado);

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
    const hayDesmarcados = this.gruposDisponibles.some(grupo => !grupo.seleccionado);

    const gruposSeleccionados: string[] | null = hayDesmarcados
      ? this.gruposDisponibles
        .filter(grupo => grupo.seleccionado)
        .map(grupo => grupo.nombre)
      : null;

    this.carteraPrestamosService.getCarteraPrestamosParaExportar(
      this.searchTerm,
      this.monedaSeleccionada,
      this.productoSeleccionado,
      this.periodoSeleccionado,
      this.condicionSeleccionado,
      gruposSeleccionados
    ).subscribe({
      next: (res) => {
        if (!res || res.length === 0) {
          alert('No hay datos disponibles para exportar.');
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

        // 🟢 CORREGIDO: Cálculo estricto de días enteros (Entero puro)
        const calcularDiasAtraso = (fechaUltMov: any): number => {
          if (!fechaUltMov) return 0;

          const fechaMov = new Date(fechaUltMov);
          const hoy = new Date();

          if (isNaN(fechaMov.getTime())) return 0;

          // Extraer milisegundos UTC a medianoche para evitar desfasajes por zona horaria/DST
          const utcMov = Date.UTC(fechaMov.getUTCFullYear(), fechaMov.getUTCMonth(), fechaMov.getUTCDate());
          const utcHoy = Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

          const diferenciaMs = utcHoy - utcMov;
          const dias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

          return dias > 0 ? dias : 0;
        };

        // Estilo base para celdas y cabeceras
        const bordeDelgado = {
          top: { style: 'thin', color: { rgb: '000000' } },
          bottom: { style: 'thin', color: { rgb: '000000' } },
          left: { style: 'thin', color: { rgb: '000000' } },
          right: { style: 'thin', color: { rgb: '000000' } }
        };

        const estiloCabecera = {
          font: { bold: true, color: { rgb: 'FFFFFF' }, size: 10 },
          fill: { fgColor: { rgb: '27AE60' } },
          alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
          border: bordeDelgado
        };

        // 🟢 CORREGIDO: formateador global de hojas con soporte para enteros (colEnteros)
        const aplicarEstilosHoja = (
          worksheet: any,
          colsMoneda: string[],
          colsEnteros: string[] = [],
          colPct?: string,
          colTasa?: string
        ) => {
          for (const cellAddress in worksheet) {
            if (cellAddress[0] === '!') continue;

            const celda = worksheet[cellAddress];
            const columna = cellAddress.replace(/[0-9]/g, '');
            const fila = parseInt(cellAddress.replace(/[^0-9]/g, ''), 10);

            celda.s = {
              border: bordeDelgado,
              font: { size: 9 },
              alignment: { vertical: 'center' }
            };

            if (fila === 1) {
              celda.s = estiloCabecera;
            } else {
              if (celda.t === 'n') {
                if (colsMoneda.includes(columna)) {
                  celda.z = '#,##0.00';
                  celda.s.alignment = { horizontal: 'right' };
                } else if (columna === colPct) {
                  celda.z = '0.00%';
                  celda.s.alignment = { horizontal: 'right' };
                } else if (columna === colTasa) {
                  celda.z = '0.00';
                  celda.s.alignment = { horizontal: 'right' };
                } else if (colsEnteros.includes(columna)) {
                  celda.z = '#,##0'; // 👈 Formato explícito para enteros sin decimales
                  celda.s.alignment = { horizontal: 'right' };
                } else {
                  celda.z = '#,##0';
                  celda.s.alignment = { horizontal: 'right' };
                }
              } else {
                celda.s.alignment = { horizontal: 'left' };
              }
            }
          }
        };

        // ==========================================
        // 1. HOJA: RESUMIDO (Agrupado por T.Credito / Grupo)
        // ==========================================
        interface AcumuladoGrupoMoneda {
          grupo: string;
          monedaStr: string;
          cantidad: number;
          totalDesembolso: number;
          totalSaldoMO: number;
          totalSaldoMN: number;
        }

        const resumenMap = new Map<string, AcumuladoGrupoMoneda>();

        res.forEach(item => {
          const grupo = item.formptmo?.tipoptmo?.grupo || 'SIN GRUPO';
          const monedaStr = item.moneda === 'S' ? 'S/.' : '$';
          const key = `${grupo}|${monedaStr}`;

          const desembolso = Number(item.desembolso) || 0;
          const saldoMO = Number(item.saldocapitalmo) || 0;
          const saldoMN = Number(item.saldocapitalmn) || 0;

          if (!resumenMap.has(key)) {
            resumenMap.set(key, {
              grupo,
              monedaStr,
              cantidad: 0,
              totalDesembolso: 0,
              totalSaldoMO: 0,
              totalSaldoMN: 0,
            });
          }

          const actual = resumenMap.get(key)!;
          actual.cantidad += 1;
          actual.totalDesembolso += desembolso;
          actual.totalSaldoMO += saldoMO;
          actual.totalSaldoMN += saldoMN;
        });

        const datosResumidos = Array.from(resumenMap.values()).map((acum) => ({
          'Tipo de Crédito': acum.grupo,
          Moneda: acum.monedaStr,
          'Cant. Préstamos': acum.cantidad,
          'Total Desembolso': acum.totalDesembolso,
          'Total Saldo MO': acum.totalSaldoMO,
          'Total Saldo MN': acum.totalSaldoMN,
        }));

        const sheetResumido = XLSX.utils.json_to_sheet(datosResumidos);
        // C: Cantidad (Entero), D, E, F: Monedas
        aplicarEstilosHoja(sheetResumido, ['D', 'E', 'F'], ['C']);
        sheetResumido['!cols'] = [
          { wch: 30 }, { wch: 10 }, { wch: 15 }, { wch: 18 }, { wch: 18 }, { wch: 18 }
        ];

        // ==========================================
        // 2. HOJA: SALDOS
        // ==========================================
        const datosSaldos = res.map(item => ({
          'T.Credito': item.formptmo?.tipoptmo?.grupo || 'SIN GRUPO',
          'Producto': item.descri,
          'Pagare': item.idpagare,
          'ID Socio': item.idsocio,
          'Socio': item.nombre,
          'Documento': item.numdoc,
          'Moneda': item.moneda === 'S' ? 'S/.' : '$',
          'Desembolso MO': Number(item.desembolso) || 0,
          'Saldo Capital MO': Number(item.saldocapitalmo) || 0,
          'Saldo Capital MN': Number(item.saldocapitalmn) || 0,
          'D. Atraso': calcularDiasAtraso(item.fecultmovimiento)
        }));

        const sheetSaldos = XLSX.utils.json_to_sheet(datosSaldos);
        // 🟢 CORREGIDO: Monedas en H, I, J | D. Atraso en K (Entero)
        aplicarEstilosHoja(sheetSaldos, ['H', 'I', 'J'], ['K']);
        sheetSaldos['!cols'] = [
          { wch: 25 }, { wch: 35 }, { wch: 15 }, { wch: 15 }, { wch: 35 },
          { wch: 12 }, { wch: 8 }, { wch: 16 }, { wch: 16 }, { wch: 16 }, { wch: 12 }
        ];

        // ==========================================
        // 3. HOJA: DETALLADO (Todos los campos)
        // ==========================================
        const datosDetallados = res.map(item => {
          const desembolso = Number(item.desembolso) || 0;
          const saldoCapitalMo = Number(item.saldocapitalmo) || 0;
          let pctPagadoDecimal = 0;
          if (desembolso > 0) {
            pctPagadoDecimal = (desembolso - saldoCapitalMo) / desembolso;
          }

          return {
            'T.Credito': item.formptmo?.tipoptmo?.grupo || 'SIN GRUPO',
            'Producto': item.descri,
            'Pagare': item.idpagare,
            'ID Socio': item.idsocio,
            'Socio': item.nombre,
            'Documento': item.numdoc,
            'MN': item.moneda === 'S' ? 'S/.' : '$',
            'F.Desem': formatearFecha(item.fechades),
            'F.Ult.Mov': formatearFecha(item.fecultmovimiento),
            'D. Atraso': calcularDiasAtraso(item.fecultmovimiento),
            'Desembolso MO': desembolso,
            'Cuotas': `${item.cuotas_pagadas || 0} de ${item.plazo || 0}`,
            'P.Interes mn': Number(item.pagointeresmn) || 0,
            'P.Mora mn': Number(item.pagomoramn) || 0,
            'P.Seguro mn': Number(item.pagoseguromn) || 0,
            'saldo_periodomn': Number(item.saldocapitalmn) || 0,
            '% de pago': pctPagadoDecimal,
            'tasa': Number(item.tasa) || 0,
            '# Mov.': Number(item.totalmov) || 0
          };
        });

        const sheetDetallado = XLSX.utils.json_to_sheet(datosDetallados);
        // Monedas: K, M, N, O, P, Q, R, S, T | Enteros: J ('D. Atraso'), W ('# Mov.') | Pct: U | Tasa: V
        aplicarEstilosHoja(
          sheetDetallado,
          ['K', 'M', 'N', 'O', 'P'], // Monedas
          ['J', 'S'],               // Enteros
          'Q',                       // % de pago
          'R'                        // Tasa
        );

        // 🟢 Anchos ajustados exactamente para las 19 columnas (A a la S)
        sheetDetallado['!cols'] = [
          { wch: 25 }, // A: T.Credito
          { wch: 30 }, // B: Producto
          { wch: 15 }, // C: Pagare
          { wch: 12 }, // D: ID Socio
          { wch: 35 }, // E: Socio
          { wch: 12 }, // F: Documento
          { wch: 6 },  // G: MN
          { wch: 12 }, // H: F.Desem
          { wch: 12 }, // I: F.Ult.Mov
          { wch: 10 }, // J: D. Atraso
          { wch: 16 }, // K: Desembolso MO
          { wch: 12 }, // L: Cuotas
          { wch: 15 }, // M: P.Interes mn
          { wch: 15 }, // N: P.Mora mn
          { wch: 15 }, // O: P.Seguro mn
          { wch: 16 }, // P: saldo_periodomn
          { wch: 12 }, // Q: % de pago
          { wch: 8 },  // R: tasa
          { wch: 8 },  // S: # Mov.
        ];

        // ==========================================
        // ENSAMBLAR LIBRO DE TRABAJO Y DESCARGAR
        // ==========================================
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, sheetResumido, 'Resumido');
        XLSX.utils.book_append_sheet(workbook, sheetSaldos, 'Saldos');
        XLSX.utils.book_append_sheet(workbook, sheetDetallado, 'Detallado');

        XLSX.writeFile(workbook, `Reporte_CarteraPrestamos_${new Date().toISOString().slice(0, 10)}.xlsx`);
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
