import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ajusta la ruta a tu PrismaService
import { GetSociosFilterDto } from './dto/get-socios-filter.dto';
import { Prisma } from '@prisma/client';
@Injectable()
export class SociosService {
    constructor(private prisma: PrismaService) { }
    async findAll(filters: GetSociosFilterDto, periodo?: string, tc?: number) {
        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 20;
        const skip = (page - 1) * limit;
        const search = filters.search;

        // 1. Construir dinámicamente la cláusula WHERE para SQL Raw
        let whereClause = Prisma.sql`WHERE 1=1`;

        if (search) {
            const words = search.trim().replace(/\s+/g, ' ').split(' ');

            const searchConditions = words.map(word => {
                const term = `%${word}%`;
                return Prisma.sql`(
                    sc.idsocio ILIKE ${term} OR
                    sc.nombres ILIKE ${term} OR
                    sc.paterno ILIKE ${term} OR
                    sc.materno ILIKE ${term} OR
                    sc.numdoc ILIKE ${term} OR
                    sc.ruc ILIKE ${term}
                )`;
            });

            whereClause = Prisma.sql`WHERE ${Prisma.join(searchConditions, ' AND ')}`;
        }

        // 2. Consulta principal con agregados de pasivos y préstamos
        const dataPromise = this.prisma.$queryRaw<any[]>`
            SELECT 
                sc.*,
                COALESCE(pas.total_aportes, 0)::float AS total_aportes,
                COALESCE(pas.total_ahorros, 0)::float AS total_ahorros,
                COALESCE(pas.total_dpf, 0)::float     AS total_dpf,
                COALESCE(pre.total_prestamos, 0)::float AS total_prestamos
            FROM ctacte.socios sc
            LEFT JOIN (
                SELECT 
                    idsocio,
                    SUM(saldo_periodomn) FILTER (WHERE tipo = 'APORTE') AS total_aportes,
                    SUM(saldo_periodomn) FILTER (WHERE tipo = 'AHORRO') AS total_ahorros,
                    SUM(saldo_periodomn) FILTER (WHERE tipo = 'DPF')    AS total_dpf
                FROM consolidado.carteraxperiodo_pasivo
                WHERE periodo = ${periodo} AND saldo_periodomn > 0
                GROUP BY idsocio
            ) pas ON pas.idsocio = sc.idsocio
            LEFT JOIN (
                SELECT 
                    idsocio,
                    SUM(saldocapitalmn) AS total_prestamos
                FROM consolidado.carteraxperiodo_prestamo
                WHERE periodo = ${periodo} AND saldocapitalmn > 0
                GROUP BY idsocio
            ) pre ON pre.idsocio = sc.idsocio
            ${whereClause}
            ORDER BY sc.paterno ASC
            LIMIT ${limit} OFFSET ${skip};
        `;

        // 3. Conteo total de registros con los mismos filtros
        const totalPromise = this.prisma.$queryRaw<{ count: bigint }[]>`
            SELECT COUNT(*)::bigint as count
            FROM ctacte.socios sc
            ${whereClause};
        `;

        // 4. Ejecutar ambas consultas en paralelo
        const [data, totalResult] = await Promise.all([dataPromise, totalPromise]);

        const total = Number(totalResult[0]?.count || 0);

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
    async AllExport(filters: GetSociosFilterDto, periodo?: string, tc?: number) {
        const search = filters.search;
        let whereClause = Prisma.sql`WHERE 1=1`;

        if (search) {
            const words = search.trim().replace(/\s+/g, ' ').split(' ');
            const searchConditions = words.map(word => {
                const term = `%${word}%`;
                return Prisma.sql`(
                    sc.idsocio ILIKE ${term} OR
                    sc.nombres ILIKE ${term} OR
                    sc.paterno ILIKE ${term} OR
                    sc.materno ILIKE ${term} OR
                    sc.numdoc ILIKE ${term} OR
                    sc.ruc ILIKE ${term}
                )`;
            });
            whereClause = Prisma.sql`WHERE ${Prisma.join(searchConditions, ' AND ')}`;
        }

        return this.prisma.$queryRaw<any[]>`
            SELECT 
                sc.*,
                COALESCE(pas.total_aportes, 0)::float AS total_aportes,
                COALESCE(pas.total_ahorros, 0)::float AS total_ahorros,
                COALESCE(pas.total_dpf, 0)::float     AS total_dpf,
                COALESCE(pre.total_prestamos, 0)::float AS total_prestamos
            FROM ctacte.socios sc
            LEFT JOIN (
                SELECT 
                    idsocio,
                    SUM(saldo_periodomn) FILTER (WHERE tipo = 'APORTE') AS total_aportes,
                    SUM(saldo_periodomn) FILTER (WHERE tipo = 'AHORRO') AS total_ahorros,
                    SUM(saldo_periodomn) FILTER (WHERE tipo = 'DPF')    AS total_dpf
                FROM consolidado.carteraxperiodo_pasivo
                WHERE periodo = ${periodo} AND saldo_periodomn > 0
                GROUP BY idsocio
            ) pas ON pas.idsocio = sc.idsocio
            LEFT JOIN (
                SELECT 
                    idsocio,
                    SUM(saldocapitalmn) AS total_prestamos
                FROM consolidado.carteraxperiodo_prestamo
                WHERE periodo = ${periodo} AND saldocapitalmn > 0
                GROUP BY idsocio
            ) pre ON pre.idsocio = sc.idsocio
            ${whereClause}
            ORDER BY sc.idsocio ASC;
        `;
    }
}