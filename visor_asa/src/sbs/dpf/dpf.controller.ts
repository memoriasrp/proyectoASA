import { Controller, Get, Query } from '@nestjs/common';
import { DpfService } from './dpf.service';
import { GetDpfFilterDto } from './dto/get-dpfs-filter.dto';

@Controller('dpf')
export class DpfController {
  constructor(private readonly dpfService: DpfService) { }

  @Get('exportar')
  exportar(@Query() filters: GetDpfFilterDto) {
    return this.dpfService.findParaExportar(filters);
  }

  @Get()
  findAll(@Query() filters: GetDpfFilterDto) {
    return this.dpfService.findAll(filters);
  }
}
