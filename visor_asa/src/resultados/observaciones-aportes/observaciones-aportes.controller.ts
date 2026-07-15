import { Controller, Get, Query } from '@nestjs/common';
import { ObservacionesAportesService } from './observaciones-aportes.service';
import { GetObservacionesAportesFilterDto } from './dto/get-observacionesaportes-filter.dto';


@Controller('observaciones-aportes')
export class ObservacionesAportesController {
  constructor(private readonly observacionesAportesService: ObservacionesAportesService) { }
  @Get('exportar')
  exportar(@Query() filters: GetObservacionesAportesFilterDto) {
    return this.observacionesAportesService.findParaExportar(filters);
  }

  @Get()
  findAll(@Query() filters: GetObservacionesAportesFilterDto) {
    return this.observacionesAportesService.findAll(filters);
  }
}

