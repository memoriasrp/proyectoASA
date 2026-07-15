import { Module } from '@nestjs/common';
import { ObservacionesAportesService } from './observaciones-aportes.service';
import { ObservacionesAportesController } from './observaciones-aportes.controller';

@Module({
  controllers: [ObservacionesAportesController],
  providers: [ObservacionesAportesService],
})
export class ObservacionesAportesModule {}
