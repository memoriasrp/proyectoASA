import { Module } from '@nestjs/common';
import { CarteradpfService } from './carteradpf.service';
import { CarteradpfController } from './carteradpf.controller';

@Module({
  controllers: [CarteradpfController],
  providers: [CarteradpfService],
})
export class CarteradpfModule {}
