import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { CronogramaService } from './cronograma.service';

@Controller('cronograma')
export class CronogramaController {
  constructor(private readonly cronogramaService: CronogramaService) { }
  @Get(':idpagare/cronograma')
  async getCronograma(
    @Param('idpagare') idpagare: string,
    @Query('fecha') fecha?: string,
  ) {
    try {
      return await this.cronogramaService.generarCronograma(idpagare, fecha);
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
