import { Controller, Get, Query } from '@nestjs/common';
import { AhorrosService } from './ahorros.service';
import { GetAhorrosFilterDto } from './dto/get-creditos-filter.dto';

@Controller('ahorros')
export class AhorrosController {
  constructor(private readonly ahorrosService: AhorrosService) { }

  @Get('exportar')
  exportar(@Query() filters: GetAhorrosFilterDto) {
    return this.ahorrosService.findParaExportar(filters);
  }

  @Get()
  findAll(@Query() filters: GetAhorrosFilterDto) {
    return this.ahorrosService.findAll(filters);
  }
}
