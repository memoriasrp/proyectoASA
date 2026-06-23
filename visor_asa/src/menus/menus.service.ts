import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createMenuDto: CreateMenuDto) {
    return this.prisma.opcionMenu.create({
      data: {
        nombre: createMenuDto.nombre,
        ruta: createMenuDto.ruta,
        icono: createMenuDto.icono
      }
    });
  }

  async findAll() {
    return this.prisma.opcionMenu.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.opcionMenu.findUnique({
      where: { id }
    });
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const existe = await this.prisma.opcionMenu.findUnique({ where: { id } });
    if (!existe) throw new NotFoundException(`El menú con ID #${id} no existe.`);
    return this.prisma.opcionMenu.update({
      where: { id },
      data: {
        nombre: updateMenuDto.nombre,
        ruta: updateMenuDto.ruta,
        icono: updateMenuDto.icono
      }
    });
  }

  async remove(id: number) {
    const existe = await this.prisma.opcionMenu.findUnique({ where: { id } });
    if (!existe) throw new NotFoundException(`El menú con ID #${id} no existe.`);
    return this.prisma.opcionMenu.delete({
      where: { id }
    });
  }
}
