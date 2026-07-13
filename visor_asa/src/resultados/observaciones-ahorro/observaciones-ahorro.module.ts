import { Module } from '@nestjs/common';
import { ObservacionesAhorroService } from './observaciones-ahorro.service';
import { ObservacionesAhorroController } from './observaciones-ahorro.controller';

@Module({
  controllers: [ObservacionesAhorroController],
  providers: [ObservacionesAhorroService],
})
export class ObservacionesAhorroModule {}
