import { Module } from '@nestjs/common';
import { MovactivosService } from './movactivos.service';
import { MovactivosController } from './movactivos.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [MovactivosController],
  providers: [MovactivosService],
  imports: [PrismaModule],
})
export class MovactivosModule { }
