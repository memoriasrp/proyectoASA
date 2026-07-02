import { Controller, Get, Query } from '@nestjs/common';
import { PeriodosService } from './periodos.service';
import { GetPeriodosFilterDto } from './dto/get-periodos-filter.dto';

@Controller('periodos')
export class PeriodosController {
  constructor(private readonly periodosService: PeriodosService) { }
  @Get()
  async findAll(@Query() filters: GetPeriodosFilterDto) {
    return this.periodosService.findAll(filters);
  }
}
