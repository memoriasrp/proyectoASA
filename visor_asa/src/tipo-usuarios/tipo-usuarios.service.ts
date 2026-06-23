import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoUsuarioDto } from './dto/create-tipo-usuario.dto';
import { UpdateTipoUsuarioDto } from './dto/update-tipo-usuario.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TipoUsuariosService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createTipoUsuarioDto: CreateTipoUsuarioDto) {
    return this.prisma.tipoUsuario.create({
      data: { nombre: createTipoUsuarioDto.nombre }
    });
  }

  async findAll() {
    return this.prisma.tipoUsuario.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const tipoUsuario = await this.prisma.tipoUsuario.findUnique({
      where: { id },
    });
    if (!tipoUsuario) {
      throw new NotFoundException(`Tipo de usuario con ID ${id} no encontrado`);
    }
    return tipoUsuario;
  }

  async update(id: number, updateTipoUsuarioDto: UpdateTipoUsuarioDto) {
    const existe = await this.prisma.tipoUsuario.findUnique({ where: { id } });
    if (!existe) throw new NotFoundException(`El rol con ID #${id} no existe.`);

    return this.prisma.tipoUsuario.update({
      where: { id },
      data: { nombre: updateTipoUsuarioDto.nombre }
    });
  }

  async remove(id: number) {
    const existe = await this.prisma.tipoUsuario.findUnique({ where: { id } });
    if (!existe) throw new NotFoundException(`El rol con ID #${id} no existe.`);

    return this.prisma.tipoUsuario.delete({ where: { id } });
  }
  // src/tipo-usuarios/tipo-usuarios.service.ts

  async guardarPermisos(tipoUsuarioId: number, menuIds: number[]) {
    // Ejecutamos ambas acciones en bloque seguro
    return this.prisma.$transaction(async (tx) => {

      // 1. Eliminamos todos los permisos actuales que tenga este rol
      await tx.permisoPantalla.deleteMany({
        where: { tipoUsuarioId: tipoUsuarioId }
      });

      // 2. Preparamos el lote de nuevos permisos a registrar
      const nuevosPermisos = menuIds.map(menuId => ({
        tipoUsuarioId: tipoUsuarioId,
        opcionMenuId: menuId
      }));

      // 3. Insertamos en lote en config."PermisoPantalla"
      if (nuevosPermisos.length > 0) {
        await tx.permisoPantalla.createMany({
          data: nuevosPermisos
        });
      }

      return { ok: true, mensaje: 'Permisos actualizados con éxito' };
    });
  }
}
