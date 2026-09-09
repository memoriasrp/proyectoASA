import { Injectable } from '@nestjs/common';
import { CreateTipogastoDto } from './dto/create-tipogasto.dto';
import { UpdateTipogastoDto } from './dto/update-tipogasto.dto';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TipogastosService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createTipogastoDto: CreateTipogastoDto) {
    return this.prisma.tipogastos.create({
      data: createTipogastoDto,
    });
  }

  async findAll() {
    return await this.prisma.tipogastos.findMany({
      orderBy: {
        idtipogasto: 'asc',
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.tipogastos.findUnique({
      where: {
        idtipogasto: id,
      },
    });
  }

  async update(id: number, updateTipogastoDto: UpdateTipogastoDto) {
    return await this.prisma.tipogastos.update({
      where: {
        idtipogasto: id,
      },
      data: updateTipogastoDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.tipogastos.delete({
      where: {
        idtipogasto: id,
      },
    });
  }
}
