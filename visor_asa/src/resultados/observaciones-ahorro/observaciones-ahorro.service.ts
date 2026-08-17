import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { GetObservacionesAhorroFilterDto } from './dto/get-observacionesahorro-filter.dto';

@Injectable()
export class ObservacionesAhorroService {
    constructor(private prisma: PrismaService) { }
    private buildWhereCondition(search?: string, moneda?: string) {
        const where: any = {};
        if (search) {
            where.OR = [
                { idsocio: { contains: search, mode: 'insensitive' } }, // Usando idsocioc                
                { cuenta: { contains: search, mode: 'insensitive' } },
                { nombre: { contains: search, mode: 'insensitive' } }, // Mapeado a "nombres" que está en tu modelo de ahorros
            ];
        }
        if (moneda && moneda.trim() !== '') {
            where.moneda = (moneda);
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

        return sqlConditions;
    }
    async findAll(filters: GetObservacionesAhorroFilterDto) {
        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 20;
        const skip = (page - 1) * limit;

        const whereObject = this.buildWhereCondition(filters.search, filters.moneda);

        const sqlWhereClause = this.translateWhereToSql(whereObject);

        // 3. ARMAMOS LOS QUERIES INYECTANDO TU CLÁUSULA SQL GENERADA
        const dataQuery = `          
            SELECT * FROM(
            select CASE 
                    WHEN sbs.cuenta IS NULL THEN 'VBCOOP'
                    WHEN vbcoop.idcdp IS NULL THEN 'SBS'
                    else '-'
                END AS ubicacion,	
                COALESCE(vbcoop.idsocio, sbs.idsocioc) AS idsocio,
                COALESCE(vbcoop.nombre, sbs.nombres) AS nombre,
                COALESCE(vbcoop.idcdp, sbs.cuenta) AS cuenta,
                COALESCE(vbcoop.moneda, sbs.moneda) AS moneda, 
                COALESCE(sbs.saldo,0 )AS saldo_SBS, 
                COALESCE(vbcoop.saldo_periodomo,0 ) AS saldo_vbcoop, 
                abs(COALESCE(sbs.saldo, 0) - COALESCE(vbcoop.saldo_periodomo, 0)) AS diferencia_saldo,
                CASE 
                    WHEN sbs.cuenta IS NULL THEN 'Solo en VBCOOP (Falta en SBS)'
                    WHEN vbcoop.idcdp IS NULL THEN 'Solo en SBS (Falta en VBCOOP)'
                    else 'DIFERENCIA DE SALDO'
                END AS estado_conciliacion
            from 
            (select *
            FROM consolidado.carteraxperiodo_pasivo
            WHERE tipo = 'AHORRO' AND periodo = '202303' AND condicion='VIGENTE' ) vbcoop
            FULL OUTER JOIN (
                SELECT 'SBS' as origen, cuenta, idcdp, idsocioc, nombres, saldo230831 AS saldo, moneda    FROM (
                    SELECT *, 'S'::text AS moneda FROM sbs.saldoahorro
                    UNION ALL 
                    SELECT *, 'D'::text AS moneda FROM sbs.saldoahorrome
                ) dpf_sbs
            ) sbs ON trim(vbcoop.idsocio) = trim(sbs.idsocioc)    AND trim(sbs.idcdp) = trim(vbcoop.idcdp)    AND sbs.saldo != 0
            where  COALESCE(sbs.saldo, 0) - COALESCE(vbcoop.saldo_periodomo, 0)!=0) RESULTADO
                    ${sqlWhereClause}                      
            order by diferencia_saldo desc
          LIMIT ${limit} OFFSET ${skip};`;

        const countQuery = `
          SELECT COUNT(*)::int AS total 
          FROM (
            select CASE 
        WHEN sbs.cuenta IS NULL THEN 'VBCOOP'
        WHEN vbcoop.idcdp IS NULL THEN 'SBS'
		else '-'
        END AS ubicacion,	
        COALESCE(vbcoop.idsocio, sbs.idsocioc) AS idsocio,
        COALESCE(vbcoop.nombre, sbs.nombres) AS nombre,
        COALESCE(vbcoop.idcdp, sbs.cuenta) AS cuenta,
        COALESCE(vbcoop.moneda, sbs.moneda) AS moneda, 
        COALESCE(sbs.saldo,0 )AS saldo_SBS, 
        COALESCE(vbcoop.saldo_periodomo,0 ) AS saldo_vbcoop, 
        abs(COALESCE(sbs.saldo, 0) - COALESCE(vbcoop.saldo_periodomo, 0)) AS diferencia_saldo,
        CASE 
            WHEN sbs.cuenta IS NULL THEN 'Solo en VBCOOP (Falta en SBS)'
            WHEN vbcoop.idcdp IS NULL THEN 'Solo en SBS (Falta en VBCOOP)'
            else 'DIFERENCIA DE SALDO'
        END AS estado_conciliacion
        from 
        (select *
        FROM consolidado.carteraxperiodo_pasivo
        WHERE tipo = 'AHORRO' AND   periodo = '202303'   AND condicion='VIGENTE' ) vbcoop
        FULL OUTER JOIN (
            SELECT 'SBS' as origen, cuenta, idcdp, idsocioc, nombres, saldo230831 AS saldo, moneda    FROM (
                SELECT *, 'S'::text AS moneda FROM sbs.saldoahorro
                UNION ALL 
                SELECT *, 'D'::text AS moneda FROM sbs.saldoahorrome
            ) dpf_sbs
        ) sbs ON trim(vbcoop.idsocio) = trim(sbs.idsocioc)    AND trim(sbs.idcdp) = trim(vbcoop.idcdp)    AND sbs.saldo != 0
        where  COALESCE(sbs.saldo, 0) - COALESCE(vbcoop.saldo_periodomo, 0)!=0
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

    async findParaExportar(filters: GetObservacionesAhorroFilterDto) {
        const whereObject = this.buildWhereCondition(filters.search, filters.moneda);
        const sqlWhereClause = this.translateWhereToSql(whereObject);

        const exportQuery = `
         SELECT * FROM(
            select CASE 
                    WHEN sbs.cuenta IS NULL THEN 'VBCOOP'
                    WHEN vbcoop.idcdp IS NULL THEN 'SBS'
                    else '-'
                END AS ubicacion,	
                COALESCE(vbcoop.idsocio, sbs.idsocioc) AS idsocio,
                COALESCE(vbcoop.nombre, sbs.nombres) AS nombre,
                COALESCE(vbcoop.idcdp, sbs.cuenta) AS cuenta,
                COALESCE(vbcoop.moneda, sbs.moneda) AS moneda, 
                COALESCE(sbs.saldo,0 )AS saldo_SBS, 
                COALESCE(vbcoop.saldo_periodomo,0 ) AS saldo_vbcoop, 
                abs(COALESCE(sbs.saldo, 0) - COALESCE(vbcoop.saldo_periodomo, 0)) AS diferencia_saldo,
                CASE 
                    WHEN sbs.cuenta IS NULL THEN 'Solo en VBCOOP (Falta en SBS)'
                    WHEN vbcoop.idcdp IS NULL THEN 'Solo en SBS (Falta en VBCOOP)'
                    else 'DIFERENCIA DE SALDO'
                END AS estado_conciliacion
            from 
            (select *
            FROM consolidado.carteraxperiodo_pasivo
            WHERE tipo = 'AHORRO' AND periodo = '202605'  AND condicion='VIGENTE' ) vbcoop
            FULL OUTER JOIN (
                SELECT 'SBS' as origen, cuenta, idcdp, idsocioc, nombres, saldo230831 AS saldo, moneda    FROM (
                    SELECT *, 'S'::text AS moneda FROM sbs.saldoahorro
                    UNION ALL 
                    SELECT *, 'D'::text AS moneda FROM sbs.saldoahorrome
                ) dpf_sbs
            ) sbs ON trim(vbcoop.idsocio) = trim(sbs.idsocioc)    AND trim(sbs.idcdp) = trim(vbcoop.idcdp)    AND sbs.saldo != 0
            where  COALESCE(sbs.saldo, 0) - COALESCE(vbcoop.saldo_periodomo, 0)!=0) RESULTADO
                    ${sqlWhereClause}                      
            order by diferencia_saldo desc
        `;

        return this.prisma.$queryRawUnsafe<any[]>(exportQuery);
    }
}
