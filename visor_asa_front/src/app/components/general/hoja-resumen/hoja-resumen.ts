import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeguimientoHistorialService } from '../../../services/vbcoop/seguimiento-historial-service';
import { HojaResumenService } from '../../../services/general/hoja-resumen-service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { environment } from '../../../../environments/environment';
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


  edadSocio: number = 0;

  excluirCancelados = true;

  productosAgrupados: { tipo: string, lista: any[] }[] = [];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private hojaResumenService: HojaResumenService,
    private seguimientoHistorialService: SeguimientoHistorialService,
    private cdRef: ChangeDetectorRef
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
}
