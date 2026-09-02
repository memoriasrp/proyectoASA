import { Module } from '@nestjs/common';
import { CronogramaService } from './cronograma.service';
import { CronogramaController } from './cronograma.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [CronogramaController],
  providers: [CronogramaService],
  imports: [PrismaModule],
})
export class CronogramaModule { }
