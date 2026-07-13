import { Controller, Get, Query } from '@nestjs/common';
import { ObservacionesPrestamoService } from './observaciones-prestamo.service';

import { GetObservacionesPrestamoFilterDto } from './dto/get-observacionesprestamo-filter.dto';

@Controller('observaciones-prestamo')
export class ObservacionesPrestamoController {
  constructor(private readonly observacionesPrestamoService: ObservacionesPrestamoService) { }

  @Get('exportar')
  exportar(@Query() filters: GetObservacionesPrestamoFilterDto) {
    return this.observacionesPrestamoService.findParaExportar(filters);
  }

  @Get()
  findAll(@Query() filters: GetObservacionesPrestamoFilterDto) {
    return this.observacionesPrestamoService.findAll(filters);
  }
}
