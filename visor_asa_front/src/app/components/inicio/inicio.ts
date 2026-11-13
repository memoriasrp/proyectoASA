import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DashboardService, DashboardResumen } from '../../services/dashboard-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit {
  resumenData: DashboardResumen | null = null;
  cargando: boolean = true;
  constructor(private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarResumen();
  }

  cargarResumen(): void {
    this.cargando = true;
    this.dashboardService.obtenerResumen().subscribe({
      next: (data) => {
        this.resumenData = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al obtener el resumen del dashboard:', error);
        this.cargando = false;
      }
    });
  }
}
