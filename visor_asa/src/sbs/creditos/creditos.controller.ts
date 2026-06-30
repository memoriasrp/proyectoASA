import { Controller, Get, Query } from '@nestjs/common';
import { CreditosService } from './creditos.service';
import { GetCreditosFilterDto } from './dto/get-creditos-filter.dto';

@Controller('creditos')
export class CreditosController {
  constructor(private readonly creditosService: CreditosService) { }

  @Get('exportar')
  exportar(@Query() filters: GetCreditosFilterDto) {
    return this.creditosService.findParaExportar(filters);
  }

  @Get()
  findAll(@Query() filters: GetCreditosFilterDto) {
    return this.creditosService.findAll(filters);
  }
}
