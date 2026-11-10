import {
  Controller, Get, Query, Post,
  Body, HttpStatus, UseGuards, HttpCode, Req,
  BadRequestException
} from '@nestjs/common';
import { CarterapasivosService } from './carterapasivos.service';
import { GetCarterapasivosFilterDto } from './dto/get-carterapasivos-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

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

  @Post('liquidar')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  async liquidarCuenta(@Body() payload: any, @Req() req: Request) {
    try {
      const usuario = req.user as any;
      const idUsuarioReal = usuario?.id || 1;
      const nombreUsuario = usuario.username || 'Usuario Desconocido'; // Asignar el nombre del usuario autenticado

      const resultado = await this.carterapasivosService.liquidarCuenta(
        payload.idsocio,
        payload.idcdp,
        payload.fecha,
        payload.tipoliquidacion,
        payload.detalle,
        payload.monto,
        payload.idnumope,
        idUsuarioReal, nombreUsuario
      );
      return {
        success: true,
        message: 'Liquidacion registrada exitosamente',
        data: resultado,
      };
    }
    catch (error: any) {
      if (error.code === '23505') {
        throw new BadRequestException('El número de operación o movimiento ya fue registrado previamente.');
      }

      throw new BadRequestException(error.message || 'Error al procesar el registro del movimiento.');

    }
  }
}
