import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetCarteraprestamosFilterDto } from './dto/get-carteraprestamos-filter.dto';

@Injectable()
export class CarteraprestamosService {
    constructor(private prisma: PrismaService) { }
    private buildWhereCondition(search?: string, producto?: string, periodos?: string, moneda?: string, condicion?: string, grupos?: string[]) {
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
        // 5. Filtro de Condición
        if (condicion && condicion.trim() !== '') {
            andConditions.push({ condicion: { contains: condicion, mode: 'insensitive' } });
        }
        // Si acumulamos condiciones, se las asignamos al objeto Where final
        if (andConditions.length > 0) {
            where.AND = andConditions;
        }
        // 6. Filtro de Grupos (Relación anidada: formptmo -> tipoptmo -> grupo)
        if (grupos && Array.isArray(grupos) && grupos.length > 0) {
            andConditions.push({
                formptmo: {
                    tipoptmo: {
                        grupo: {
                            in: grupos // SQL equivalente: WHERE tipoptmo.grupo IN ('GRUPO1', 'GRUPO2')
                        }
                    }
                }
            });
        }
        return where;
    }
    async findAll(filters: GetCarteraprestamosFilterDto) {
        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 20;
        const skip = (page - 1) * limit;

        // (search, producto, desde, hasta, moneda)
        const where = this.buildWhereCondition(
            filters.search,
            filters.producto,
            filters.periodo,
            filters.moneda,
            filters.condicion,
            filters.grupos
        );

        const [data, total] = await Promise.all([
            this.prisma.consolidado_carteraxperiodo_prestamo.findMany({
                where,
                skip,
                take: limit,
                orderBy: [
                    { nombre: 'asc' },
                    { fechades: 'asc' },
                ],
                include: {
                    formptmo: {
                        include: {
                            tipoptmo: true
                        }
                    }
                }
            }),
            this.prisma.consolidado_carteraxperiodo_prestamo.count({ where }),
        ]);
        const grupo = data.map(item => item.formptmo?.tipoptmo?.grupo || 'SIN GRUPO');
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            },
            grupos: Array.from(new Set(grupo))
        };
    }

    async findParaExportar(filters: GetCarteraprestamosFilterDto) {
        const where = this.buildWhereCondition(
            filters.search,
            filters.producto,
            filters.periodo,
            filters.moneda,
            filters.condicion
        )
        return this.prisma.consolidado_carteraxperiodo_prestamo.findMany({
            where,
            orderBy: [
                { nombre: 'asc' },
                { fechades: 'asc' }
            ]
        });
    }

    async obtenerPeriodos() {
        const [periodos, periodoActivoResult] = await Promise.all([
            this.prisma.calendario_periodos.findMany({
                orderBy: { periodo: 'desc' },
            }),
            this.prisma.calendario_periodos.findFirst({
                where: { activo: true },
                select: { periodo: true },
                orderBy: { periodo: 'desc' },
            }),
        ]);

        const periodoActivo = periodoActivoResult?.periodo || null;

        // Trae únicamente los tipos de préstamo que existen en el período activo
        const tiposDisponibles = await this.prisma.tipoptmo.findMany({
            where: {
                formptmo: {
                    some: {
                        carteraxperiodo_prestamo: {
                            some: {
                                periodo: periodoActivo!,
                                condicion: 'VIGENTE'
                            },
                        },
                    },
                },
            },
            select: {
                grupo: true,
            },
            distinct: ['grupo'],
        });

        // Extrae el resultado a un array simple de strings (ej: ['CONVENIOS', 'MEDIANAS EMPRESAS'])
        const gruposDisponibles = tiposDisponibles
            .map(item => item.grupo)
            .filter((grupo): grupo is string => Boolean(grupo));

        const productos = await this.prisma.formptmo.findMany({
            orderBy: {
                descri: 'asc',
            },
        });
        return {
            periodos: periodos,
            gruposDisponibles: gruposDisponibles
        };
    }
}
