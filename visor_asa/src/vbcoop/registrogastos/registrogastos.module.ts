import { Module } from '@nestjs/common';
import { RegistrogastosService } from './registrogastos.service';
import { RegistrogastosController } from './registrogastos.controller';
import { PrismaModule } from '../../prisma/prisma.module';


@Module({
  controllers: [RegistrogastosController],
  providers: [RegistrogastosService],
  imports: [PrismaModule],
})
export class RegistrogastosModule { }
