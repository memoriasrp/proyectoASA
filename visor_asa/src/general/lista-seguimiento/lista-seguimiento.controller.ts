import { Controller, Get, Query } from '@nestjs/common';
import { ListaSeguimientoService } from './lista-seguimiento.service';
import { GetListaSeguimientoFilterDto } from './dto/get-listaseguimiento-filter.dto';

@Controller('lista-seguimiento')
export class ListaSeguimientoController {
  constructor(private readonly listaSeguimientoService: ListaSeguimientoService) { }

  @Get('exportar')
  exportar(@Query() filters: GetListaSeguimientoFilterDto) {
    return this.listaSeguimientoService.findParaExportar(filters);
  }

  @Get()
  findAll(@Query() filters: GetListaSeguimientoFilterDto) {
    return this.listaSeguimientoService.findAll(filters);
  }
}
