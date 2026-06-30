import { Module } from '@nestjs/common';
import { DpfService } from './dpf.service';
import { DpfController } from './dpf.controller';

@Module({
  controllers: [DpfController],
  providers: [DpfService],
})
export class DpfModule {}
