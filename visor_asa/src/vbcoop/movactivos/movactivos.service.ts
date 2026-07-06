import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetMovactivosFilterDto } from './dto/get-movactivos-filter.dto';


@Injectable()
export class MovactivosService {
    constructor(private prisma: PrismaService) { }
    private buildWhereCondition(search?: string, producto?: string, desde?: Date, hasta?: Date, moneda?: string) {
        const where: any = {};

        // Inicializamos un arreglo AND para unificar todos los filtros de manera limpia
        const andConditions: any[] = [];
        if (search && search.trim() !== '') {
            const words = search.trim().replace(/\s+/g, ' ').split(' ');

            const searchConditions = words.map(word => ({
                OR: [
                    { idpagare: { contains: word, mode: 'insensitive' } },
                    { idsocio: { contains: word, mode: 'insensitive' } },
                    { nombre: { contains: word, mode: 'insensitive' } },
                    { numdoc: { contains: word, mode: 'insensitive' } },
                ]
            }));

            // Empujamos las condiciones de búsqueda al AND principal
            andConditions.push(...searchConditions);
        }

        // 2. Filtro de Moneda
        if (moneda && moneda.trim() !== '') {
            andConditions.push({ moneda: moneda });
        }

        // 3. Filtro de Producto
        if (producto && producto.trim() !== '') {
            andConditions.push({ descri: { contains: producto, mode: 'insensitive' } });
        }

        // 4. Filtro por Rango de Fechas
        if (desde || hasta) {
            const fechaCondition: any = {};

            if (desde) {
                fechaCondition.gte = desde;
            }

            if (hasta) {
                // 💡 Tip PRO aplicado: Para incluir el día "hasta" completo (23:59:59.999), 
                // nos aseguramos de setearle el final del día si es un objeto Date válido
                const hastaFinDeDia = new Date(hasta);
                if (!isNaN(hastaFinDeDia.getTime())) {
                    hastaFinDeDia.setHours(23, 59, 59, 999);
                    fechaCondition.lte = hastaFinDeDia;
                } else {
                    fechaCondition.lte = hasta;
                }
            }

            andConditions.push({ fecha: fechaCondition });
        }

        // Si acumulamos condiciones, se las asignamos al objeto Where final
        if (andConditions.length > 0) {
            where.AND = andConditions;
        }

        return where;
    }

    async findAll(filters: GetMovactivosFilterDto) {
        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 20;
        const skip = (page - 1) * limit;

        // (search, producto, desde, hasta, moneda)
        const where = this.buildWhereCondition(
            filters.search,
            filters.producto,
            filters.desde,
            filters.hasta,
            filters.moneda
        );

        const [data, total] = await this.prisma.$transaction([
            this.prisma.movimientosprestamos.findMany({
                where,
                skip,
                take: limit,
                orderBy: [
                    { descri: 'asc' },
                    { nombre: 'asc' },
                    { fecha: 'asc' },
                ]
            }),
            this.prisma.movimientosprestamos.count({ where }),
        ]);

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    // 3. MÉTODO PARA EXPORTAR EL UNIVERSO FILTRADO (Sin skip ni take)
    async findParaExportar(filters: GetMovactivosFilterDto) {
        const where = this.buildWhereCondition(
            filters.search,
            filters.producto,
            filters.desde,
            filters.hasta,
            filters.moneda
        )
        return this.prisma.movimientosprestamos.findMany({
            where,
            orderBy: [
                { fecha: 'asc' },
                { nombre: 'asc' },
                { descri: 'asc' },
                { idpagare: 'asc' }
            ]
        });
    }

    async findDistinctProductos() {
        const productos = await this.prisma.movimientosprestamos.findMany({
            select: {
                descri: true,
            },
            distinct: ['descri'],
            where: {
                descri: {
                    not: null, // Evitamos que traiga valores nulos si los hay
                }
            },
            orderBy: {
                descri: 'asc', // Te los devuelve ordenados alfabéticamente
            }
        });

        // Mapeamos el arreglo de objetos para devolver un arreglo simple de strings
        return productos.map(p => p.descri);
    }
}
