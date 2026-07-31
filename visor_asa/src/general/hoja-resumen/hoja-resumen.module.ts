import { Module } from '@nestjs/common';
import { HojaResumenService } from './hoja-resumen.service';
import { HojaResumenController } from './hoja-resumen.controller';

@Module({
  controllers: [HojaResumenController],
  providers: [HojaResumenService],
})
export class HojaResumenModule {}
