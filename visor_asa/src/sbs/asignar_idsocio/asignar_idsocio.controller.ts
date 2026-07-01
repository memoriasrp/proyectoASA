import { Controller, Get, Post, Param } from '@nestjs/common';
import { AsignarIdsocioService } from './asignar_idsocio.service';

@Controller('sbs/asignar-idsocio')
export class AsignarIdsocioController {
  constructor(private readonly asignarIdsocioService: AsignarIdsocioService) { }
  @Get('resumen')
  getResumen() {
    return this.asignarIdsocioService.getResumenNulos();
  }
  @Post('conciliar/:modulo')
  conciliarModulo(@Param('modulo') modulo: string) {
    return this.asignarIdsocioService.procesarConciliacion(modulo);
  }
  @Get('detalle/:modulo')
  getDetalleNulos(@Param('modulo') modulo: string) {
    return this.asignarIdsocioService.obtenerDetalleNulos(modulo);
  }
}
