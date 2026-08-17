import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetCarteradpfFilterDto } from './dto/get-carteradpf-filter.dto';
@Injectable()
export class CarteradpfService {
    constructor(private prisma: PrismaService) { }
    async findAll(filters: GetCarteradpfFilterDto) {
        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 20;
        const skip = (page - 1) * limit;

        // 3. ARMAMOS LOS QUERIES INYECTANDO TU CLÁUSULA SQL GENERADA
        const dataQuery = `
               SELECT 
                COALESCE(sbs.origen, 'VBCOOP') AS  origen,
                COALESCE(vbcoop.idsocio, sbs.idsocioc) AS idsocio,
                COALESCE(vbcoop.nombre, sbs.nombres) AS nombre,
                COALESCE(vbcoop.idcdp, sbs.cuenta) AS cuenta,
                COALESCE(vbcoop.moneda, sbs.moneda) AS moneda, 
                 COALESCE(vbcoop.saldo_periodomo, 0) - COALESCE(sbs.saldo, 0) AS diferencia_saldo,
                CASE 
                    WHEN sbs.cuenta IS NULL THEN 'Solo en VBCOOP (Falta en SBS)'
                    WHEN vbcoop.idcdp IS NULL THEN 'Solo en SBS (Falta en VBCOOP)'
                END AS estado_conciliacion
                FROM consolidado.carteraxperiodo_pasivo AS vbcoop
                FULL OUTER JOIN (
                SELECT 'SBS' as origen, cuenta, idcdp, idsocioc, nombres, saldo230831 AS saldo, moneda    FROM (
                    SELECT *, 'S'::text AS moneda FROM sbs.saldodpfmn
                    UNION ALL 
                    SELECT *, 'D'::text AS moneda FROM sbs.saldodpfme
                ) dpf_sbs
                ) sbs ON vbcoop.idsocio = sbs.idsocioc    AND sbs.idcdp = vbcoop.idcdp    AND sbs.saldo != 0
                WHERE (vbcoop.tipo = 'DPF' AND vbcoop.periodo = (select periodo from consolidado.calendario_periodos where activo)
                  AND vbcoop.saldo_periodomo != 0 AND sbs.cuenta IS NULL    )
                    OR (vbcoop.idcdp IS NULL AND sbs.saldo!=0)
                    order by cuenta, nombre
                LIMIT ${limit} OFFSET ${skip};`;

        const countQuery = `
                SELECT COUNT(*)::int AS total 
                FROM (
                 SELECT 
                COALESCE(sbs.origen, 'VBCOOP') AS origen,
                COALESCE(vbcoop.idsocio, sbs.idsocioc) AS idsocio,
                COALESCE(vbcoop.nombre, sbs.nombres) AS nombre,
                COALESCE(vbcoop.idcdp, sbs.cuenta) AS cuenta,
                COALESCE(vbcoop.moneda, sbs.moneda) AS moneda, 
                COALESCE(vbcoop.saldo_periodomo, 0) - COALESCE(sbs.saldo, 0) AS diferencia_saldo,
                CASE 
                    WHEN sbs.cuenta IS NULL THEN 'Solo en VBCOOP (Falta en SBS)'
                    WHEN vbcoop.idcdp IS NULL THEN 'Solo en SBS (Falta en VBCOOP)'
                END AS estado_conciliacion
                FROM consolidado.carteraxperiodo_pasivo AS vbcoop
                FULL OUTER JOIN (
                SELECT 'SBS' as origen, cuenta, idcdp, idsocioc, nombres, saldo230831 AS saldo, moneda    FROM (
                    SELECT *, 'S'::text AS moneda FROM sbs.saldodpfmn
                    UNION ALL 
                    SELECT *, 'D'::text AS moneda FROM sbs.saldodpfme
                ) dpf_sbs
                ) sbs ON vbcoop.idsocio = sbs.idsocioc    AND sbs.idcdp = vbcoop.idcdp    AND sbs.saldo != 0
                WHERE (vbcoop.tipo = 'DPF' AND vbcoop.periodo = '202605'  AND vbcoop.saldo_periodomo != 0 AND sbs.cuenta IS NULL    )
                OR (vbcoop.idcdp IS NULL AND sbs.saldo!=0)
                ) AS unificado; `;

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

    async findParaExportar() {
        const exportQuery = `
                SELECT 
                COALESCE(sbs.origen, 'VBCOOP') AS  origen,
                COALESCE(vbcoop.idsocio, sbs.idsocioc) AS idsocio,
                COALESCE(vbcoop.nombre, sbs.nombres) AS nombre,
                COALESCE(vbcoop.idcdp, sbs.cuenta) AS cuenta,
                COALESCE(vbcoop.moneda, sbs.moneda) AS moneda , 
                COALESCE(vbcoop.saldo_periodomo, 0) - COALESCE(sbs.saldo, 0) AS diferencia_saldo,
                CASE 
                    WHEN sbs.cuenta IS NULL THEN 'Solo en VBCOOP (Falta en SBS)'
                    WHEN vbcoop.idcdp IS NULL THEN 'Solo en SBS (Falta en VBCOOP)'
                END AS estado_conciliacion
                FROM consolidado.carteraxperiodo_pasivo AS vbcoop
                FULL OUTER JOIN (
                SELECT 'SBS' as origen, cuenta, idcdp, idsocioc, nombres, saldo230831 AS saldo, moneda    FROM (
                    SELECT *, 'S'::text AS moneda FROM sbs.saldodpfmn
                    UNION ALL 
                    SELECT *, 'D'::text AS moneda FROM sbs.saldodpfme
                ) dpf_sbs
                ) sbs ON vbcoop.idsocio = sbs.idsocioc    AND sbs.idcdp = vbcoop.idcdp    AND sbs.saldo != 0
                WHERE (vbcoop.tipo = 'DPF' AND vbcoop.periodo = '202605'  AND vbcoop.saldo_periodomo != 0 AND sbs.cuenta IS NULL    )
                    OR (vbcoop.idcdp IS NULL AND sbs.saldo!=0)
                    order by cuenta_final, nombre_final
              `;

        return this.prisma.$queryRawUnsafe<any[]>(exportQuery);
    }
}
