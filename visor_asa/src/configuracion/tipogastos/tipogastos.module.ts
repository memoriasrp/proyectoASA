import { Module } from '@nestjs/common';
import { TipogastosService } from './tipogastos.service';
import { TipogastosController } from './tipogastos.controller';

@Module({
  controllers: [TipogastosController],
  providers: [TipogastosService],
})
export class TipogastosModule {}
