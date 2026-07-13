import { Controller, Get, Query } from '@nestjs/common';
import { CarteraprestamosService } from './carteraprestamos.service';
import { GetCarteraprestamosFilterDto } from './dto/get-carteraprestamos-filter.dto';


@Controller('carteraprestamos')
export class CarteraprestamosController {
  constructor(private readonly carteraprestamosService: CarteraprestamosService) { }

  @Get('exportar')
  exportar(@Query() filters: GetCarteraprestamosFilterDto) {
    return this.carteraprestamosService.findParaExportar(filters);
  }

  @Get()
  findAll(@Query() filters: GetCarteraprestamosFilterDto) {
    return this.carteraprestamosService.findAll(filters);
  }

  @Get('periodos-disponibles')
  async getPeriodosDisponibles() {
    return this.carteraprestamosService.obtenerPeriodos();
  }


}
