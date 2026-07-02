import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateMenuDto } from '../../menus/dto/update-menu.dto';
import { GetPeriodosFilterDto } from './dto/get-periodos-filter.dto';

@Injectable()
export class PeriodosService {
    constructor(private readonly prisma: PrismaService) { }
    async findAll(filters: GetPeriodosFilterDto) {
        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 20;
        const skip = (page - 1) * limit;

        const [data, total] = await this.prisma.$transaction([
            this.prisma.calendario_periodos.findMany({
                skip,
                take: limit,
                orderBy: { periodo: 'desc' },
            }),
            this.prisma.calendario_periodos.count(),
        ]);

        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
        };
    }

}
