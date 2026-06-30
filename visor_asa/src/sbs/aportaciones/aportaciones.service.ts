import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Ajusta la ruta a tu proyecto
import { GetAportacionesFilterDto } from './dto/get-aportaciones-filter.dto';
@Injectable()
export class AportacionesService {
    constructor(private prisma: PrismaService) { }
    private buildWhereCondition(search?: string) {
        const where: any = {};
        if (search) {
            const words = search.trim().replace(/\s+/g, ' ').split(' ');
            where.AND = words.map(word => ({
                OR: [
                    { codigo: { contains: word, mode: 'insensitive' } },
                    { socio: { contains: word, mode: 'insensitive' } }
                ]
            }));
        }
        return where;
    }
    async findAll(filters: GetAportacionesFilterDto) {
        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 20;
        const skip = (page - 1) * limit;
        const where = this.buildWhereCondition(filters.search);

        const [data, total] = await this.prisma.$transaction([
            this.prisma.aportaciones_socios.findMany({
                where,
                skip,
                take: limit,
                orderBy: { socio: 'asc' },
            }),
            this.prisma.aportaciones_socios.count({ where }),
        ]);

        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
        };
    }

    // 3. MÉTODO PARA EXPORTAR EL UNIVERSO FILTRADO (Sin skip ni take)
    async findParaExportar(filters: GetAportacionesFilterDto) {
        const where = this.buildWhereCondition(filters.search);
        return this.prisma.aportaciones_socios.findMany({
            where,
            orderBy: { codigo: 'asc' },
        });
    }
}
