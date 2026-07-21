import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { GetListaSeguimientoFilterDto } from './dto/get-listaseguimiento-filter.dto';

@Injectable()
export class ListaSeguimientoService {
    constructor(private prisma: PrismaService) { }
    private buildWhereCondition(search?: string) {
        const where: any = {};
        if (search) {
            where.OR = [
                { idsocio: { contains: search, mode: 'insensitive' } }, // Usando idsocioc                
                { numdoc: { contains: search, mode: 'insensitive' } },
                { nombres: { contains: search, mode: 'insensitive' } }, // Mapeado a "nombres" que está en tu modelo de ahorros
                { paterno: { contains: search, mode: 'insensitive' } }, // Mapeado a "nombres" que está en tu modelo de ahorros
                { materno: { contains: search, mode: 'insensitive' } }, // Mapeado a "nombres" que está en tu modelo de ahorros
            ];
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
        return sqlConditions;
    }
    async findAll(filters: GetListaSeguimientoFilterDto) {
        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 20;
        const skip = (page - 1) * limit;

        const whereObject = this.buildWhereCondition(filters.search);

        const sqlWhereClause = this.translateWhereToSql(whereObject);

        // 3. ARMAMOS LOS QUERIES INYECTANDO TU CLÁUSULA SQL GENERADA
        const dataQuery = `     
       SELECT * FROM (
        SELECT sg.idsocio,  sc.paterno ,sc.materno , sc.nombres , 
        sc.numdoc,sc.ruc,count(*)::INTEGER as tot_registros, min(fecha) as primer_registro, max(fecha) as ult_registro
            FROM consolidado.seguimiento sg 
            INNER JOIN ctacte.socios SC ON sg.idsocio=sc.idsocio
            group by sg.idsocio,  sc.paterno ,sc.materno , sc.nombres , 
        sc.numdoc,sc.ruc
        )  AS unificado  ${sqlWhereClause}           
           ORDER BY 2,3,4
                  LIMIT ${limit} OFFSET ${skip};`;

        const countQuery = `
                  SELECT COUNT(*)::int AS total 
                  FROM (                
                    SELECT sg.idsocio,  sc.paterno ,sc.materno , sc.nombres , 
                    sc.numdoc,sc.ruc,count(*)::INTEGER as tot_registros, min(fecha) as primer_registro, max(fecha) as ult_registro
                        FROM consolidado.seguimiento sg 
                        INNER JOIN ctacte.socios SC ON sg.idsocio=sc.idsocio
                        group by sg.idsocio,  sc.paterno ,sc.materno , sc.nombres , 
                    sc.numdoc,sc.ruc
                    )  AS unificado
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

    async findParaExportar(filters: GetListaSeguimientoFilterDto) {
        const whereObject = this.buildWhereCondition(filters.search);
        const sqlWhereClause = this.translateWhereToSql(whereObject);

        const exportQuery = `
                  Select * from (
                    SELECT sg.idsocio,  sc.paterno ,sc.materno , sc.nombres , 
        sc.numdoc,sc.ruc,count(*)::INTEGER as tot_registros, min(fecha) as primer_registro, max(fecha) as ult_registro
            FROM consolidado.seguimiento sg 
            INNER JOIN ctacte.socios SC ON sg.idsocio=sc.idsocio
            group by sg.idsocio,  sc.paterno ,sc.materno , sc.nombres , 
        sc.numdoc,sc.ruc
        )  AS unificado   ${sqlWhereClause}                      
                    order by 2,3,4
                `;

        return this.prisma.$queryRawUnsafe<any[]>(exportQuery);
    }
}
