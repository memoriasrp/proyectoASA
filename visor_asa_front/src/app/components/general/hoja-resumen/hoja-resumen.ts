import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeguimientoHistorialService } from '../../../services/vbcoop/seguimiento-historial-service';
import { HojaResumenService } from '../../../services/general/hoja-resumen-service';
import { CronogramaService } from '../../../services/vbcoop/cronograma-service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

export interface InteresAnoEditable {
  ano: number;
  dias: number;
  interes: number;
  mora: number;
}

@Component({
  selector: 'app-hoja-resumen',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './hoja-resumen.html',
  styleUrl: './hoja-resumen.css',
})

export class HojaResumen implements OnInit {

  idsocio: string = '';
  nombreSocio: string = '';
  historial: any[] = [];
  cargando: boolean = true;
  socioData: any;
  datosPersonales: any;
  datosAportes: any;
  datosAhorros: any;
  datosDpf: any;
  datosPrestamos: any;
  datosSeguimiento: any;
  deudasPorAno: InteresAnoEditable[] = [];
  totalInteresAnos: number = 0;
  totalMoraAnos: number = 0;
  edadSocio: number = 0;
  saldoCapitalMo: number = 0;
  totalGeneralAnos: number = 0;
  moneda: string = '';
  excluirCancelados = true;

  productosAgrupados: { tipo: string, lista: any[] }[] = [];

