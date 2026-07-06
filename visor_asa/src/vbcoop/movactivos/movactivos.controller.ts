import { Controller, Get, Query } from '@nestjs/common';
import { MovactivosService } from './movactivos.service';
import { GetMovactivosFilterDto } from './dto/get-movactivos-filter.dto';

@Controller('movactivos')
export class MovactivosController {
  constructor(private readonly movactivosService: MovactivosService) { }

  @Get('exportar')
  exportar(@Query() filters: GetMovactivosFilterDto) {
    return this.movactivosService.findParaExportar(filters);
  }

  @Get()
  findAll(@Query() filters: GetMovactivosFilterDto) {
    return this.movactivosService.findAll(filters);
  }

  @Get('productos-unicos')
  async getProductosUnicos() {
    return this.movactivosService.findDistinctProductos();
  }
}
