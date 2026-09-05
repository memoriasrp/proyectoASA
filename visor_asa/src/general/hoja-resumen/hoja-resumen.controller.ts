import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { HojaResumenService } from './hoja-resumen.service';


@Controller('hoja-resumen')
export class HojaResumenController {
  constructor(private readonly hojaResumenService: HojaResumenService) { }
  @Get('socio/:idsocio')
  async getHojaResumen(@Param('idsocio') idsocio: string) {
    return await this.hojaResumenService.obtenerHojaResumen(idsocio);
  }
}
