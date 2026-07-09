import { Controller, Get, Query } from '@nestjs/common';
import { CarterapasivosService } from './carterapasivos.service';
import { GetCarterapasivosFilterDto } from './dto/get-carterapasivos-filter.dto';

@Controller('carterapasivos')
export class CarterapasivosController {
  constructor(private readonly carterapasivosService: CarterapasivosService) { }


  @Get('exportar')
  exportar(@Query() filters: GetCarterapasivosFilterDto) {
    return this.carterapasivosService.findParaExportar(filters);
  }

  @Get()
  findAll(@Query() filters: GetCarterapasivosFilterDto) {
    return this.carterapasivosService.findAll(filters);
  }

  @Get('periodos-disponibles')
  async getPeriodosDisponibles() {
    return this.carterapasivosService.obtenerPeriodos();
  }

}
