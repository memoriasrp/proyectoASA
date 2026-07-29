import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { Auth } from '../../../services/auth'; // <-- Ajusta la ruta correcta a tu AuthService

import { MovactivosService } from '../../../services/vbcoop/movactivos-service';
import { finalize } from 'rxjs/operators'; // <-- Importa finalize
@Component({
  selector: 'app-movactivos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movactivos.html',
  styleUrl: './movactivos.css',
})
export class Movactivos implements OnInit {
  movActivos: any[] = [];
  productos$!: Observable<string[]>;
  currentPage: number = 1;
  totalPages: number = 1;
  totalRecords: number = 0;

  // Filtros vinculados a los inputs del HTML
  searchTerm: string = '';
  monedaSeleccionada: string = '';
  productoSeleccionado: string = '';
  fechaDesde: string = '';
  fechaHasta: string = '';


  // Nueva variable de control para saber si ya buscaron al menos una vez
  busquedaRealizada: boolean = false;
  loading: boolean = false;
  admin: boolean = false;

  ////////////

  mostrarModal = false;
  pagareSeleccionado: any = null;
  detalle: string = '';
  cargando: boolean = false;

  cuotasPendientes: number[] = [];
  cuotaSeleccionada: number | null = null;
  capital: number | null = null;
  interes: number | null = null;
  mora: number | null = null;
  seguro: number | null = null;
  aporte: number | null = null;
  fecha: string = '';
  idnumope: string = '';

  constructor(
    private movactivosService: MovactivosService,
    private cdr: ChangeDetectorRef,
    public auth: Auth) { }

  ngOnInit(): void {
    this.productos$ = this.movactivosService.getProductosUnicos();
    this.esAdmin();
  }


  ejecutarBusqueda(): void {
    this.currentPage = 1; // Reseteamos a la primera página en cada nueva búsqueda
    this.busquedaRealizada = true;
    this.cargarTabla();
  }

