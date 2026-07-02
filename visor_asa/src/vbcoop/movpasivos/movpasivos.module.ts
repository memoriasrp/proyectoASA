import { Module } from '@nestjs/common';
import { MovpasivosService } from './movpasivos.service';
import { MovpasivosController } from './movpasivos.controller';
import { PrismaModule } from '../../prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [MovpasivosController],
  providers: [MovpasivosService],
})
export class MovpasivosModule { }
