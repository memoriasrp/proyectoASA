import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetDpfFilterDto } from './dto/get-dpfs-filter.dto';


@Injectable()
export class DpfService {
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
    async findAll(filters: GetDpfFilterDto) {
        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 20;
        const skip = (page - 1) * limit;

        const whereObject = this.buildWhereCondition(filters.search, filters.moneda);

        const sqlWhereClause = this.translateWhereToSql(whereObject);

        // 3. ARMAMOS LOS QUERIES INYECTANDO TU CLÁUSULA SQL GENERADA
        const dataQuery = `
          SELECT * FROM (
            SELECT *, 1 AS moneda FROM sbs.saldodpfmn
            UNION ALL
            SELECT *, 2 AS moneda FROM sbs.saldodpfme
          ) AS unificado
          ${sqlWhereClause}  
          ORDER BY nombres ASC
          LIMIT ${limit} OFFSET ${skip};`;

        const countQuery = `
          SELECT COUNT(*)::int AS total 
          FROM (
            SELECT *, 1 AS moneda FROM sbs.saldodpfmn
            UNION ALL
            SELECT *, 2 AS moneda FROM sbs.saldodpfme
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

    async findParaExportar(filters: GetDpfFilterDto) {
        const whereObject = this.buildWhereCondition(filters.search, filters.moneda);
        const sqlWhereClause = this.translateWhereToSql(whereObject);

        const exportQuery = `
          SELECT * FROM (
            SELECT *, 1 AS moneda FROM sbs.saldodpfmn
            UNION ALL
            SELECT *, 2 AS moneda FROM sbs.saldodpfme
          ) AS unificado
          ${sqlWhereClause}
          ORDER BY nombres ASC;
        `;

        return this.prisma.$queryRawUnsafe<any[]>(exportQuery);
    }
}
