import { Module } from '@nestjs/common';
import { AportacionesService } from './aportaciones.service';
import { AportacionesController } from './aportaciones.controller';

@Module({
  controllers: [AportacionesController],
  providers: [AportacionesService],
})
export class AportacionesModule {}