  // Variables para el modal de Cronograma
  mostrarModal = false;
  cargandoCronograma = false;
  cronogramaData: any = null;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private hojaResumenService: HojaResumenService,
    private cronogramaService: CronogramaService,
    private seguimientoHistorialService: SeguimientoHistorialService,
    private cdRef: ChangeDetectorRef,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.idsocio = this.route.snapshot.paramMap.get('idsocio') || '';
    this.nombreSocio = this.route.snapshot.queryParamMap.get('nombre') || '';
    if (this.idsocio) {

      this.cargarHojaResumen();
    } else {
      this.router.navigate(['/dashboard/socios']);
    }
  }
  recargarData(): void {
    if (this.excluirCancelados) {
      this.datosAportes = (this.socioData?.aportes || [])
        .filter((a: any) => a.condicion === 'VIGENTE');
      this.datosAhorros = (this.socioData?.ahorros || [])
        .filter((a: any) => a.condicion === 'VIGENTE');
      this.datosDpf = (this.socioData?.depositosPlazoFijo || [])
        .filter((a: any) => a.condicion === 'VIGENTE');
      this.datosPrestamos = (this.socioData?.prestamo || [])
        .filter((a: any) => a.condicion === 'VIGENTE');
    }
    else {
      this.datosAportes = (this.socioData?.aportes || []);
      this.datosAhorros = (this.socioData?.ahorros || []);
      this.datosDpf = (this.socioData?.depositosPlazoFijo || []);
      this.datosPrestamos = (this.socioData?.prestamo || []);

    }
    this.datosSeguimiento = (this.socioData?.historial || []);
  }
  cargarHojaResumen(): void {
    this.cargando = true;
    this.hojaResumenService.obtenerHistorialSocio(this.idsocio).subscribe({
      next: (data: any[]) => {
        this.socioData = data;
        this.datosPersonales = this.socioData.datosPersonales;
        this.recargarData();
        this.nombreSocio = [this.datosPersonales.nombres, this.datosPersonales.paterno, this.datosPersonales.materno].filter(Boolean).join(' ');
        this.calcularEdad(this.datosPersonales.fecnac);
        this.cargando = false;

        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar historial', err);
        this.cargando = false;
        this.cdRef.detectChanges();
      }
    });
  }
  cargarHistorialSeguimiento(): void {
    this.cargando = true;
    this.seguimientoHistorialService.obtenerHistorialSocio(this.idsocio).subscribe({
      next: (data: any[]) => {
        this.agruparPorProducto(data);
        this.cargando = false;

        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar historial', err);
        this.cargando = false;
        this.cdRef.detectChanges();
      }
    });
  }
  calcularEdad(fechaNacimiento: Date | string): void {
    const nac = new Date(fechaNacimiento);
    const hoy = new Date();

    let edad = hoy.getFullYear() - nac.getFullYear();
    const diferenciaMeses = hoy.getMonth() - nac.getMonth();

    // Si aún no ha llegado su mes de cumpleaños, o si es su mes pero no ha llegado el día:
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < nac.getDate())) {
      edad--;
    }

    this.edadSocio = edad;
  }
  agruparPorProducto(seguimientos: any[]): void {
    const mapa = new Map<string, any[]>();

    seguimientos.forEach(item => {
      const tipo = item.tipoproducto ? item.tipoproducto.trim().toUpperCase() : 'GENERAL';

      const itemNormalizado = {
        ...item,
        idsocio: item.idsocio?.trim(),
        usuario: item.Usuario ? item.Usuario : (item.usuario ? item.usuario : { nombre: 'Sistema' }),
        adjuntos: item.seguimiento_adjunto || []
      };

      if (!mapa.has(tipo)) {
        mapa.set(tipo, []);
      }
      mapa.get(tipo)?.push(itemNormalizado);
    });

    this.productosAgrupados = Array.from(mapa.entries()).map(([tipo, lista]) => ({
      tipo,
      lista
    }));
  }
  imprimirHoja() {
    const contenido = document.getElementById('area-impresion')?.innerHTML;
    const ventanaImpresion = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');

    if (ventanaImpresion) {
      ventanaImpresion.document.write(`
      <html>
        <head>
          <title>Hoja Resumen - ${this.idsocio}</title>
          <style>
            body { font-family: sans-serif; padding: 20px; color: #212529; }
            table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
            td, th { padding: 4px 8px; }
            .categoria-bloque { border: 1px solid #dee2e6; margin-bottom: 15px; border-radius: 6px; }
            .categoria-header { background: #f8f9fa; padding: 8px 12px; font-weight: bold; }
            .categoria-body { padding: 12px; }
            .gestion-card { border: 1px solid #e2e8f0; padding: 10px; margin-bottom: 10px; page-break-inside: avoid; }
            .no-print, button, input { display: none !important; }
            @page { size: A4 portrait; margin: 10mm; }
          </style>
        </head>
        <body>
          ${contenido}
        </body>
      </html>
    `);
      ventanaImpresion.document.close();
      ventanaImpresion.focus();
      setTimeout(() => {
        ventanaImpresion.print();
        ventanaImpresion.close();
      }, 250);
    }
  }
  verCronograma(idpagare: string, saldocapitalmo: number, moneda: string) {
    console.log('Ver cronograma para idpagare:', idpagare, 'Saldo Capital MO:', saldocapitalmo, 'Moneda:', moneda);
    this.mostrarModal = true;
    this.cargandoCronograma = true;
    this.cronogramaData = null;
    const fechaConsulta = '2026-06-06';
    this.saldoCapitalMo = saldocapitalmo;
    this.moneda = moneda;
    const params = new HttpParams().set('fecha', fechaConsulta);

    // // Llamada al endpoint de NestJS
    this.cronogramaService.obtenerCronograma(idpagare, fechaConsulta).subscribe({
      next: (data: any) => {
        this.cronogramaData = data;
        this.cargandoCronograma = false;
        this.cargarDeudasPorAno(data.deuda || []);


        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener el cronograma:', err);
        this.cargandoCronograma = false;
      }
    });
  }

  // Método para procesar el desglose que viene del backend o de la función de cálculo
  cargarDeudasPorAno(lista: InteresAnoEditable[]) {
    console.log(lista);
    this.deudasPorAno = lista;
    this.calcularTotalDeudas();
  }



  // Impresión exclusiva del Modal
  imprimirModal() {
    const modalElement = document.querySelector('.custom-modal-backdrop .modal-content');

    if (!modalElement) return;

    // 1. Clona el elemento HTML para no alterar el modal en pantalla
    const clonModal = modalElement.cloneNode(true) as HTMLElement;

    // 2. Lee los valores reales introducidos en los inputs originales y los asigna al clon
    const inputsOriginales = modalElement.querySelectorAll('input');
    const inputsClonados = clonModal.querySelectorAll('input');

    inputsOriginales.forEach((input, index) => {
      if (inputsClonados[index]) {
        inputsClonados[index].setAttribute('value', input.value);
      }
    });

    const contenidoModal = clonModal.innerHTML;
    const ventanaImpresion = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');

    if (ventanaImpresion) {
      ventanaImpresion.document.write(`
      <html>
        <head>
          <title>Liquidación de Deuda - ${this.idsocio}</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
          <style>
            body { font-family: sans-serif; padding: 15px; color: #212529; background: #fff !important; }
            
            .no-print, button, .btn-close { display: none !important; }
            .seccion-cronograma { display: none !important; }

            .modal-grid-container { display: block !important; width: 100% !important; }
            .modal-grid-col { width: 100% !important; flex: 0 0 100% !important; margin-bottom: 15px; }

            .table-responsive, .desglose-scroll-container, .modal-body { 
              max-height: none !important; 
              overflow: visible !important; 
              height: auto !important; 
            }

            table { width: 100% !important; font-size: 0.75rem !important; }
            td, th { padding: 4px 6px !important; }

            .mt-4 .modal-grid-container {
              display: flex !important;
              flex-direction: row !important;
              gap: 15px !important;
            }
            .mt-4 .modal-grid-col:first-child { flex: 0 0 58% !important; width: 58% !important; }
            .mt-4 .modal-grid-col:last-child { flex: 0 0 40% !important; width: 40% !important; }

            .desglose-fila-unica {
              display: flex !important;
              flex-direction: row !important;
              gap: 10px !important;
              padding: 4px 0;
            }
            .desglose-label { flex: 0 0 110px !important; font-weight: bold; }
            .desglose-input-group { flex: 1 1 50% !important; }
            
            /* Forzar visualización de los valores de los inputs impresos */
            .desglose-input-group input { 
              border: 1px solid #ced4da !important; 
              text-align: right !important; 
              font-weight: bold !important;
              width: 100% !important;
              background: #f8f9fa !important;
              padding: 2px 6px !important;
            }

            @page { size: A4 portrait; margin: 8mm; }
          </style>
        </head>
        <body>
          <div class="modal-content border-0">
            ${contenidoModal}
          </div>
        </body>
      </html>
    `);

      ventanaImpresion.document.close();
      ventanaImpresion.focus();

      setTimeout(() => {
        ventanaImpresion.print();
        ventanaImpresion.close();
      }, 500);
    }
  }


  calcularTotalDeudas() {
    // Forzar conversión a número usando Number() o el operador +
    this.totalInteresAnos = this.deudasPorAno.reduce(
      (acc, item) => acc + (Number(item.interes) || 0), 0
    );

    this.totalMoraAnos = this.deudasPorAno.reduce(
      (acc, item) => acc + (Number(item.mora) || 0), 0
    );

    // Convertir a número el saldo capital y calcular el Total General
    const capital = Number(this.saldoCapitalMo) || 0;
    this.totalGeneralAnos = capital + this.totalInteresAnos + this.totalMoraAnos;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.cronogramaData = null;
  }
}
