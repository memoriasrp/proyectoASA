import { Controller, Get, Query, Post, Put, Body, HttpStatus, HttpCode, BadRequestException, Param } from '@nestjs/common';
import { MovactivosService } from './movactivos.service';
import { GetMovactivosFilterDto } from './dto/get-movactivos-filter.dto';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoActivoDto } from './dto/update-movactivos.dto';
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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async registrarMovimiento(@Body() createMovimientoDto: CreateMovimientoDto) {
    try {
      const resultado = await this.movactivosService.registrar(createMovimientoDto);

      return {
        success: true,
        message: 'Abono/Movimiento registrado exitosamente',
        data: resultado,
      };
    } catch (error: any) {
      // Manejo de error si la clave primaria compuesta (idnumope, fecha, idpagare, nrocuota, car_abo) se duplica
      if (error.code === '23505') {
        throw new BadRequestException('El número de operación o movimiento ya fue registrado previamente.');
      }

      throw new BadRequestException(error.message || 'Error al procesar el registro del movimiento.');
    }
  }


  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMovimientoActivoDto: UpdateMovimientoActivoDto) {
    return this.movactivosService.update(id, updateMovimientoActivoDto);
  }
}
