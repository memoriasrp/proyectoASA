import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeguimientoHistorialService } from '../../../services/vbcoop/seguimiento-historial-service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-seguimiento-historial',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './seguimiento-historial.html',
  styleUrl: './seguimiento-historial.css',
})
export class SeguimientoHistorial implements OnInit {
  idsocio: string = '';
  nombreSocio: string = '';
  historial: any[] = [];
  cargando: boolean = true;

  productosAgrupados: { tipo: string, lista: any[] }[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private seguimientoHistorialService: SeguimientoHistorialService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.idsocio = this.route.snapshot.paramMap.get('idsocio') || '';
    this.nombreSocio = this.route.snapshot.queryParamMap.get('nombre') || '';
    if (this.idsocio) {
      this.cargarHistorial();
    } else {
      this.router.navigate(['/dashboard/socios']);
    }
  }

  cargarHistorial(): void {
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

  verAdjunto(adj: any): void {
    if (!adj || !adj.id) {
      alert('El archivo no cuenta con un identificador válido.');
      return;
    }

    const url = `${environment.apiUrl}/seguimiento/adjunto/${adj.id}`;

    // Abrimos el archivo en una pestaña nueva del navegador
    window.open(url, '_blank');
  }
}
