import { Controller, Get, Query } from '@nestjs/common';
import { MovpasivosService } from './movpasivos.service';
import { GetMovpasivosFilterDto } from './dto/get-movpasivos-filter.dto';

@Controller('movpasivos')
export class MovpasivosController {
  constructor(private readonly movpasivosService: MovpasivosService) { }
  @Get('exportar')
  exportar(@Query() filters: GetMovpasivosFilterDto) {
    return this.movpasivosService.findParaExportar(filters);
  }

  @Get()
  findAll(@Query() filters: GetMovpasivosFilterDto) {
    return this.movpasivosService.findAll(filters);
  }

}
