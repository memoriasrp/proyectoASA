import { Module } from '@nestjs/common';
import { SeguimientoController } from './seguimiento.controller';
import { SeguimientoService } from './seguimiento.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../../auth/auth.module';
@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [SeguimientoController],
  providers: [SeguimientoService]
})
export class SeguimientoModule { }
