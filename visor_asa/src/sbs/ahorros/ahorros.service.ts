import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetAhorrosFilterDto } from './dto/get-creditos-filter.dto';

@Injectable()
export class AhorrosService {
    constructor(private prisma: PrismaService) { }

    private buildWhereCondition(search?: string, moneda?: string) {
        const where: any = {};
        if (search) {
            where.OR = [
                { idsocioc: { contains: search, mode: 'insensitive' } }, // Usando idsocioc                
                { cuenta: { contains: search, mode: 'insensitive' } },
                { nombres: { contains: search, mode: 'insensitive' } }, // Mapeado a "nombres" que está en tu modelo de ahorros
            ];
        }
        if (moneda && moneda.trim() !== '') {
            where.moneda = Number(moneda);
        }
        return where;
    }

    private translateWhereToSql(where: any): string {
        let sqlConditions = ' WHERE 1=1';

        // Traducir el bloque OR (Buscador por texto)
        if (where.OR) {
            const searchTerms = where.OR.map((condition: any) => {
                const field = Object.keys(condition)[0];
                const value = condition[field].contains;
                // Traducimos el contains de Prisma a un ILIKE '%valor%' de PostgreSQL
                return `${field} ::TEXT ILIKE '%${value}%'`;
            });
            sqlConditions += ` AND (${searchTerms.join(' OR ')})`;
        }

        // Traducir el bloque de Moneda
        if (where.moneda !== undefined) {
            sqlConditions += ` AND moneda = ${where.moneda}`;
        }

        return sqlConditions;
    }
    async findAll(filters: GetAhorrosFilterDto) {
        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 20;
        const skip = (page - 1) * limit;

        const whereObject = this.buildWhereCondition(filters.search, filters.moneda);

        const sqlWhereClause = this.translateWhereToSql(whereObject);

        // 3. ARMAMOS LOS QUERIES INYECTANDO TU CLÁUSULA SQL GENERADA
        const dataQuery = `
      SELECT * FROM (
        SELECT idahorro AS id_tabla, cuenta, nombres, idsocioc, saldo230831, factor2023, interes2023, saldo241231, factor2024, interes2024, saldo251231, 1 AS moneda FROM sbs.saldoahorro
        UNION ALL
        SELECT idahorrome AS id_tabla, cuenta, nombres, idsocioc, saldo230831, factor23 AS factor2023, interes23 AS interes2023, saldo241231, factor24 AS factor2024, interes24 AS interes2024, saldo25 AS saldo251231, 2 AS moneda FROM sbs.saldoahorrome
      ) AS unificado
      ${sqlWhereClause}  
      ORDER BY nombres ASC
      LIMIT ${limit} OFFSET ${skip};`;

        const countQuery = `
      SELECT COUNT(*)::int AS total 
      FROM (
        SELECT cuenta, nombres, idsocioc, 1 AS moneda FROM sbs.saldoahorro
        UNION ALL
        SELECT cuenta, nombres, idsocioc, 2 AS moneda FROM sbs.saldoahorrome
      ) AS unificado
      ${sqlWhereClause};  
    `;

        // 4. EJECUCIÓN PARALELA NATIVA
        const [data, countResult] = await Promise.all([
            this.prisma.$queryRawUnsafe<any[]>(dataQuery),
            this.prisma.$queryRawUnsafe<any[]>(countQuery),
        ]);

        const total = countResult[0]?.total || 0;

        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
        };
    }

    async findParaExportar(filters: GetAhorrosFilterDto) {
        const whereObject = this.buildWhereCondition(filters.search, filters.moneda);
        const sqlWhereClause = this.translateWhereToSql(whereObject);

        const exportQuery = `
      SELECT * FROM (
        SELECT idahorro AS id_tabla, cuenta, nombres, idsocioc, saldo230831, factor2023, interes2023, saldo241231, factor2024, interes2024, saldo251231, 1 AS moneda FROM sbs.saldoahorro
        UNION ALL
        SELECT idahorrome AS id_tabla, cuenta, nombres, idsocioc, saldo230831, factor23 AS factor2023, interes23 AS interes2023, saldo241231, factor24 AS factor2024, interes24 AS interes2024, saldo25 AS saldo251231, 2 AS moneda FROM sbs.saldoahorrome
      ) AS unificado
      ${sqlWhereClause}
      ORDER BY nombres ASC;
    `;

        return this.prisma.$queryRawUnsafe<any[]>(exportQuery);
    }
}
