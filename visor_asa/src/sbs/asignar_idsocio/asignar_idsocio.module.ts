import { Module } from '@nestjs/common';
import { AsignarIdsocioService } from './asignar_idsocio.service';
import { AsignarIdsocioController } from './asignar_idsocio.controller';
import { PrismaModule } from '../../prisma/prisma.module';


@Module({
  imports: [PrismaModule],
  controllers: [AsignarIdsocioController],
  providers: [AsignarIdsocioService],
})
export class AsignarIdsocioModule { }
