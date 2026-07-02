import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetMovpasivosFilterDto } from './dto/get-movpasivos-filter.dto';

@Injectable()
export class MovpasivosService {
    constructor(private prisma: PrismaService) { }
    private buildWhereCondition(search?: string, producto?: string, desde?: Date, hasta?: Date, moneda?: string) {
        const where: any = {};

        // Inicializamos un arreglo AND para unificar todos los filtros de manera limpia
        const andConditions: any[] = [];

        // 1. Filtro dinámico por palabras (Buscador avanzado)
        if (search && search.trim() !== '') {
            const words = search.trim().replace(/\s+/g, ' ').split(' ');

            const searchConditions = words.map(word => ({
                OR: [
                    { idcdp: { contains: word, mode: 'insensitive' } },
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
            andConditions.push({ tipo: { contains: producto, mode: 'insensitive' } });
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
    async findAll(filters: GetMovpasivosFilterDto) {
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
            this.prisma.todo_mov_pas.findMany({
                where,
                skip,
                take: limit,
                orderBy: [
                    { tipo: 'asc' },
                    { nombre: 'asc' },
                    { idcdp: 'asc' },
                    { fecha: 'asc' },
                ]
            }),
            this.prisma.todo_mov_pas.count({ where }),
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
    async findParaExportar(filters: GetMovpasivosFilterDto) {
        const where = this.buildWhereCondition(
            filters.search,
            filters.producto,
            filters.desde,
            filters.hasta,
            filters.moneda
        )
        return this.prisma.todo_mov_pas.findMany({
            where,
            orderBy: [
                { fecha: 'asc' },
                { nombre: 'asc' },
                { tipo: 'asc' },
                { idcdp: 'asc' }
            ]
        });
    }
}
