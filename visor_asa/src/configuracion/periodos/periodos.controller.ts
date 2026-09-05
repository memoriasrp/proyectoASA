import { Controller, Get, Query, Post, Body, Put, Param, Delete, Patch } from '@nestjs/common';
import { PeriodosService } from './periodos.service';
import { GetPeriodosFilterDto } from './dto/get-periodos-filter.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
@Controller('periodos')
export class PeriodosController {
  constructor(private readonly periodosService: PeriodosService) { }

  @Post()
  async create(@Body() createPeriodoDto: UpdatePeriodoDto) {
    return this.periodosService.create(createPeriodoDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePeriodoDto: UpdatePeriodoDto) {
    return this.periodosService.update(id, updatePeriodoDto);
  }
  @Patch(':id/activar')
  async activate(@Param('id') id: string) {

    return this.periodosService.activate(id);
  }
  @Patch(':id/recalcular')
  async recalculate(@Param('id') id: string) {
    console.log(`Recalculando periodo: ${id}`);
    return this.periodosService.recalculate(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.periodosService.remove(id);
  }

  @Get()
  async findAll(@Query() filters: GetPeriodosFilterDto) {
    return this.periodosService.findAll(filters);
  }
}
