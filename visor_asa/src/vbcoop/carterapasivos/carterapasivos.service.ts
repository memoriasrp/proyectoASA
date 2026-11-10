import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetCarterapasivosFilterDto } from './dto/get-carterapasivos-filter.dto';
import { CreateTodoMovPasDto } from './dto/create-todo-mov-pas.dto';
import { Decimal } from 'decimal.js';


export interface LiquidacionPayload {
    idsocio?: string;
    idcdp: string;
    tipo: string;
    monto: number;
    fecha: string;
    idnumope: string;
    tipoliquidacion: string;
    detalle?: string;
    idusuario?: string;
}


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
        const orderByField = filters.orderBy || 'idsocio';
        const orderDir = filters.orderDir?.toLowerCase() === 'desc' ? 'desc' : 'asc';
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
                    { [orderByField]: orderDir },
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
        const orderByField = filters.orderBy || 'idsocio';
        const orderDir = filters.orderDir?.toLowerCase() === 'desc' ? 'desc' : 'asc';
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
                { [orderByField]: orderDir }
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


    async liquidarCuenta(
        idsocio: string, idcdp: string, fecha: string,
        tipoliquidacion: string, detalle: string, monto: number, idnumope: string, idUsuario: number, nombreUsuario: string) {
        const dto = new CreateTodoMovPasDto();
        const existe = await this.prisma.todo_mov_pas.findFirst({
            where: {
                idsocio,
                idcdp,
                tipo: "AHORRO"
            }
        });
        if (!existe) {
            throw new BadRequestException('No se encontró un registro de inicio ahorro para el socio y CDP proporcionados.');
        }

        // Helper ajustado para devolver Date | undefined (sin null)
        const parseFechaPrisma = (fechaInput?: string | Date | null): Date | undefined => {
            if (!fechaInput || fechaInput === '') return undefined;
            return fechaInput instanceof Date ? fechaInput : new Date(fechaInput);
        };

        // 2. I-prepare dagiti legal nga Date Objects para iti Prisma (DateTime compliant)
        const fechaMov = parseFechaPrisma(fecha) || new Date();
        const fechaApertura = parseFechaPrisma(existe.fecing);
        const fechaEmision = new Date();
        const fechaVencimiento = parseFechaPrisma(existe.fechaven);
        const fechaCancelacion = fechaMov; // Ti fecha cancellation ket isu ti fecha ti liquidacion

        dto.tipo = "AHORRO";
        dto.idcdp = idcdp;
        dto.idsocio = idsocio;
        dto.nombre = existe?.nombre ?? '';
        dto.numdoc = existe?.numdoc ?? '';
        dto.descri = existe?.descri ?? '';
        dto.moneda = existe?.moneda ?? '';
        dto.item = 0;
        dto.car_abo = 'C';
        dto.capital = monto;
        dto.interes = 0;
        dto.total = monto;
        dto.operacion = tipoliquidacion;
        dto.idnumope = idnumope;
        dto.idahorro = existe?.idahorro ?? '';
        dto.cap_original = existe?.cap_original ? existe.cap_original.toNumber() : 0;
        dto.plazo = existe?.plazo ?? 0;
        dto.tasa = existe?.tasa ? existe.tasa.toNumber() : 0;
        dto.tasaanual = existe?.tasaanual ? existe.tasaanual.toNumber() : 0;
        dto.tipsoc = existe?.tipsoc ?? 0;
        dto.natjur = existe?.natjur ?? 0;
        dto.ruc = existe?.ruc ?? '';
        dto.sexo = existe?.sexo ? existe.sexo.toNumber() : 0;
        dto.idusuario = nombreUsuario;


        dto.fecha = fechaMov;
        dto.fecing = fechaApertura;
        dto.fechaemi = fechaEmision;
        dto.fechaven = fechaVencimiento;
        dto.fechacan = fechaCancelacion;

        console.log("DTO a registrar:", dto);
        return await this.prisma.$transaction(async (prisma) => {
            const nuevoMovimiento = await prisma.todo_mov_pas.create({
                data: {
                    tipo: dto.tipo,
                    idcdp: dto.idcdp,
                    fecha: dto.fecha,
                    idnumope: dto.idnumope,
                    item: dto.item,
                    idsocio: dto.idsocio,
                    nombre: dto.nombre,
                    numdoc: dto.numdoc,
                    descri: dto.descri,
                    moneda: dto.moneda,
                    car_abo: dto.car_abo,
                    capital: new Decimal(dto.capital ?? 0),
                    interes: new Decimal(dto.interes ?? 0),
                    total: new Decimal(dto.total ?? 0),
                    operacion: dto.operacion,
                    idahorro: dto.idahorro,
                    cap_original: new Decimal(dto.cap_original ?? 0),
                    plazo: dto.plazo,
                    tasa: new Decimal(dto.tasa ?? 0),
                    tasaanual: new Decimal(dto.tasaanual ?? 0),

                    // Fechas nga addaan standard JavaScript Date Object
                    fecing: dto.fecing,
                    fechaemi: dto.fechaemi,
                    fechaven: dto.fechaven,
                    fechacan: dto.fechacan,

                    tipsoc: dto.tipsoc,
                    natjur: dto.natjur,
                    ruc: dto.ruc,
                    sexo: new Decimal(dto.sexo ?? 0),
                    idusuario: dto.idusuario,
                },
            });
            console.log("borrando registros de consolidado.carteraxperiodo_pasivo para el socio y CDP especificados...");
            await prisma.$executeRaw`
            DELETE FROM consolidado.carteraxperiodo_pasivo
            WHERE idsocio = ${dto.idsocio} 
              AND idcdp = ${dto.idcdp}  
              AND  tipo = 'AHORRO'  
              AND periodo IN (
                  SELECT prd.periodo 
                  FROM consolidado.calendario_periodos prd 
                  WHERE fecha > ${dto.fecha}::date
              );`;

            console.log("insertando nuevo saldo en consolidado.carteraxperiodo_pasivo para el socio y CDP especificados...");
            await prisma.$executeRaw`
            INSERT INTO consolidado.carteraxperiodo_pasivo
            SELECT     
                c.periodo, c.tc, c.fecha AS fecha_corte,
                cartera.tipo, cartera.idcdp, cartera.idsocio, 
                cartera.nombre, cartera.numdoc, cartera.descri, 
                cartera.moneda, cartera.cap_original AS cap_originalmo,          
                CASE WHEN cartera.moneda = 'D' THEN ROUND(cartera.cap_original * c.tc, 2) ELSE cartera.cap_original END AS cap_originalmn,     
                cartera.plazo, cartera.tasa, cartera.tasaanual, cartera.fecing, 
                cartera.totalitem, cartera.totalmov,     
                cartera.saldo_periodo AS saldo_periodomo,
                CASE WHEN cartera.moneda = 'D' THEN ROUND(cartera.saldo_periodo * c.tc, 2) ELSE cartera.saldo_periodo END AS saldo_periodomn,
                cartera.pagointeres_periodo AS pagointeres_periodomo, 
                CASE WHEN cartera.moneda = 'D' THEN ROUND(cartera.pagointeres_periodo * c.tc, 2) ELSE cartera.pagointeres_periodo END AS pagointeres_periodomn,
                cartera.fecdeposito, cartera.fecultmov, 
                CASE WHEN cartera.saldo_periodo = 0 THEN 'CANCELADO' ELSE 'VIGENTE' END AS condicion
            FROM consolidado.calendario_periodos c
            CROSS JOIN LATERAL (
                SELECT 
                    tipo, idcdp, idsocio, nombre, 
                    numdoc, descri, moneda, 
                    SUM(CASE WHEN car_abo = 'A' THEN capital ELSE capital * (-1) END) AS cap_original, 
                    plazo, tasa, tasaanual, fecing,
                    MAX(item) AS totalitem, 
                    COUNT(*) AS totalmov,
                    SUM(CASE WHEN car_abo = 'A' THEN (capital + interes) ELSE capital * (-1) END) AS saldo_periodo, 
                    SUM(interes) AS pagointeres_periodo, 
                    MIN(fecha) AS fecdeposito,
                    MAX(CASE WHEN operacion !='AJU' THEN m.fecha END) AS fecultmov
                FROM consolidado.todo_mov_pas m
                WHERE m.tipo = 'AHORRO'  AND m.idcdp = ${dto.idcdp} AND m.idsocio = ${dto.idsocio}
                  AND m.fecha <= c.fecha 
                GROUP BY tipo, idcdp, idsocio, nombre, 
                         numdoc, descri, moneda, plazo,
                         tasa, tasaanual, fecing
            ) AS cartera
            WHERE c.periodo  IN (
                  SELECT prd.periodo 
                  FROM consolidado.calendario_periodos prd 
                  WHERE fecha > ${dto.fecha}::date
              )
            ORDER BY c.periodo, cartera.idcdp, nombre;
        `;

            return nuevoMovimiento;

        }).catch((error) => {
            throw new InternalServerErrorException(
                `Error al procesar el movimiento y actualizar la cartera: ${error.message}`
            );
        });
    }
}
