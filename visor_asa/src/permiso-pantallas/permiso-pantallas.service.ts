import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermisoPantallaDto } from './dto/create-permiso-pantalla.dto';
import { UpdatePermisoPantallaDto } from './dto/update-permiso-pantalla.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PermisoPantallasService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPermisoPantallaDto: CreatePermisoPantallaDto) {
    return this.prisma.permisoPantalla.create({
      data: {
        tipoUsuarioId: Number(createPermisoPantallaDto.tipoUsuarioId),
        opcionMenuId: Number(createPermisoPantallaDto.opcionMenuId)
      }
    });
  }

  async findAll() {
    return this.prisma.permisoPantalla.findMany({
      include: {
        tipoUsuario: true, // Trae info de config."TipoUsuario"
        opcionMenu: true   // Trae info de config."OpcionMenu"
      },
      orderBy: { id: 'asc' }
    });
  }

  async findOne(id: number) {
    const existe = await this.prisma.permisoPantalla.findUnique({ where: { id } });
    if (!existe) throw new NotFoundException('Asignación de permiso no encontrada.');

    return this.prisma.permisoPantalla.findUnique({
      where: { id },
      include: {
        tipoUsuario: true,
        opcionMenu: true
      }
    });
  }

  async update(id: number, updatePermisoPantallaDto: UpdatePermisoPantallaDto) {
    const existe = await this.prisma.permisoPantalla.findUnique({ where: { id } });
    if (!existe) throw new NotFoundException('Asignación de permiso no encontrada.');

    return this.prisma.permisoPantalla.update({
      where: { id },
      data: {
        tipoUsuarioId: Number(updatePermisoPantallaDto.tipoUsuarioId),
        opcionMenuId: Number(updatePermisoPantallaDto.opcionMenuId)
      }
    });
  }

  async remove(id: number) {
    const existe = await this.prisma.permisoPantalla.findUnique({ where: { id } });
    if (!existe) throw new NotFoundException('Asignación de permiso no encontrada.');

    return this.prisma.permisoPantalla.delete({ where: { id } });
  }
}
