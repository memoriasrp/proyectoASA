import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRegistrogastoDto } from './dto/create-registrogasto.dto';
import { UpdateRegistrogastoDto } from './dto/update-registrogasto.dto';
import { GetRegistroGastosFilterDto } from './dto/get-registrogastos-filter.dto';

@Injectable()
export class RegistrogastosService {
  constructor(private prisma: PrismaService) { }
  private buildWhereCondition(tipoGasto?: number, search?: string, desde?: Date, hasta?: Date) {
    const where: any = {};
    const andConditions: any[] = [];

    if (search && search.trim() !== '') {
      const words = search.trim().replace(/\s+/g, ' ').split(' ');

      const searchConditions = words.map(word => ({
        OR: [
          { idsocio: { contains: word, mode: 'insensitive' } },
          { detalle: { contains: word, mode: 'insensitive' } }, // Opcional: buscar por el detalle del gasto
          {
            socios: {
              OR: [
                { nombres: { contains: word, mode: 'insensitive' } },
                { paterno: { contains: word, mode: 'insensitive' } },
                { materno: { contains: word, mode: 'insensitive' } },
                { numdoc: { contains: word, mode: 'insensitive' } },
              ],
            },
          },
        ],
      }));

      andConditions.push(...searchConditions);
    }

    if (desde || hasta) {
      const fechaCondition: any = {};

      if (desde) {
        fechaCondition.gte = new Date(desde);
      }

      if (hasta) {
        const hastaFinDeDia = new Date(hasta);
        if (!isNaN(hastaFinDeDia.getTime())) {
          hastaFinDeDia.setHours(23, 59, 59, 999);
          fechaCondition.lte = hastaFinDeDia;
        } else {
          fechaCondition.lte = hasta;
        }
      }

      andConditions.push({ fecha: fechaCondition });
    }

    // Comprueba que tipoGasto exista y no sea cero
    if (tipoGasto && Number(tipoGasto) !== 0) {
      andConditions.push({ idtipogasto: Number(tipoGasto) });
    }

    if (andConditions.length > 0) {
      where.AND = andConditions;
    }

    return where;
  }

  async findAll(filters: GetRegistroGastosFilterDto) {
    const page = Number(filters.page) || 1;
    const limit = Number(filters.limit) || 20;
    const skip = (page - 1) * limit;

    const where = this.buildWhereCondition(
      filters.idTipoGastos,
      filters.search,
      filters.desde,
      filters.hasta
    );

    const [data, total] = await this.prisma.$transaction([
      this.prisma.registrogastos.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { fecha: 'desc' }, // O el campo de ordenamiento que prefieras (id, created_at, etc.)
        ],
        include: {
          socios: {
            select: {
              idsocio: true,
              nombres: true,
              paterno: true,
              materno: true,
              numdoc: true,
            },
          },
          tipogastos: true, // Incluye la relación completa del tipo de gasto
          usuarioCreacion: true,
          usuarioPago: true
        },
      }),
      this.prisma.registrogastos.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
  async create(createRegistrogastoDto: CreateRegistrogastoDto) {
    return await this.prisma.registrogastos.create({
      data: createRegistrogastoDto,
      include: {
        socios: {
          select: {
            idsocio: true,
            nombres: true,
            paterno: true,
            materno: true,
            numdoc: true,
          },
        },
        tipogastos: true,
      },
    });
  }

  async findOne(id: number) {
    const registro = await this.prisma.registrogastos.findUnique({
      where: { id },
      include: {
        socios: {
          select: {
            idsocio: true,
            nombres: true,
            paterno: true,
            materno: true,
            numdoc: true,
          },
        },
        tipogastos: true,
      },
    });

    if (!registro) {
      throw new NotFoundException(`El registro de gasto con ID ${id} no existe.`);
    }

    return registro;
  }

  async update(id: number, updateRegistrogastoDto: UpdateRegistrogastoDto) {
    // Verificar primero la existencia del registro
    await this.findOne(id);

    return await this.prisma.registrogastos.update({
      where: { id },
      data: updateRegistrogastoDto,
      include: {
        socios: {
          select: {
            idsocio: true,
            nombres: true,
            paterno: true,
            materno: true,
            numdoc: true,
          },
        },
        tipogastos: true,
      },
    });
  }

  async remove(id: number) {
    // Verificar primero la existencia del registro
    await this.findOne(id);

    return await this.prisma.registrogastos.delete({
      where: { id },
    });
  }

  async obtenerListaSociosSelect() {
    // 1. Consultar únicamente los campos requeridos
    const socios = await this.prisma.socios.findMany({
      select: {
        idsocio: true,
        numdoc: true,
        nombres: true,
        paterno: true,
        materno: true,
      },
      orderBy: {
        idsocio: 'asc',
      },
    });

    // 2. Mapear concatenando los campos y limpiando nulos/espacios extra
    return socios.map((socio) => {
      const doc = socio.numdoc?.trim() || '--';

      // Armar el nombre completo ignorando los nulos
      const nombreCompleto = [socio.nombres, socio.paterno, socio.materno]
        .filter((part) => part && part.trim() !== '') // Filtra nulos, undefined o vacíos
        .join(' ')
        .trim();

      return {
        idsocio: socio.idsocio,
        // Formato final: "idsocio | numdoc | nombres paterno materno"
        descripcion: `${socio.idsocio} | ${doc} | ${nombreCompleto || 'SIN NOMBRE'}`,
      };
    });
  }
}
