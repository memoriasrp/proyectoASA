import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { GetObservacionesPrestamoFilterDto } from './dto/get-observacionesprestamo-filter.dto';

@Injectable()
export class ObservacionesPrestamoService {
    constructor(private prisma: PrismaService) { }
    private buildWhereCondition(search?: string, moneda?: string, excluirCastigados?: string, excluirFalsificados?: string) {
        const where: any = {};
        if (search) {
            where.OR = [
                { idsocio: { contains: search, mode: 'insensitive' } }, // Usando idsocioc                
                { idpagare: { contains: search, mode: 'insensitive' } },
                { nombre: { contains: search, mode: 'insensitive' } }, // Mapeado a "nombres" que está en tu modelo de ahorros
            ];
        }
        if (moneda && moneda.trim() !== '') {
            where.moneda = (moneda);
        }
        if (excluirCastigados == "true") {
            where.descri = 'Castigados';
        }
        if (excluirFalsificados == 'true') {
            where.descriFalsificado = 'Falsificados';
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
            sqlConditions += ` AND moneda = '${where.moneda}'`;
        }
        if (where.descri != undefined) {
            sqlConditions += ` AND descri NOT ILIKE '%${where.descri}%'`;

        }
        if (where.descriFalsificado != undefined) {
            sqlConditions += ` AND descri NOT ILIKE '%${where.descriFalsificado}%'`;

        }
        return sqlConditions;
    }
    async findAll(filters: GetObservacionesPrestamoFilterDto) {
        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 20;
        const skip = (page - 1) * limit;

        const whereObject = this.buildWhereCondition(filters.search, filters.moneda, filters.excluirCastigados, filters.excluirFalsificados);

        const sqlWhereClause = this.translateWhereToSql(whereObject);

        // 3. ARMAMOS LOS QUERIES INYECTANDO TU CLÁUSULA SQL GENERADA
        const dataQuery = `          
               Select * from (
                select vbcoop.idpagare,  vbcoop.idsocio,  vbcoop. nombre , descri, 
                vbcoop.moneda,desembolso,fechades, saldocapitalmo, coalesce(saldo251231,coalesce(saldo2025, coalesce(saldo241231, coalesce(saldo,0)))) as saldosbs,
                abs(saldocapitalmo- coalesce(saldo251231,coalesce(saldo2025, coalesce(saldo241231, coalesce(saldo,0))))) as diferencia
                from consolidado.carteraxperiodo_prestamo vbcoop
                FULL OUTER JOIN sbs.saldoprestamo sbs on sbs.idpagare=vbcoop.idpagare and sbs.idsocioc=vbcoop.idsocio
                where periodo = '202605'  AND condicion='VIGENTE' 
                and saldocapitalmo- coalesce(saldo251231,coalesce(saldo2025, coalesce(saldo241231, coalesce(saldo,0))))!=0) Resultado                
                        ${sqlWhereClause}                      
                order by diferencia desc
              LIMIT ${limit} OFFSET ${skip};`;

        const countQuery = `
              SELECT COUNT(*)::int AS total 
              FROM (                
                select vbcoop.idpagare,  vbcoop.idsocio,  vbcoop. nombre , descri, 
                vbcoop.moneda,desembolso,fechades, saldocapitalmo, coalesce(saldo251231,coalesce(saldo2025, coalesce(saldo241231, coalesce(saldo,0)))) as saldosbs,
                abs(saldocapitalmo- coalesce(saldo251231,coalesce(saldo2025, coalesce(saldo241231, coalesce(saldo,0))))) as diferencia
                from consolidado.carteraxperiodo_prestamo vbcoop
                FULL OUTER JOIN sbs.saldoprestamo sbs on sbs.idpagare=vbcoop.idpagare and sbs.idsocioc=vbcoop.idsocio
                where periodo = '202605'  AND condicion='VIGENTE' 
                and saldocapitalmo- coalesce(saldo251231,coalesce(saldo2025, coalesce(saldo241231, coalesce(saldo,0))))!=0  
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

    async findParaExportar(filters: GetObservacionesPrestamoFilterDto) {
        const whereObject = this.buildWhereCondition(filters.search, filters.moneda, filters.excluirCastigados, filters.excluirFalsificados);
        const sqlWhereClause = this.translateWhereToSql(whereObject);

        const exportQuery = `
              Select * from (
                select vbcoop.idpagare,  vbcoop.idsocio,  vbcoop. nombre , descri, 
                vbcoop.moneda,desembolso,fechades, saldocapitalmo, coalesce(saldo251231,coalesce(saldo2025, coalesce(saldo241231, coalesce(saldo,0)))) as saldosbs,
                abs(saldocapitalmo- coalesce(saldo251231,coalesce(saldo2025, coalesce(saldo241231, coalesce(saldo,0))))) as diferencia
                from consolidado.carteraxperiodo_prestamo vbcoop
                FULL OUTER JOIN sbs.saldoprestamo sbs on sbs.idpagare=vbcoop.idpagare and sbs.idsocioc=vbcoop.idsocio
                where periodo = '202605'  AND condicion='VIGENTE' 
                and saldocapitalmo- coalesce(saldo251231,coalesce(saldo2025, coalesce(saldo241231, coalesce(saldo,0))))!=0) Resultado                
                        ${sqlWhereClause}                      
                order by diferencia desc
            `;

        return this.prisma.$queryRawUnsafe<any[]>(exportQuery);
    }
}
