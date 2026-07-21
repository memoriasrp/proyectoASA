import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetCarterapasivosFilterDto } from './dto/get-carterapasivos-filter.dto';

@Injectable()
export class CarterapasivosService {
    constructor(private prisma: PrismaService) { }
    private buildWhereCondition(search?: string, producto?: string, periodos?: string, moneda?: string, condicion?: string) {
        const where: any = {};
        // Inicializamos un arreglo AND para unificar todos los filtros de manera limpia
        const andConditions: any[] = [];
        // 4. Filtro de Periodos
        if (periodos && periodos.trim() !== '') {
            andConditions.push({ periodo: { contains: periodos, mode: 'insensitive' } });
        }
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
        if (producto && producto.trim() !== 'TODOS') {
            andConditions.push({ tipo: { contains: producto, mode: 'insensitive' } });
        }
        // 5. Filtro de Condición
        if (condicion && condicion.trim() !== '') {
            andConditions.push({ condicion: { contains: condicion, mode: 'insensitive' } });
        }
        // Si acumulamos condiciones, se las asignamos al objeto Where final
        if (andConditions.length > 0) {
            where.AND = andConditions;
        }

        return where;
    }
    async findAll(filters: GetCarterapasivosFilterDto) {
        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 20;
        const skip = (page - 1) * limit;

        // (search, producto, desde, hasta, moneda)
        const where = this.buildWhereCondition(
            filters.search,
            filters.producto,
            filters.periodo,
            filters.moneda,
            filters.condicion
        );

        const [data, total] = await Promise.all([
            this.prisma.carteraxperiodo_pasivo.findMany({
                where,
                skip,
                take: limit,
                orderBy: [
                    { nombre: 'asc' },
                    { fecing: 'asc' },
                ]
            }),
            this.prisma.carteraxperiodo_pasivo.count({ where }),
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

    async findParaExportar(filters: GetCarterapasivosFilterDto) {
        const where = this.buildWhereCondition(
            filters.search,
            filters.producto,
            filters.periodo,
            filters.moneda,
            filters.condicion
        )
        return this.prisma.carteraxperiodo_pasivo.findMany({
            where,
            orderBy: [
                { nombre: 'asc' },
                { fecing: 'asc' }
            ]
        });
    }

    async obtenerPeriodos() {
        return this.prisma.calendario_periodos.findMany({
            orderBy: {
                periodo: 'desc',
            },
        });
    }
}
