import { Controller, Get, Param, Query, NotFoundException, UseGuards } from '@nestjs/common';
import { CronogramaService } from './cronograma.service';
import { AuthGuard } from '@nestjs/passport';
import { GetPeriodo, GetTipoCambio } from '../../auth/get-periodo.decorator';


@Controller('cronograma')
@UseGuards(AuthGuard('jwt'))
export class CronogramaController {
  constructor(private readonly cronogramaService: CronogramaService) { }
  @Get(':idpagare/cronograma')
  async getCronograma(
    @Param('idpagare') idpagare: string,
    @Query('fecha') fecha?: string,
    @GetPeriodo() periodo?: string,
    @GetTipoCambio() tc?: number
  ) {
    try {
      console.log(`Generando cronograma para idpagare: ${idpagare}, fecha: ${fecha}, periodo: ${periodo}, tipo de cambio: ${tc}`);
      return await this.cronogramaService.generarCronograma(idpagare, fecha, periodo, tc);
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Error) {
        throw new Error(`Error al generar el cronograma: ${error.message}`);
      }
      throw new Error('Error al generar el cronograma');
    }
  }


}
