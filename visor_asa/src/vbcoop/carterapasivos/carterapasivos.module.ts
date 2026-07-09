import { Module } from '@nestjs/common';
import { CarterapasivosService } from './carterapasivos.service';
import { CarterapasivosController } from './carterapasivos.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [CarterapasivosController],
  providers: [CarterapasivosService],
  imports: [PrismaModule],
})
export class CarterapasivosModule { }
