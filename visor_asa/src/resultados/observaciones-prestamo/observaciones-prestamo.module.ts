import { Module } from '@nestjs/common';
import { ObservacionesPrestamoService } from './observaciones-prestamo.service';
import { ObservacionesPrestamoController } from './observaciones-prestamo.controller';

@Module({
  controllers: [ObservacionesPrestamoController],
  providers: [ObservacionesPrestamoService],
})
export class ObservacionesPrestamoModule {}
