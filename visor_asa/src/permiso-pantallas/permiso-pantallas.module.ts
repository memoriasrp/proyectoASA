import { Module } from '@nestjs/common';
import { PermisoPantallasService } from './permiso-pantallas.service';
import { PermisoPantallasController } from './permiso-pantallas.controller';

@Module({
  controllers: [PermisoPantallasController],
  providers: [PermisoPantallasService],
})
export class PermisoPantallasModule {}
