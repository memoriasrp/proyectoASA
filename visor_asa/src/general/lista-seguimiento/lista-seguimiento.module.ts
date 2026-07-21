import { Module } from '@nestjs/common';
import { ListaSeguimientoService } from './lista-seguimiento.service';
import { ListaSeguimientoController } from './lista-seguimiento.controller';

@Module({
  controllers: [ListaSeguimientoController],
  providers: [ListaSeguimientoService],
})
export class ListaSeguimientoModule {}
