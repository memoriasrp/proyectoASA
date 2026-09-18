import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateMenuDto } from '../../menus/dto/update-menu.dto';
import { GetPeriodosFilterDto } from './dto/get-periodos-filter.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
@Injectable()
export class PeriodosService {
    constructor(private readonly prisma: PrismaService) { }
    async findAll(filters: GetPeriodosFilterDto) {
        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 20;
        const skip = (page - 1) * limit;

        // const [data, total] = await this.prisma.$transaction([
        //     this.prisma.calendario_periodos.findMany({
        //         skip,
        //         take: limit,
        //         orderBy: { periodo: 'desc' },
        //     }),
        //     this.prisma.calendario_periodos.count(),
        // ]);

        // return {
        //     data,
        //     meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
        // };
        const [data, totalCountResult] = await Promise.all([
            this.prisma.$queryRaw<any[]>`
            SELECT 
                prd.periodo, 
                prd.fecha, 
                prd.tc, 
                prd.activo,
                (
                    SELECT COUNT(*) 
                    FROM consolidado.carteraxperiodo_pasivo crtp 
                    WHERE crtp.periodo = prd.periodo 
                    AND crtp.condicion = 'VIGENTE' 
                    AND crtp.tipo = 'APORTE'
                ) AS aportes,
                (
                    SELECT COUNT(*) 
                    FROM consolidado.carteraxperiodo_pasivo crtp 
                    WHERE crtp.periodo = prd.periodo 
                    AND crtp.condicion = 'VIGENTE' 
                    AND crtp.tipo = 'AHORRO'
                ) AS ahorros,
                (
                    SELECT COUNT(*) 
                    FROM consolidado.carteraxperiodo_pasivo crtp 
                    WHERE crtp.periodo = prd.periodo 
                    AND crtp.condicion = 'VIGENTE' 
                    AND crtp.tipo = 'DPF'
                ) AS dpf,
                (
                    SELECT COUNT(*) 
                    FROM consolidado.carteraxperiodo_prestamo crpr 
                    WHERE crpr.periodo = prd.periodo 
                    AND crpr.condicion = 'VIGENTE'
                ) AS prestamos
            FROM consolidado.calendario_periodos prd
            ORDER BY prd.periodo DESC
            LIMIT ${limit} OFFSET ${skip};
            `,
            this.prisma.calendario_periodos.count(),
        ]);

        const total = Number(totalCountResult);

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

    async create(createPeriodoDto: UpdatePeriodoDto) {
        return this.prisma.calendario_periodos.create({
            data: {
                periodo: createPeriodoDto.periodo,
                fecha: createPeriodoDto.fecha,
                tc: createPeriodoDto.tc,
            }
        });
    }

    async update(periodo: string, updatePeriodoDto: UpdatePeriodoDto) {
        const existe = await this.prisma.calendario_periodos.findUnique({ where: { periodo: periodo } });
        if (!existe) throw new NotFoundException(`El periodo con ID #${periodo} no existe.`);
        return this.prisma.calendario_periodos.update({
            where: { periodo: periodo },
            data: {
                fecha: updatePeriodoDto.fecha,
                tc: updatePeriodoDto.tc,
            }
        });
    }
    async recalculate(periodo: string) {
        const existe = await this.prisma.calendario_periodos.findUnique({
            where: { periodo: periodo },
        });

        if (!existe) {
            throw new NotFoundException(`El periodo con ID #${periodo} no existe.`);
        }

        console.log(`Recalculando periodo: ${periodo}`);

        // 🟢 Configuración de la Transacción con Timeout Ampliado (60 segundos)
        return this.prisma.$transaction(
            [
                // 1. Borra los pasivos de este periodo
                this.prisma.carteraxperiodo_pasivo.deleteMany({
                    where: { periodo: periodo },
                }),

                // 2. Borra la cartera de préstamos de este periodo
                this.prisma.consolidado_carteraxperiodo_prestamo.deleteMany({
                    where: { periodo: periodo },
                }),

                // 3. Inserta APORTES
                this.prisma.$executeRaw`
            INSERT INTO consolidado.carteraxperiodo_pasivo
            SELECT     
                c.periodo, c.tc, c.fecha AS fecha_corte,
                cartera.tipo, cartera.idcdp, cartera.idsocio, 
                cartera.nombre, cartera.numdoc, cartera.descri, 
                cartera.moneda, cartera.cap_original AS cap_originalmo,          
                CASE WHEN cartera.moneda = 'D' THEN ROUND(cartera.cap_original * c.tc, 2) ELSE cartera.cap_original END AS cap_originalmn,     
                cartera.plazo, cartera.tasa, cartera.tasaanual, cartera.fecing, 
                cartera.totalitem, cartera.totalmov,     
                cartera.saldo_periodo AS saldo_periodomo,
                CASE WHEN cartera.moneda = 'D' THEN ROUND(cartera.saldo_periodo * c.tc, 2) ELSE cartera.saldo_periodo END AS saldo_periodomn,
                cartera.pagointeres_periodo AS pagointeres_periodomo, 
                CASE WHEN cartera.moneda = 'D' THEN ROUND(cartera.pagointeres_periodo * c.tc, 2) ELSE cartera.pagointeres_periodo END AS pagointeres_periodomn,
                cartera.fecdeposito, cartera.fecultmov, 
                CASE WHEN cartera.saldo_periodo = 0 THEN 'CANCELADO' ELSE 'VIGENTE' END AS condicion
            FROM consolidado.calendario_periodos c
            CROSS JOIN LATERAL (
                SELECT 
                    tipo, idcdp, idsocio, nombre, 
                    numdoc, descri, moneda, cap_original, plazo,
                    tasa, tasaanual, fecing,
                    MAX(item) AS totalitem, 
                    COUNT(*) AS totalmov,
                    SUM(CASE WHEN car_abo = 'A' THEN capital ELSE capital * (-1) END) AS saldo_periodo, 
                    SUM(interes) AS pagointeres_periodo, 
                    MIN(fecha) AS fecdeposito,
                    MAX(fecha) AS fecultmov
                FROM consolidado.todo_mov_pas m
                WHERE m.tipo = 'APORTE' 
                  AND m.fecha <= c.fecha 
                GROUP BY tipo, idcdp, idsocio, nombre, 
                         numdoc, descri, moneda, cap_original, plazo,
                         tasa, tasaanual, fecing
            ) AS cartera
            WHERE c.periodo = ${periodo} 
            ORDER BY c.periodo, cartera.idcdp, nombre;
        `,

                // 4. Inserta AHORROS
                this.prisma.$executeRaw`
            INSERT INTO consolidado.carteraxperiodo_pasivo
            SELECT     
                c.periodo, c.tc, c.fecha AS fecha_corte,
                cartera.tipo, cartera.idcdp, cartera.idsocio, 
                cartera.nombre, cartera.numdoc, cartera.descri, 
                cartera.moneda, cartera.cap_original AS cap_originalmo,          
                CASE WHEN cartera.moneda = 'D' THEN ROUND(cartera.cap_original * c.tc, 2) ELSE cartera.cap_original END AS cap_originalmn,     
                cartera.plazo, cartera.tasa, cartera.tasaanual, cartera.fecing, 
                cartera.totalitem, cartera.totalmov,     
                cartera.saldo_periodo AS saldo_periodomo,
                CASE WHEN cartera.moneda = 'D' THEN ROUND(cartera.saldo_periodo * c.tc, 2) ELSE cartera.saldo_periodo END AS saldo_periodomn,
                cartera.pagointeres_periodo AS pagointeres_periodomo, 
                CASE WHEN cartera.moneda = 'D' THEN ROUND(cartera.pagointeres_periodo * c.tc, 2) ELSE cartera.pagointeres_periodo END AS pagointeres_periodomn,
                cartera.fecdeposito, cartera.fecultmov, 
                CASE WHEN cartera.saldo_periodo = 0 THEN 'CANCELADO' ELSE 'VIGENTE' END AS condicion
            FROM consolidado.calendario_periodos c
            CROSS JOIN LATERAL (
                SELECT 
                    tipo, idcdp, idsocio, nombre, 
                    numdoc, descri, moneda, 
                    SUM(CASE WHEN car_abo = 'A' THEN capital ELSE capital * (-1) END) AS cap_original, 
                    plazo, tasa, tasaanual, fecing,
                    MAX(item) AS totalitem, 
                    COUNT(*) AS totalmov,
                    SUM(CASE WHEN car_abo = 'A' THEN (capital + interes) ELSE capital * (-1) END) AS saldo_periodo, 
                    SUM(interes) AS pagointeres_periodo, 
                    MIN(fecha) AS fecdeposito,
                    MAX(fecha) AS fecultmov
                FROM consolidado.todo_mov_pas m
                WHERE m.tipo = 'AHORRO' 
                  AND m.fecha <= c.fecha 
                GROUP BY tipo, idcdp, idsocio, nombre, 
                         numdoc, descri, moneda, plazo,
                         tasa, tasaanual, fecing
            ) AS cartera
            WHERE c.periodo = ${periodo} 
            ORDER BY c.periodo, cartera.idcdp, nombre;
        `,

                // 5. Inserta DPF
                this.prisma.$executeRaw`
            INSERT INTO consolidado.carteraxperiodo_pasivo
            SELECT     
                c.periodo, c.tc, c.fecha AS fecha_corte,
                cartera.tipo, cartera.idcdp, cartera.idsocio, 
                cartera.nombre, cartera.numdoc, cartera.descri, 
                cartera.moneda, cartera.cap_original AS cap_originalmo,          
                CASE WHEN cartera.moneda = 'D' THEN ROUND(cartera.cap_original * c.tc, 2) ELSE cartera.cap_original END AS cap_originalmn,     
                cartera.plazo, cartera.tasa, cartera.tasaanual, cartera.fecing, 
                cartera.totalitem, cartera.totalmov,     
                cartera.saldo_periodo AS saldo_periodomo,
                CASE WHEN cartera.moneda = 'D' THEN ROUND(cartera.saldo_periodo * c.tc, 2) ELSE cartera.saldo_periodo END AS saldo_periodomn,
                cartera.pagointeres_periodo AS pagointeres_periodomo, 
                CASE WHEN cartera.moneda = 'D' THEN ROUND(cartera.pagointeres_periodo * c.tc, 2) ELSE cartera.pagointeres_periodo END AS pagointeres_periodomn,
                cartera.fecdeposito, cartera.fecultmov, 
                CASE WHEN cartera.saldo_periodo = 0 THEN 'CANCELADO' ELSE 'VIGENTE' END AS condicion
            FROM consolidado.calendario_periodos c
            CROSS JOIN LATERAL (
                SELECT 
                    tipo, idcdp, idsocio, nombre, 
                    numdoc, descri, moneda, cap_original, plazo,
                    tasa, tasaanual, fecing,
                    MAX(item) AS totalitem, 
                    COUNT(*) AS totalmov,
                    SUM(CASE WHEN car_abo = 'A' THEN capital ELSE capital * (-1) END) AS saldo_periodo, 
                    SUM(interes) AS pagointeres_periodo, 
                    MIN(fecha) AS fecdeposito,
                    MAX(fecha) AS fecultmov
                FROM consolidado.todo_mov_pas m
                WHERE m.tipo = 'DPF' 
                  AND m.fecha <= c.fecha 
                GROUP BY tipo, idcdp, idsocio, nombre, 
                         numdoc, descri, moneda, cap_original, plazo,
                         tasa, tasaanual, fecing
            ) AS cartera    
            WHERE c.periodo = ${periodo} 
            ORDER BY c.periodo, cartera.idcdp, nombre;
        `,

                // 6. Inserta PRESTAMOS
                this.prisma.$executeRaw`
            INSERT INTO consolidado.carteraxperiodo_prestamo  
            SELECT     
                c.periodo, c.tc, c.fecha AS fecha_corte,
                idpagare, idsocio, nombre, 
                numdoc, descri, moneda, 
                desembolso, plazo, tasa, 
                fechades, cuotas_pagadas, totalmov, 
                saldocapital AS saldocapitalmo, 
                CASE WHEN moneda = 'D' THEN saldocapital * c.tc ELSE saldocapital END AS saldocapitalmn, 
                pagointeres AS pagointeresmo,
                CASE WHEN moneda = 'D' THEN pagointeres * c.tc ELSE pagointeres END AS pagointeresmn,
                pagomora AS pagomoramo,
                CASE WHEN moneda = 'D' THEN pagomora * c.tc ELSE pagomora END AS pagomoramn,
                pagoseguro AS pagoseguromo,
                CASE WHEN moneda = 'D' THEN pagoseguro * c.tc ELSE pagoseguro END AS pagoseguromn,
                pagoaporte AS pagoaportemo,
                CASE WHEN moneda = 'D' THEN pagoaporte * c.tc ELSE pagoaporte END AS pagoaportemn,
                totalpago AS totalpagomo,
                CASE WHEN moneda = 'D' THEN totalpago * c.tc ELSE totalpago END AS totalpagomn,
                CASE WHEN saldocapital = 0 THEN 'CANCELADO' ELSE 'VIGENTE' END AS condicion,
                fecultmovimiento
            FROM consolidado.calendario_periodos c
            CROSS JOIN LATERAL (
                SELECT 
                    idpagare, idsocio, nombre, 
                    numdoc, descri, moneda, importe AS desembolso, tasa, fechades, plazo,
                    MAX(nrocuota) AS cuotas_pagadas, 
                    COUNT(*) AS totalmov,
                    SUM(CASE WHEN car_abo = 'C' THEN capital ELSE capital * (-1) END) AS saldoCapital, 
                    SUM(interes) AS pagointeres, 
                    SUM(mora) AS pagomora, 
                    SUM(seguro) AS pagoseguro, 
                    SUM(aporte) AS pagoaporte, 
                    SUM(CASE WHEN car_abo = 'C' THEN total ELSE total * (-1) END) AS totalPago,
                    MAX(CASE WHEN capital != 0 THEN m.fecha END) AS fecultmovimiento
                FROM consolidado.movimientosprestamos m
                WHERE m.fecha <= c.fecha 
                GROUP BY idpagare, idsocio, nombre, 
                         numdoc, descri, moneda, importe, plazo, tasa, fechades
            ) AS cartera   
            WHERE c.periodo = ${periodo} 
            ORDER BY c.periodo, fechades, idpagare;
        `,

                // 7. Actualiza forma de pago en préstamos
                this.prisma.$executeRaw`
            UPDATE consolidado.carteraxperiodo_prestamo crt 
            SET idforma = (SELECT idforma FROM ctacte.pagares tpr WHERE tpr.idpagare = crt.idpagare)
            WHERE idforma IS NULL AND periodo = ${periodo};
        `,
            ],
            {
                timeout: 60000, // 🟢 60 segundos de tiempo límite para la transacción entera
            },
        );
    }


    async activate(periodo: string) {
        const existe = await this.prisma.calendario_periodos.findUnique({
            where: { periodo: periodo },
        });
        if (!existe) throw new NotFoundException(`El periodo con ID #${periodo} no existe.`);

        // Usamos una transacción para garantizar consistencia
        return this.prisma.$transaction([
            // 1.Borra los pasivos de este periodo
            this.prisma.calendario_periodos.updateMany({
                where: { activo: true },
                data: { activo: false },
            }),
            // 2. Activa el periodo seleccionado
            this.prisma.calendario_periodos.update({
                where: { periodo: periodo },
                data: { activo: true },
            }),
        ]).then(([, periodoActivado]) => periodoActivado); // Retorna la entidad recién activada
    }

    async remove(periodo: string) {
        const existe = await this.prisma.calendario_periodos.findUnique({ where: { periodo: periodo } });
        if (!existe) throw new NotFoundException(`El periodo con ID #${periodo} no existe.`);
        return this.prisma.calendario_periodos.delete({
            where: { periodo: periodo }
        });
    }

}



