import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetCreditosFilterDto } from './dto/get-creditos-filter.dto';
@Injectable()
export class CreditosService {
    constructor(private prisma: PrismaService) { }
    private buildWhereCondition(search?: string, moneda?: string) {
        const where: any = {};
        if (search) {
            where.OR = [
                { idsocio: { contains: search, mode: 'insensitive' } },
                { idpagare: { contains: search, mode: 'insensitive' } },
                { socio: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (moneda && moneda.trim() !== '') {
            where.moneda = Number(moneda);
        }
        return where;
    }
    async findAll(filters: GetCreditosFilterDto) {
        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 20;
        const skip = (page - 1) * limit;
        const where = this.buildWhereCondition(filters.search, filters.moneda);

        const [data, total] = await this.prisma.$transaction([
            this.prisma.saldoprestamo.findMany({
                where,
                skip,
                take: limit,
                orderBy: { socio: 'asc' },
            }),
            this.prisma.saldoprestamo.count({ where })
        ]);
        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
        };
    }

    async findParaExportar(filters: GetCreditosFilterDto) {
        const where = this.buildWhereCondition(filters.search, filters.moneda);
        return this.prisma.saldoprestamo.findMany({
            where,
            orderBy: { socio: 'asc' },
        });
    }

}
