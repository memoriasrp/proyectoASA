import { Controller, Get, Query } from '@nestjs/common';
import { ObservacionesAhorroService } from './observaciones-ahorro.service';

import { GetObservacionesAhorroFilterDto } from './dto/get-observacionesahorro-filter.dto';

@Controller('observaciones-ahorro')
export class ObservacionesAhorroController {
  constructor(private readonly observacionesAhorroService: ObservacionesAhorroService) { }

  @Get('exportar')
  exportar(@Query() filters: GetObservacionesAhorroFilterDto) {
    return this.observacionesAhorroService.findParaExportar(filters);
  }

  @Get()
  findAll(@Query() filters: GetObservacionesAhorroFilterDto) {
    return this.observacionesAhorroService.findAll(filters);
  }
}
