import { Controller, Get, Query } from '@nestjs/common';
import { AportacionesService } from './aportaciones.service';
import { GetAportacionesFilterDto } from './dto/get-aportaciones-filter.dto';

@Controller('aportaciones')
export class AportacionesController {
  constructor(private readonly aportacionesService: AportacionesService) { }
  @Get('exportar')
  exportar(@Query() filters: GetAportacionesFilterDto) {
    return this.aportacionesService.findParaExportar(filters);
  }

  @Get()
  findAll(@Query() filters: GetAportacionesFilterDto) {
    return this.aportacionesService.findAll(filters);
  }
}
