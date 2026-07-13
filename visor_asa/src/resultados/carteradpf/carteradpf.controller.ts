import { Controller, Get, Query } from '@nestjs/common';
import { CarteradpfService } from './carteradpf.service';
import { GetCarteradpfFilterDto } from './dto/get-carteradpf-filter.dto';

@Controller('carteradpf')
export class CarteradpfController {
  constructor(private readonly carteradpfService: CarteradpfService) { }
  @Get('exportar')
  exportar() {
    return this.carteradpfService.findParaExportar();
  }

  @Get()
  findAll(@Query() filters: GetCarteradpfFilterDto) {
    return this.carteradpfService.findAll(filters);
  }
}