  cargarTabla(): void {
    this.loading = true;
    this.cdr.detectChanges();
    // Convertimos las strings de fecha a objetos Date solo si tienen valor
    const desdeDate = this.fechaDesde ? new Date(this.fechaDesde) : undefined;
    const hastaDate = this.fechaHasta ? new Date(this.fechaHasta) : undefined;

    this.movactivosService.getMovactivosPaginados(
      this.currentPage,
      20,
      this.searchTerm,
      this.monedaSeleccionada,
      this.productoSeleccionado,
      desdeDate,
      hastaDate
    ).pipe(
      // finalize se ejecuta SIEMPRE (éxito, error o excepción en el mapeo)
      finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (res) => {
        this.movActivos = res.data || [];
        this.totalPages = res.meta?.totalPages || 1;
        this.totalRecords = res.meta?.total || 0;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al consultar movimientos activos:', err);
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
    this.fechaDesde = '';
    this.fechaHasta = '';
    this.movActivos = [];
    this.currentPage = 1;
    this.totalPages = 1;
    this.totalRecords = 0;
    this.busquedaRealizada = false; // Regresa al estado inicial informativo
    this.cdr.detectChanges();
  }

  // Función de Exportación a Excel nativa
  exportarAExcel(): void {
    const desdeDate = this.fechaDesde ? new Date(this.fechaDesde) : undefined;
    const hastaDate = this.fechaHasta ? new Date(this.fechaHasta) : undefined;

    this.movactivosService.getMovactivosParaExportar(this.searchTerm, this.monedaSeleccionada, this.productoSeleccionado, desdeDate, hastaDate)
      .subscribe({
        next: (res) => {
          if (!res || res.length === 0) return;
          if (this.movActivos.length === 0) {
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
          const datosExportar = res.map(item => ({
            'ID Socio': item.idsocio,
            'Socio': item.nombre,
            'Documento': item.numdoc,
            'Moneda': item.moneda === 'S' ? 'Soles' : 'Dólares',
            'Cuenta': item.idpagare,
            'Producto': item.descri,
            'Fecha': formatearFecha(item.fecha),
            'Operación': item.operacion,
            'Movimiento': item.car_abo === 'C' ? 'Cargo' : 'Abono',
            'Capital': item.car_abo === 'C' ? item.capital * (-1) : item.capital * (1),
            'Interes': item.interes * (1),
            'Mora': item.mora * (1),
            'Seguro': item.seguro * (1),
            'Aporte': item.aporte * (1),
            'Total': item.car_abo === 'C' ? item.total * (-1) : item.total * (1),
            'NumOperacion': item.idnumope,
            'Usuario': item.idusuario,
            'tasa': item.tasa,
            'Plazo': item.plazo,
            'F. Desembolso': formatearFecha(item.fechades)
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
          XLSX.writeFile(workbook, `Reporte_MovPrestamos_${new Date().toISOString().slice(0, 10)}.xlsx`);
        },
        error: (err) => console.error('Error al exportar ahorros SBS', err)
      });
  }

  imprimirTabla(): void {
    this.loading = true;
    this.cdr.detectChanges();
    const desdeDate = this.fechaDesde ? new Date(this.fechaDesde) : undefined;
    const hastaDate = this.fechaHasta ? new Date(this.fechaHasta) : undefined;
    // 1. Pedimos al API TODOS los registros acumulados en una sola página
    this.movactivosService.getMovactivosParaExportar(this.searchTerm, this.monedaSeleccionada, this.productoSeleccionado, desdeDate, hastaDate)
      .subscribe({
        next: (res) => {
          // Guardamos la página de 20 registros que el usuario estaba viendo actualmente
          const paginaOriginalRespaldada = [...this.movActivos];

          // Mapeamos todos los registros recibidos (calculando los porcentajes)
          const todosLosRegistros = (res || []).map((item: any) => {
            return { ...item };
          });

          // 2. Reemplazamos temporalmente la lista en pantalla por el universo completo
          this.movActivos = todosLosRegistros;
          this.loading = false;
          this.cdr.detectChanges();

          // 3. Esperamos un instante a que Angular dibuje todas las filas y abrimos la impresión
          setTimeout(() => {
            window.print();

            // 4. Al cerrar el cuadro de diálogo, restauramos la vista de 20 registros al instante
            this.movActivos = paginaOriginalRespaldada;
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
  // En tu .ts
  esAdmin(): void {
    // Ajusta según cómo almacenes el rol/tipo de usuario en tu AuthService o localStorage
    const usuario = this.auth.getUsuarioActual();

    this.admin = usuario?.tipoUsuario.id === 1; // o la condición que defina al admin
  }
  editarRegistro(registro: any): void {
    // 1. Doble verificación de seguridad en la vista
    if (!this.esAdmin) {
      alert('No tienes permisos para modificar registros.');
      return;
    }
    this.pagareSeleccionado = registro;
    this.pagareSeleccionado.fecha = this.pagareSeleccionado.fecha.toString().substring(0, 10);
    this.mostrarModal = true;
    this.cdr.detectChanges();
    // 2. Cambiamos el estado del componente a modo edición
    //this.esModoEdicion = true;
    //this.idRegistroSeleccionado = registro.id; // Guarda la llave primaria del movimiento

    // 3. Poblamos el formulario o variables vinculadas con los datos del registro a editar
    // Si usas Reactive Forms (FormGroup):
    /*
    this.miFormulario.patchValue({
      socio: registro.socio,
      monto: registro.monto,
      fecha: registro.fecha ? registro.fecha.substring(0, 10) : '', // Formato YYYY-MM-DD para <input type="date">
      // ...demás campos del DTO
    });
    */

    // 4. Abrir el modal de edición (si manejas Bootstrap o similar mediante variable o ID)
    // $('#modalMovimiento').modal('show'); // Ejemplo con Bootstrap/jQuery o variable de bandera local
  }
  get totalPagar(): number {
    const c = Number(this.pagareSeleccionado.capital) || 0;
    const i = Number(this.pagareSeleccionado.interes) || 0;
    const m = Number(this.pagareSeleccionado.mora) || 0;
    const s = Number(this.pagareSeleccionado.seguro) || 0;
    const a = Number(this.pagareSeleccionado.aporte) || 0;

    return c + i + m + s + a;
  }

  validarDecimal(campo: 'capital' | 'interes' | 'mora' | 'seguro' | 'aporte'): void {
    // Verificamos que el objeto pagareSeleccionado exista
    if (!this.pagareSeleccionado) return;

    const valorActual = this.pagareSeleccionado[campo];

    if (valorActual !== null && valorActual !== undefined && valorActual !== '') {
      // 1. Convertimos a número y redondeamos a 2 decimales
      let valorNumerico = parseFloat(Number(valorActual).toFixed(2));

      // Si el valor no es un número válido (NaN), lo forzamos a 0
      if (isNaN(valorNumerico)) {
        valorNumerico = 0;
      }

      // 2. Validación específica para el capital contra el saldo capital de la deuda
      if (campo === 'capital' && valorNumerico > this.pagareSeleccionado.saldocapitalmo) {
        alert("EL MONTO A PAGAR DEL CAPITAL NO PUEDE SER MAYOR AL SALDO CAPITAL");
        valorNumerico = parseFloat(Number(this.pagareSeleccionado.saldocapitalmo).toFixed(2));
      }

      // 3. Asignamos el valor corregido al objeto
      this.pagareSeleccionado[campo] = valorNumerico;
    }
  }
  cerrarModal() {
    this.mostrarModal = false;
    this.pagareSeleccionado = null;
    this.cdr.detectChanges();
    this.ejecutarBusqueda();
  }
  guardarMovimiento() {
    const payload = {
      ...this.pagareSeleccionado,
      capital: Number(this.pagareSeleccionado.capital),
      interes: Number(this.pagareSeleccionado.interes),
      mora: Number(this.pagareSeleccionado.mora),
      seguro: Number(this.pagareSeleccionado.seguro),
      aporte: Number(this.pagareSeleccionado.aporte),
      total: Number(this.pagareSeleccionado.capital) + Number(this.pagareSeleccionado.interes)
        + Number(this.pagareSeleccionado.mora) + Number(this.pagareSeleccionado.seguro) + Number(this.pagareSeleccionado.aporte),
      nrocuota: Number(this.pagareSeleccionado.nrocuota),
      tasa: Number(this.pagareSeleccionado.tasa),
      tasa2: Number(this.pagareSeleccionado.tasa2),
      sexo: Number(this.pagareSeleccionado.sexo),
      importe: Number(this.pagareSeleccionado.importe),
      castigo: Number(this.pagareSeleccionado.castigo),
      // Convertir resto de campos numéricos lanzados en la validación...
    };
    this.movactivosService.updateMovimiento(this.pagareSeleccionado.idnumope, payload).subscribe({
      next: () => {
        this.cerrarModal();
        this.ejecutarBusqueda();
      },
      error: (err) => console.error('Error al actualizar el movimiento:', err)
    });
  }
}
