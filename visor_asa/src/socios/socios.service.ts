import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ajusta la ruta a tu PrismaService
import { GetSociosFilterDto } from './dto/get-socios-filter.dto';

@Injectable()
export class SociosService {
    constructor(private prisma: PrismaService) { }
    async findAll(filters: GetSociosFilterDto) {
        const page = filters.page || 1;
        const limit = filters.limit || 20;
        const skip = (page - 1) * limit;
        const search = filters.search;

        const where: any = {};

        if (search) {
            const words = search.trim().replace(/\s+/g, ' ').split(' ');

            // 2. Cada palabra introducida debe coincidir con AL MENOS uno de los campos principales
            where.AND = words.map(word => ({
                OR: [
                    { idsocio: { contains: word, mode: 'insensitive' } },
                    { nombres: { contains: word, mode: 'insensitive' } },
                    { paterno: { contains: word, mode: 'insensitive' } },
                    { materno: { contains: word, mode: 'insensitive' } },
                    { numdoc: { contains: word, mode: 'insensitive' } },
                    { ruc: { contains: word, mode: 'insensitive' } },
                ]
            }));
        }

        const [data, total] = await this.prisma.$transaction([
            this.prisma.socios.findMany({
                where,
                skip,
                take: limit,
                orderBy: { idsocio: 'asc' },
            }),
            this.prisma.socios.count({ where }),
        ]);

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
    async AllExport(filters: GetSociosFilterDto) {
        const search = filters.search;

        const where: any = {};

        if (search) {
            const words = search.trim().replace(/\s+/g, ' ').split(' ');

            // 2. Cada palabra introducida debe coincidir con AL MENOS uno de los campos principales
            where.AND = words.map(word => ({
                OR: [
                    { idsocio: { contains: word, mode: 'insensitive' } },
                    { nombres: { contains: word, mode: 'insensitive' } },
                    { paterno: { contains: word, mode: 'insensitive' } },
                    { materno: { contains: word, mode: 'insensitive' } },
                    { numdoc: { contains: word, mode: 'insensitive' } },
                    { ruc: { contains: word, mode: 'insensitive' } },
                ]
            }));
        }

        return this.prisma.socios.findMany({
            where,
            orderBy: { idsocio: 'asc' }, // Mantiene el orden por código de socio
        });
    }
}