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
  fechaCalculo: string = new Date().toISOString().substring(0, 10);
  pagareActual: string = '';

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
        .filter((a: any) => a.saldocapitalmo === 'VIGENTE');
      this.datosAhorros = (this.socioData?.ahorros || [])
        .filter((a: any) => a.condicion === 'VIGENTE');
      this.datosDpf = (this.socioData?.depositosPlazoFijo || [])
        .filter((a: any) => a.condicion === 'VIGENTE');
      this.datosPrestamos = (this.socioData?.prestamo || [])
        .filter((a: any) => a.saldocapitalmo > 0);
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

  onFechaCalculoChange() {
    if (this.pagareActual) {
      this.cargandoCronograma = true;
      this.verCronograma(this.pagareActual, this.saldoCapitalMo, this.moneda);
    }
  }

  verCronograma(idpagare: string, saldocapitalmo: number, moneda: string) {
    this.pagareActual = idpagare; // Guardar el pagare actual para futuras referencias
    this.mostrarModal = true;
    this.cargandoCronograma = true;
    this.cronogramaData = null;
    const fechaConsulta = this.fechaCalculo;
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
    this.deudasPorAno = lista;
    this.calcularTotalDeudas();
  }

  private formatearFecha(fecha: string): string {
    if (!fecha) return '-';
    const d = new Date(fecha);
    return isNaN(d.getTime()) ? fecha : d.toLocaleDateString('es-PE', { timeZone: 'UTC' });
  }

  private formatearNumero(valor: any): string {
    const num = Number(valor);
    return isNaN(num) ? '0.00' : num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // Impresión exclusiva del Modal
  imprimirModal(): void {
    if (!this.cronogramaData) return;

    const ventimp = window.open('', '_blank', 'width=900,height=700');
    if (!ventimp) {
      alert('Por favor habilite las ventanas emergentes para imprimir.');
      return;
    }

    // 1. Filas del Historial de Pagos
    const filasHistorial = (this.cronogramaData.movimientos || []).map((cuota: any) => `
    <tr>
      <td style="padding: 3px; text-align: center; font-weight: bold;">${cuota.nrocuota || ''}</td>
      <td style="padding: 3px; text-align: center;">${this.formatearFecha(cuota.fecha)}</td>
      <td style="padding: 3px; text-align: right;">${this.formatearNumero(cuota.capital)}</td>
      <td style="padding: 3px; text-align: right;">${this.formatearNumero(cuota.interes)}</td>
      <td style="padding: 3px; text-align: right;">${this.formatearNumero(cuota.mora)}</td>
      <td style="padding: 3px; text-align: right;">${this.formatearNumero(cuota.seguro)}</td>
      <td style="padding: 3px; text-align: right;">${this.formatearNumero(cuota.aporte)}</td>
      <td style="padding: 3px; text-align: right; font-weight: bold;">${this.formatearNumero(cuota.total)}</td>
      <td style="padding: 3px; text-align: right;">${this.formatearNumero(cuota.saldo)}</td>
    </tr>
  `).join('');

    // 2. Filas del Desglose por Año (Asegurando lectura de campos)
    const filasDesglose = (this.deudasPorAno || []).map((item: any) => {
      const valInteres = item.interes !== undefined && item.interes !== null ? item.interes : item.intCompensatorio;
      const valMora = item.mora !== undefined && item.mora !== null ? item.mora : item.intMoratorio;

      return `
      <tr>
        <td style="padding: 4px; font-weight: bold; text-align: left;">${item.ano} (${item.dias} d)</td>
        <td style="padding: 4px; text-align: right; font-weight: bold;">${this.formatearNumero(valInteres)}</td>
        <td style="padding: 4px; text-align: right; font-weight: bold;">${this.formatearNumero(valMora)}</td>
      </tr>
    `;
    }).join('');

    const simboloMoneda = (this.moneda === '1' || this.moneda === 'S') ? 'S/.' : '$';

    // 3. Documento HTML estático
    ventimp.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Liquidación de Deuda - ${this.cronogramaData.cabecera?.idpagare || ''}</title>
        <style>
          @page { size: A4 portrait; margin: 8mm; }
          body { font-family: Arial, sans-serif; font-size: 10px; color: #000; margin: 0; padding: 0; }
          
          /* Encabezado */
          .titulo-principal { font-size: 0.95rem; font-weight: bold; margin-bottom: 2px; text-align: center; }
          .cabecera-info { font-size: 0.80rem; margin-bottom: 8px; border-bottom: 1px solid #ccc; padding-bottom: 4px; line-height: 1.3; }
          
          /* Cajas y Tablas */
          .card-box { border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px; margin-bottom: 8px; }
          .subtitulo { font-weight: bold; font-size: 0.80rem; margin-bottom: 4px; border-bottom: 1px solid #000; padding-bottom: 2px; }
          
          table { width: 100%; border-collapse: collapse; font-size: 0.72rem; }
          th, td { border: 1px solid #cbd5e1; padding: 3px; }
          th { background-color: #f1f5f9; text-align: center; font-weight: bold; }
          
          /* Layout Desglose + Totales */
          .grid-container { display: flex; gap: 12px; align-items: flex-start; margin-top: 6px; }
          .col-izq { width: 58%; }
          .col-der { width: 40%; }
          
          /* Tarjeta de Saldos homogênea */
          .tarjeta-totales { border: 1px solid #000; padding: 6px; border-radius: 4px; }
          .fila-total { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px; font-size: 0.78rem; font-weight: bold; }
          .total-general { border-top: 1px solid #000; padding-top: 3px; margin-top: 3px; font-size: 0.82rem; }
        </style>
      </head>
      <body>

        <!-- ENCABEZADO RECOR TADO -->
        <div class="titulo-principal">
          📋 PAGARE ${this.cronogramaData.cabecera?.idpagare || ''} - ${this.cronogramaData.cabecera?.descripcionProducto || ''}
        </div>
        <div class="cabecera-info">
          <strong>COD.SOCIO:</strong> ${this.cronogramaData.cabecera?.idsocio || ''} &bull; 
          <strong>${this.cronogramaData.cabecera?.nombre || ''}</strong> (${this.cronogramaData.cabecera?.ndocumento || ''}) &bull;
          <strong>Estado:</strong> ${this.cronogramaData.cabecera?.estado || '-'}<br>
          <strong>TEA:</strong> ${this.cronogramaData.cabecera?.tea || '0'}% &bull; 
          <strong>TEM:</strong> ${this.cronogramaData.cabecera?.tem || '0'}% &bull; 
          <strong>Monto:</strong> ${this.cronogramaData.cabecera?.moneda || ''} ${this.formatearNumero(this.cronogramaData.cabecera?.importe)} &bull; 
          <strong>Saldo:</strong> ${this.cronogramaData.cabecera?.moneda || ''} ${this.formatearNumero(this.cronogramaData.cabecera?.saldo)} &bull; 
          <strong>F.Desembolso:</strong> ${this.formatearFecha(this.cronogramaData.cabecera?.fechaDes)} &bull; 
          <strong>T.Moratoria:</strong> ${this.cronogramaData.cabecera?.tmor || '0'}%
        </div>

        <!-- SOLO HISTORIAL DE PAGOS (SIN CRONOGRAMA) -->
        <div class="card-box">
          <div class="subtitulo">HISTORIAL DE PAGOS</div>
          <table>
            <thead>
              <tr>
                <th>N°</th>
                <th>Fecha</th>
                <th>Capital</th>
                <th>Interés</th>
                <th>Mora</th>
                <th>Seguro</th>
                <th>Aporte</th>
                <th>Total</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              ${filasHistorial}
            </tbody>
          </table>
        </div>

        <!-- DESGLOSE Y TOTALES LADO A LADO -->
        <div class="subtitulo">DESGLOSE DE INTERESES Y MORA POR AÑO</div>
        <div class="grid-container">
          
          <!-- COLUMNA DESGLOSE ANUAL -->
          <div class="col-izq">
            <table>
              <thead>
                <tr>
                  <th style="text-align: left;">Año / Días</th>
                  <th style="text-align: right;">Int. Compensatorio</th>
                  <th style="text-align: right;">Int. Moratorio</th>
                </tr>
              </thead>
              <tbody>
                ${filasDesglose}
                <tr style="border-top: 2px solid #000; font-weight: bold;">
                  <td style="padding: 4px; text-align: left;">TOTAL:</td>
                  <td style="padding: 4px; text-align: right;">${simboloMoneda} ${this.formatearNumero(this.totalInteresAnos)}</td>
                  <td style="padding: 4px; text-align: right;">${simboloMoneda} ${this.formatearNumero(this.totalMoraAnos)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- COLUMNA TARJETA DE SALDOS -->
          <div class="col-der">
            <div class="tarjeta-totales">
              <div class="subtitulo" style="border-bottom: 1px solid #ccc;">📊 SALDO DEUDOR AL ${this.formatearFecha(this.fechaCalculo)}</div>
              
              <div class="fila-total">
                <span>SLD. CAPITAL:</span>
                <span>${simboloMoneda} ${this.formatearNumero(this.saldoCapitalMo)}</span>
              </div>
              <div class="fila-total">
                <span>T. Int. Compensatorio:</span>
                <span>${simboloMoneda} ${this.formatearNumero(this.totalInteresAnos)}</span>
              </div>
              <div class="fila-total">
                <span>T. Int. Moratorio:</span>
                <span>${simboloMoneda} ${this.formatearNumero(this.totalMoraAnos)}</span>
              </div>
              <div class="fila-total total-general">
                <span>TOT. GENERAL:</span>
                <span>${simboloMoneda} ${this.formatearNumero(this.totalGeneralAnos)}</span>
              </div>
            </div>
          </div>

        </div>

      </body>
    </html>
  `);

    ventimp.document.close();
    ventimp.focus();

    setTimeout(() => {
      ventimp.print();
      ventimp.close();
    }, 300);
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
