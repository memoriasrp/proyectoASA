import { Module } from '@nestjs/common';
import { PeriodoEstadoService } from './periodo-estado.service';
import { PeriodoEstadoController } from './periodo-estado.controller';

@Module({
  controllers: [PeriodoEstadoController],
  providers: [PeriodoEstadoService],
})
export class PeriodoEstadoModule {}
