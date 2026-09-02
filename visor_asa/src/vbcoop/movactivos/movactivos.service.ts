import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { GetMovactivosFilterDto } from './dto/get-movactivos-filter.dto';
import { UpdateMovimientoActivoDto } from './dto/update-movactivos.dto';


@Injectable()
export class MovactivosService {
    constructor(private prisma: PrismaService) { }
    private buildWhereCondition(search?: string, producto?: string, desde?: Date, hasta?: Date, moneda?: string) {
        const where: any = {};

        // Inicializamos un arreglo AND para unificar todos los filtros de manera limpia
        const andConditions: any[] = [];
        if (search && search.trim() !== '') {
            const words = search.trim().replace(/\s+/g, ' ').split(' ');

            const searchConditions = words.map(word => ({
                OR: [
                    { idpagare: { contains: word, mode: 'insensitive' } },
                    { idsocio: { contains: word, mode: 'insensitive' } },
                    { nombre: { contains: word, mode: 'insensitive' } },
                    { numdoc: { contains: word, mode: 'insensitive' } },
                ]
            }));

            // Empujamos las condiciones de búsqueda al AND principal
            andConditions.push(...searchConditions);
        }

        // 2. Filtro de Moneda
        if (moneda && moneda.trim() !== '') {
            andConditions.push({ moneda: moneda });
        }

        // 3. Filtro de Producto
        if (producto && producto.trim() !== '') {
            andConditions.push({ descri: { contains: producto, mode: 'insensitive' } });
        }

        // 4. Filtro por Rango de Fechas
        if (desde || hasta) {
            const fechaCondition: any = {};

            if (desde) {
                fechaCondition.gte = desde;
            }

            if (hasta) {
                // 💡 Tip PRO aplicado: Para incluir el día "hasta" completo (23:59:59.999), 
                // nos aseguramos de setearle el final del día si es un objeto Date válido
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

        // Si acumulamos condiciones, se las asignamos al objeto Where final
        if (andConditions.length > 0) {
            where.AND = andConditions;
        }

        return where;
    }

    async findAll(filters: GetMovactivosFilterDto) {
        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 20;
        const skip = (page - 1) * limit;

        // (search, producto, desde, hasta, moneda)
        const where = this.buildWhereCondition(
            filters.search,
            filters.producto,
            filters.desde,
            filters.hasta,
            filters.moneda
        );

        const [data, total] = await this.prisma.$transaction([
            this.prisma.movimientosprestamos.findMany({
                where,
                skip,
                take: limit,
                orderBy: [
                    { descri: 'asc' },
                    { nombre: 'asc' },
                    { fecha: 'asc' },
                ]
            }),
            this.prisma.movimientosprestamos.count({ where }),
        ]);

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    // 3. MÉTODO PARA EXPORTAR EL UNIVERSO FILTRADO (Sin skip ni take)
    async findParaExportar(filters: GetMovactivosFilterDto) {
        const where = this.buildWhereCondition(
            filters.search,
            filters.producto,
            filters.desde,
            filters.hasta,
            filters.moneda
        )
        return this.prisma.movimientosprestamos.findMany({
            where,
            orderBy: [
                { fecha: 'asc' },
                { nombre: 'asc' },
                { descri: 'asc' },
                { idpagare: 'asc' }
            ]
        });
    }

    async findDistinctProductos() {
        const productos = await this.prisma.movimientosprestamos.findMany({
            select: {
                descri: true,
            },
            distinct: ['descri'],
            where: {
                descri: {
                    not: null, // Evitamos que traiga valores nulos si los hay
                }
            },
            orderBy: {
                descri: 'asc', // Te los devuelve ordenados alfabéticamente
            }
        });

        // Mapeamos el arreglo de objetos para devolver un arreglo simple de strings
        return productos.map(p => p.descri);
    }

    async registrar(dto: CreateMovimientoDto) {
        const existe = await this.prisma.movimientosprestamos.findFirst({ where: { idpagare: dto.idpagare, nrocuota: 0, car_abo: 'C' } });
        if (!existe) {
            throw new NotFoundException(`No se encontró el cargo inicial (cuota 0) para el pagaré ${dto.idpagare}`);
        }
        dto.idsocio = existe?.idsocio ?? '';
        dto.nombre = existe?.nombre ?? '';
        dto.numdoc = existe?.numdoc ?? '';
        dto.descri = existe?.descri ?? '';
        dto.moneda = existe?.moneda ?? '';
        dto.idforma = existe?.idforma ?? '';
        dto.importe = existe?.importe ? existe.importe.toNumber() : 0;
        dto.plazo = existe?.plazo ?? 0;
        dto.tasa = existe?.tasa ? existe.tasa.toNumber() : 0;
        dto.tasa2 = existe?.tasa2 ? existe.tasa2.toNumber() : 0;
        dto.fechades = existe?.fechades ? existe.fechades.toISOString() : undefined;
        dto.f1 = existe?.f1 ? existe.f1.toISOString() : undefined;
        dto.f2 = existe?.f2 ? existe.f2.toISOString() : undefined;
        dto.f3 = existe?.f3 ?? '';
        dto.tipsoc = existe?.tipsoc ? existe.tipsoc : 0;
        dto.natjur = existe?.natjur ? existe.natjur : 0;
        dto.ruc = existe?.ruc ?? '';
        dto.sexo = existe?.sexo ? existe.sexo.toNumber() : 0;
        dto.castigada = existe?.castigada ? existe.castigada.toNumber() : 0;
        dto.castigo = existe?.castigo ? existe.castigo.toNumber() : 0;

        const { fecha, fechades, f1, f2, ...restoDto } = dto;
        //return await this.prisma.movimientosprestamos.create({ data: dto });
        return await this.prisma.$transaction(async (tx) => {
            const nuevoMovimiento = await tx.movimientosprestamos.create({
                data: {
                    ...restoDto,
                    fecha: new Date(dto.fecha),

                    // Asegurarte de que el resto de fechas opcionales también sean Date o null/undefined
                    fechades: dto.fechades ? new Date(dto.fechades) : undefined,
                    f1: dto.f1 ? new Date(dto.f1) : undefined,
                    f2: dto.f2 ? new Date(dto.f2) : undefined,
                },
            });
            await tx.$executeRaw`
                DELETE FROM consolidado.carteraxperiodo_prestamo
                WHERE idsocio = ${dto.idsocio} 
                AND idpagare = ${dto.idpagare} 
                AND periodo IN (
                    SELECT prd.periodo 
                    FROM consolidado.calendario_periodos prd 
                    WHERE fecha > ${dto.fecha}::date
                );
            `;

            await tx.$executeRaw`
               insert into consolidado.carteraxperiodo_prestamo  
                SELECT     c.periodo,	c.tc,    c.fecha AS fecha_corte,
                    idpagare, idsocio, nombre, 
                    numdoc, descri, moneda, 
                    desembolso, plazo, tasa, 
                    fechades, cuotas_pagadas, totalmov, 
                    saldocapital as saldocapitalmo, 
                    case when moneda='D' then saldocapital*c.tc else saldocapital end saldocapitalmn, 
                    pagointeres as pagointeresmo,
                    case when moneda='D' then pagointeres*c.tc else pagointeres end as pagointeresmn,
                    pagomora as pagomoramo,
                    case when moneda='D' then pagomora*c.tc else pagomora end  as pagomoramn,
                    pagoseguro as pagoseguromo,
                    case when moneda='D' then pagoseguro*c.tc else pagoseguro end as pagoseguromn,
                    pagoaporte as pagoaportemo,
                    case when moneda='D' then pagoaporte*c.tc  else pagoaporte end  as pagoaportemn,
                    totalpago as totalpagomo,
                    case when moneda='D' then totalpago*c.tc else totalpago end as totalpagomn,
                    CASE WHEN saldocapital = 0 THEN 'CANCELADO' ELSE 'VIGENTE' END AS condicion,
                    fecultmovimiento
                FROM consolidado.calendario_periodos c
                CROSS JOIN LATERAL (
                    SELECT 
                        idpagare, idsocio, nombre, 
                        numdoc, descri, moneda, importe as desembolso, tasa, fechades,plazo,
                        MAX(nrocuota) AS cuotas_pagadas, 
                        COUNT(*) AS totalmov,
                        SUM(CASE WHEN car_abo = 'C' THEN capital ELSE capital * (-1) END) AS saldoCapital, 
                        SUM(interes) AS pagointeres, 
                        SUM(mora) AS pagomora, 
                        SUM(seguro) AS pagoseguro, 
                        SUM(aporte) AS pagoaporte, 
                        SUM(CASE WHEN car_abo = 'C' THEN total ELSE total * (-1) END) AS totalPago ,
                        max(m.fecha) as fecultmovimiento
                    FROM consolidado.movimientosprestamos M
                WHERE 
                    m.fecha <= c.fecha 
                    AND c.fecha > ${dto.fecha}::date
                    AND idsocio = ${dto.idsocio} 
                    AND idpagare = ${dto.idpagare}
                GROUP BY  idpagare, idsocio, nombre, 
                 numdoc, descri, moneda, importe, plazo, tasa, fechades
                ) AS cartera
                ORDER BY c.periodo, cartera.idpagare, nombre;      `;

            await tx.$executeRaw`
                 UPDATE consolidado.movimientosprestamos f set saldo = 
                    (SELECT sum(case when car_Abo ='C' then capital else capital *(-1) end) 
                    FROM consolidado.movimientosprestamos cal where cal.idpagare= f.idpagare and cal.fecha <=f.fecha)
                    WHERE saldo is null and idpagare= ${dto.idpagare} AND idsocio= ${dto.idsocio} ; `;
        }).catch((error) => {
            // Si ocurre CUALQUIER error en paso 1, 2 o 3, Prisma hace ROLLBACK automático de todo
            throw new InternalServerErrorException(
                `Error al procesar el movimiento y actualizar la cartera: ${error.message}`
            );
        });


    }

    async update(id: string, updateMovimientoActivoDto: UpdateMovimientoActivoDto) {
        const existe = await this.prisma.movimientosprestamos.findFirst({
            where: {
                idnumope: id,
                idpagare: updateMovimientoActivoDto.idpagare
            }
        });

        if (!existe) {
            throw new NotFoundException(`El movimiento con IDnumOpe #${id} no existe.`);
        }

        var fechaEvaluacion = existe.fecha;
        if (updateMovimientoActivoDto.fecha) {
            if (new Date(updateMovimientoActivoDto.fecha) < fechaEvaluacion)
                fechaEvaluacion = new Date(updateMovimientoActivoDto.fecha);
        }
        return await this.prisma.$transaction(async (tx) => {
            const actualizarMovimiento = await tx.movimientosprestamos.update({
                where: {
                    // Sintaxis correcta para clave única compuesta en Prisma:
                    idnumope_fecha_idpagare_nrocuota_car_abo: {
                        idnumope: id,
                        fecha: existe.fecha,
                        idpagare: existe.idpagare,
                        nrocuota: existe.nrocuota.toNumber(),
                        car_abo: 'A'
                    }
                },
                data: {
                    capital: updateMovimientoActivoDto.capital,
                    interes: updateMovimientoActivoDto.interes,
                    mora: updateMovimientoActivoDto.mora,
                    seguro: updateMovimientoActivoDto.seguro,
                    aporte: updateMovimientoActivoDto.aporte,
                    total: updateMovimientoActivoDto.total,
                    castigada: 0,
                    ...(updateMovimientoActivoDto.fecha && {
                        fecha: new Date(updateMovimientoActivoDto.fecha)
                    })
                }
            });
            await tx.$executeRaw`
                DELETE FROM consolidado.carteraxperiodo_prestamo
                WHERE idsocio = ${updateMovimientoActivoDto.idsocio} 
                AND idpagare = ${updateMovimientoActivoDto.idpagare} 
                AND periodo IN (
                    SELECT prd.periodo 
                    FROM consolidado.calendario_periodos prd 
                    WHERE fecha > ${fechaEvaluacion}::date
                );
            `;

            await tx.$executeRaw`
               insert into consolidado.carteraxperiodo_prestamo  
                SELECT     c.periodo,	c.tc,    c.fecha AS fecha_corte,
                    idpagare, idsocio, nombre, 
                    numdoc, descri, moneda, 
                    desembolso, plazo, tasa, 
                    fechades, cuotas_pagadas, totalmov, 
                    saldocapital as saldocapitalmo, 
                    case when moneda='D' then saldocapital*c.tc else saldocapital end saldocapitalmn, 
                    pagointeres as pagointeresmo,
                    case when moneda='D' then pagointeres*c.tc else pagointeres end as pagointeresmn,
                    pagomora as pagomoramo,
                    case when moneda='D' then pagomora*c.tc else pagomora end  as pagomoramn,
                    pagoseguro as pagoseguromo,
                    case when moneda='D' then pagoseguro*c.tc else pagoseguro end as pagoseguromn,
                    pagoaporte as pagoaportemo,
                    case when moneda='D' then pagoaporte*c.tc  else pagoaporte end  as pagoaportemn,
                    totalpago as totalpagomo,
                    case when moneda='D' then totalpago*c.tc else totalpago end as totalpagomn,
                    CASE WHEN saldocapital = 0 THEN 'CANCELADO' ELSE 'VIGENTE' END AS condicion,
                    fecultmovimiento
                FROM consolidado.calendario_periodos c
                CROSS JOIN LATERAL (
                    SELECT 
                        idpagare, idsocio, nombre, 
                        numdoc, descri, moneda, importe as desembolso, tasa, fechades,plazo,
                        MAX(nrocuota) AS cuotas_pagadas, 
                        COUNT(*) AS totalmov,
                        SUM(CASE WHEN car_abo = 'C' THEN capital ELSE capital * (-1) END) AS saldoCapital, 
                        SUM(interes) AS pagointeres, 
                        SUM(mora) AS pagomora, 
                        SUM(seguro) AS pagoseguro, 
                        SUM(aporte) AS pagoaporte, 
                        SUM(CASE WHEN car_abo = 'C' THEN total ELSE total * (-1) END) AS totalPago ,
                        max(m.fecha) as fecultmovimiento
                    FROM consolidado.movimientosprestamos M
                WHERE 
                    m.fecha <= c.fecha 
                    AND c.fecha > ${fechaEvaluacion}::date
                    AND idsocio = ${updateMovimientoActivoDto.idsocio} 
                    AND idpagare = ${updateMovimientoActivoDto.idpagare}
                GROUP BY  idpagare, idsocio, nombre, 
                 numdoc, descri, moneda, importe, plazo, tasa, fechades
                ) AS cartera
                ORDER BY c.periodo, cartera.idpagare, nombre;
      `;
        }).catch((error) => {
            // Si ocurre CUALQUIER error en paso 1, 2 o 3, Prisma hace ROLLBACK automático de todo
            throw new InternalServerErrorException(
                `Error al procesar el movimiento y actualizar la cartera: ${error.message}`
            );
        });
    }

}
