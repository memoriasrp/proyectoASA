import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { ActivatedRoute } from '@angular/router';

import { CateraPasivosService } from '../../../services/vbcoop/catera-pasivos-service';
import { SeguimientoHistorialService } from '../../../services/vbcoop/seguimiento-historial-service';

@Component({
  selector: 'app-cartera-pasivos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cartera-pasivos.html',
  styleUrl: './cartera-pasivos.css',
})
export class CarteraPasivos implements OnInit {
  carteraPasivos: any[] = [];

  listaPeriodos: any[] = [];
  periodoSeleccionado: string = '';

  periodos$!: Observable<string[]>;
  currentPage: number = 1;
  totalPages: number = 1;
  totalRecords: number = 0;

  // Filtros vinculados a los inputs del HTML
  searchTerm: string = '';
  monedaSeleccionada: string = '';
  productoSeleccionado: string = 'TODOS';
  condicionSeleccionado: string = 'VIGENTE';
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
  constructor(
    private carteraPasivosService: CateraPasivosService,
    private seguimientoHistorialService: SeguimientoHistorialService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCombos();
    this.route.data.subscribe(data => {
      if (data['productoDefecto']) {
        this.productoSeleccionado = data['productoDefecto'];
      }
    });

  }

  cargarCombos(): void {
    //    this.periodos$ = this.carteraPasivosService.getPeriodosDisponibles();
    this.carteraPasivosService.getPeriodosDisponibles().subscribe({
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
  }
  ejecutarBusqueda(): void {
    this.currentPage = 1; // Reseteamos a la primera página en cada nueva búsqueda
    this.busquedaRealizada = true;
    this.cargarTabla();
  }

  cargarTabla(): void {
    this.loading = true;
    this.cdr.detectChanges();

    this.carteraPasivosService.getCarteraPasivosPaginados(
      this.currentPage,
      20,
      this.searchTerm,
      this.monedaSeleccionada,
      this.productoSeleccionado,
      this.periodoSeleccionado,
      this.condicionSeleccionado
    ).subscribe({
      next: (res: any) => {
        this.carteraPasivos = Array.isArray(res) ? res : (res.data || []);

        this.totalPages = res.meta?.totalPages || 1;
        this.totalRecords = res.meta?.total || this.carteraPasivos.length;

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al consultar movimientos pasivos:', err);
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
    this.condicionSeleccionado = '';
    this.carteraPasivos = [];
    this.currentPage = 1;
    this.totalPages = 1;
    this.totalRecords = 0;
    this.busquedaRealizada = false; // Regresa al estado inicial informativo
    this.cdr.detectChanges();
  }

  // Función de Exportación a Excel nativa
  exportarAExcel(): void {
    this.carteraPasivosService.getCarteraPasivosParaExportar(this.searchTerm, this.monedaSeleccionada, this.productoSeleccionado, this.periodoSeleccionado, this.condicionSeleccionado)
      .subscribe({
        next: (res) => {
          if (!res || res.length === 0) return;
          if (this.carteraPasivos.length === 0) {
            alert('No hay datos en la tabla para exportar.');
            return;
          }
          const formatearFecha = (fechaInput: any): string => {
            if (!fechaInput) return '';

            // Si el backend lo manda como Date u objeto, lo pasamos a string ISO
            const fechaStr = typeof fechaInput === 'string'
              ? fechaInput
              : new Date(fechaInput).toISOString();

            // fechaStr suele venir como "YYYY-MM-DD..." (ej: "2010-05-27T00:00:00.000Z")
            if (fechaStr.length >= 10) {
              const partes = fechaStr.slice(0, 10).split('-'); // Rompe en ['YYYY', 'MM', 'DD']
              if (partes.length === 3) {
                return `${partes[2]}/${partes[1]}/${partes[0]}`; // Retorna "DD/MM/YYYY" exactamente
              }
            }

            return '';
          };
          // Mapeamos las columnas para que salgan con nombres limpios en el reporte de la cooperativa
          //	"totalitem"	"totalmov"	"fecdeposito"	"fecultmov"	"condicion"

          const datosExportar = res.map(item => ({
            'Tipo': item.tipo,
            'Cuenta': item.idcdp,
            'ID Socio': item.idsocio,
            'Socio': item.nombre,
            'Documento': item.numdoc,
            'Producto': item.descri,
            'Moneda': item.moneda === 'S' ? 'Soles' : 'Dólares',
            'Fecha': formatearFecha(item.fecing),
            'Capital MO': item.cap_originalmo * (1),
            'Capital MN': item.cap_originalmn * (1),
            'pagointeres_periodomo': item.pagointeres_periodomo * (1),
            'pagointeres_periodomn': item.pagointeres_periodomn * (1),
            'saldo_periodomo': item.saldo_periodomo * (1),
            'saldo_periodomn': item.saldo_periodomn * (1),
            'plazo': item.plazo,
            'tasa': item.tasa,
            'tasa Anual': item.tasaanual,
            'item': item.totalitem,
            '# Movimientos': item.totalmov,
            'Fec Ult Movimiento': formatearFecha(item.fecultmov),
            'Condicion': item.condicion
          }));

          const worksheet = XLSX.utils.json_to_sheet(datosExportar);
          worksheet['!cols'] = [
            { wch: 15 }, { wch: 50 }, { wch: 15 }, { wch: 10 },
            { wch: 10 }, { wch: 15 }, { wch: 20 }, { wch: 15 },
            { wch: 10 }, { wch: 10 }, { wch: 15 }, { wch: 15 }
            , { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 },
            { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 },
            { wch: 15 }, { wch: 15 }
          ];
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Movimientos Pasivos');

          // Descarga el Excel
          XLSX.writeFile(workbook, `Reporte_carteraPasivos_${new Date().toISOString().slice(0, 10)}.xlsx`);
        }
        ,
        error: (err) => console.error('Error al exportar ahorros SBS', err)
      });
  }

  imprimirTabla(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.carteraPasivosService.getCarteraPasivosParaExportar(this.searchTerm, this.monedaSeleccionada, this.productoSeleccionado, this.periodoSeleccionado, this.condicionSeleccionado)
      .subscribe({
        next: (res) => {
          // Guardamos la página de 20 registros que el usuario estaba viendo actualmente
          const paginaOriginalRespaldada = [...this.carteraPasivos];

          // Mapeamos todos los registros recibidos (calculando los porcentajes)
          const todosLosRegistros = (res || []).map((item: any) => {
            return { ...item };
          });

          // 2. Reemplazamos temporalmente la lista en pantalla por el universo completo
          this.carteraPasivos = todosLosRegistros;
          this.loading = false;
          this.cdr.detectChanges();

          // 3. Esperamos un instante a que Angular dibuje todas las filas y abrimos la impresión
          setTimeout(() => {
            window.print();

            // 4. Al cerrar el cuadro de diálogo, restauramos la vista de 20 registros al instante
            this.carteraPasivos = paginaOriginalRespaldada;
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

