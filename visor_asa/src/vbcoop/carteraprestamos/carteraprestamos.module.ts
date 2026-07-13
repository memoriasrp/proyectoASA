import { Module } from '@nestjs/common';
import { CarteraprestamosService } from './carteraprestamos.service';
import { CarteraprestamosController } from './carteraprestamos.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [CarteraprestamosController],
  providers: [CarteraprestamosService],
  imports: [PrismaModule],
})
export class CarteraprestamosModule { }
