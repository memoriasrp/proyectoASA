import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';


export interface CuotaCronograma {
    orden: number;
    fecha: Date;
    capital: number;
    interes: number;
    seguro: number;
    previsionSocial: number;
    cuota: number;
    saldo: number;
    aporte: number;
    estado: string;
}
export interface InteresPorAno {
    ano: number;
    dias: number;
    interes: number;
    mora: number;
    desde: string; // Para auditoría/verificación en formato YYYY-MM-DD
    hasta: string;
}
@Injectable()
export class CronogramaService {

    constructor(private prisma: PrismaService) { }

    async generarCronograma(idpagare: string, fechaConsultaStr?: string) {
        const fechaConsulta = new Date();

        const pagare = await this.prisma.pagares.findFirst({
            where: { idpagare },

        });

        if (!pagare) throw new NotFoundException('Pagaré no encontrado');
        const socio = await this.prisma.socios.findFirst({
            where: { idsocio: pagare.idsocio! },
        });
        // 1. Evaluar Reprogramación (si aplica según fecha de consulta)
        const esReprogramado =
            !!pagare.fecha_repr &&
            new Date(pagare.fecha_repr) <= fechaConsulta;

        const datosPlan = {
            importe: Number(esReprogramado ? pagare.importe_re : pagare.importe),
            fechaEmi: esReprogramado ? pagare.fecha_repr! : pagare.fechaemi!,
            // tasa: Number(
            //     esReprogramado
            //         ? pagare.tasa_repro
            //         : pagare.formapago === 2 && pagare.tasaplan
            //             ? pagare.tasaplan
            //             : pagare.tasa,
            // ),
            tasa: Number(pagare.tasa),
            diaFijo: Number(esReprogramado ? pagare.diafijo_re : pagare.diafijo || 0),
            plazo: Number(esReprogramado ? pagare.plazo_repr : pagare.plazo),
            cuota: Number(esReprogramado ? pagare.cuota_repr : pagare.cuota || 0),
            aporte: Number(pagare.aporte || 0),
            tasaseguro: Number(pagare.tasaseguro || 0),
            prevsoc: Number(pagare.prevsoc || 0),
            uplazo: Number(pagare.uplazo || 0),
            perpago: Number(pagare.perpago || 1),
            formacalculo: Number(pagare.calculo || 1),
            gracia: Number(pagare.gracia || 0),
            mesgracia: Number(pagare.mesgracia || 0),
            formapago: Number(pagare.formapago || 1),
        };

        // 2. Acumular Amortizaciones Pagadas desde el Histórico
        const movimientos = await this.prisma.hpagares.findMany({
            where: {
                idpagare,
                fecha: { lte: fechaConsulta },
            }, orderBy: { fecha: 'asc' },
        });
        const mov = await this.prisma.movimientosprestamos.findMany({
            where: {
                idpagare,
                fecha: { lte: fechaConsulta },
                car_abo: 'A', // Solo abonos
            }, orderBy: { fecha: 'asc' },
        });
        const movsConCapital = mov.filter(m => Number(m.capital) !== 0);

        // 2. Obtenemos la fecha del último abono válido o la fecha de emisión si no hay registros
        const fechaUltimoAbono = movsConCapital.length > 0
            ? new Date(movsConCapital[movsConCapital.length - 1].fecha)
            : datosPlan.fechaEmi;
        let capitalPagado = 0;
        for (const mov of movimientos) {
            if (esReprogramado && mov.fecha && new Date(mov.fecha) <= new Date(datosPlan.fechaEmi)) {
                continue; // Omite abonos anteriores a la fecha de reprogramación
            }
            capitalPagado += Number(mov.capital || 0) * (mov.car_abo === 'A' ? 1 : -1); //
        }

        // 3. Generación del Cronograma
        const cuotas = this.ejecutarCronoPagare({
            ...datosPlan,
            capitalPagado,
        });
        const tea = Number((((Math.pow(1 + (datosPlan.tasa / 100), 12) - 1) * 100)).toFixed(2));

        const deuda = this.calcularInteresPorAnos(fechaUltimoAbono, fechaConsulta, datosPlan.importe - capitalPagado, tea, 40);
        return {
            cabecera: {
                idpagare: pagare.idpagare,
                idsocio: pagare.idsocio,
                nombre: socio?.nombres,
                estado: esReprogramado ? 'REPROGRAMADO' : 'NORMAL', //[cite: 1]
                importe: datosPlan.importe,
                tasa: datosPlan.tasa,
                plazo: datosPlan.plazo,
                moneda: pagare.moneda === 1 ? 'Soles' : 'Dólares', //[cite: 1]
                fechaEmi: datosPlan.fechaEmi,
                fechaUltimoAbono: fechaUltimoAbono,
                tea: tea,
            },
            cronograma: cuotas,
            movimientos: mov,
            deuda: deuda,
        };
    }

    // REPLICACIÓN DE FUNCIONES MATEMÁTICAS DE FOXPRO

    private diasPeriodo(perpago: number, uplazo: number, plazo: number): number {
        if (uplazo === 1) {
            if (perpago === 1) return 30; //[cite: 1]
            if (perpago === 2) return 15; //[cite: 1]
            if (perpago === 3) return 7; //[cite: 1]
            if (perpago === 4) return 1; //[cite: 1]
        }
        if (perpago === 5) return 60; // Bimensual[cite: 1]
        if (perpago === 6) return 90; // Trimestral[cite: 1]
        return 30;
    }

    private plazoPagare(plazo: number, perpago: number, uplazo: number): number {
        if (uplazo === 1) {
            if (perpago === 1) return 1 * plazo; //[cite: 1]
            if (perpago === 2) return 2 * plazo; //[cite: 1]
            if (perpago === 3) return 4 * plazo; //[cite: 1]
            if (perpago === 4) return 30 * plazo; //[cite: 1]
        }
        return plazo;
    }

    private tasaPeriodo(tasa: number, perpago: number, uplazo: number, plazo: number): number {
        const i = tasa / 100;
        const n = this.diasPeriodo(perpago, uplazo, plazo);
        const wtasaDia = Math.pow(1 + i, 1 / 30) - 1; // Equivalente a ((1+i)**(1/30))-1[cite: 1]
        const wtasa = Math.pow(1 + wtasaDia, n) - 1;
        return Number(wtasa.toFixed(6)); // ROUND(wtasa, 6)[cite: 1]
    }

    private factorCuota(tasa: number, plazo: number, perpago: number, uplazo: number): number {
        const n = this.plazoPagare(plazo, perpago, uplazo);
        const i = this.tasaPeriodo(tasa, perpago, uplazo, plazo);
        if (i === 0) return 0;
        const w = Math.pow(1 + i, n);
        const wfactor = (i * w) / (w - 1);
        return Number(wfactor.toFixed(6)); // ROUND(w, 6)[cite: 1]
    }

    private intAlRebatir(saldo: number, tasa: number, dias: number): number {
        const tint = tasa / 100;
        const wtasadia = Math.pow(1 + tint, 1 / 30) - 1; //[cite: 1]
        const wtasaper = Math.pow(1 + wtasadia, dias) - 1; //[cite: 1]
        return Number((saldo * wtasaper).toFixed(2)); //[cite: 1]
    }

    private ejecutarCronoPagare(p: any): CuotaCronograma[] {
        const cuotas: CuotaCronograma[] = [];

        const tasasuma = p.tasa + p.tasaseguro;
        const wfactor = p.tasa ? this.factorCuota(tasasuma, p.plazo - p.mesgracia, p.perpago, p.uplazo) : 0; //[cite: 1]
        const n = this.plazoPagare(p.plazo, p.perpago, p.uplazo); //[cite: 1]

        let wcuota = p.cuota
            ? p.cuota
            : p.tasa
                ? Number((p.importe * wfactor).toFixed(2))
                : Number((p.importe / n).toFixed(2)); //[cite: 1]

        let wsaldo = p.importe;
        let wsaldocalculo = p.importe;
        let capitalAcumuladoPagado = p.capitalPagado;
        const wperiodo = this.diasPeriodo(p.perpago, p.uplazo, p.plazo);

        let wtemfecha = new Date(p.fechaEmi);

        for (let k = 1; k <= n; k++) {
            if (wsaldo <= 0) break; //[cite: 1]

            // Avance de fecha
            wtemfecha.setDate(wtemfecha.getDate() + wperiodo);

            // Cálculo de Interés y Seguro[cite: 1]
            const winteres = this.intAlRebatir(wsaldocalculo, p.tasa, wperiodo);
            const wseguro = this.intAlRebatir(wsaldocalculo, p.tasaseguro, wperiodo);

            let wcapital = 0;
            if (k > p.mesgracia) {
                if (wcuota - winteres - wseguro >= 0) {
                    wcapital = wcuota - winteres - wseguro; //[cite: 1]
                }
            }

            if (wsaldo >= wcapital) {
                wsaldo -= wcapital;
            } else {
                wcapital = wsaldo;
                wsaldo = 0; //[cite: 1]
            }

            if (k === n && wsaldo > 0) {
                wcapital += wsaldo;
                wsaldo = 0; // Ajuste última cuota[cite: 1]
            }

            wsaldocalculo -= wcapital;

            // Estado de cancelación según capitalPagado[cite: 1]
            let estado = 'PEND';
            if (capitalAcumuladoPagado > 0 && wcapital > 0) {
                if (capitalAcumuladoPagado >= wcapital) {
                    capitalAcumuladoPagado -= wcapital;
                    estado = 'PAG'; // Corresponde a 'C' en FoxPro[cite: 1]
                } else {
                    capitalAcumuladoPagado = 0;
                }
            }

            const totalCuota = wcapital + winteres + wseguro + p.aporte + p.prevsoc; //[cite: 1]

            cuotas.push({
                orden: k,
                fecha: new Date(wtemfecha),
                capital: Number(wcapital.toFixed(2)),
                interes: Number(winteres.toFixed(2)),
                seguro: Number(wseguro.toFixed(2)),
                previsionSocial: Number(p.prevsoc.toFixed(2)),
                cuota: Number(totalCuota.toFixed(2)),
                saldo: Number(Math.max(0, wsaldo).toFixed(2)),
                aporte: Number(p.aporte.toFixed(2)),
                estado,
            });
        }

        return cuotas;
    }


    private calcularInteresPorAnos(fechaUltimoAbono: Date, fechaConsulta: Date, saldoCapital: number, tasaMensual: number, tasaMor: number): InteresPorAno[] {
        const resultado: InteresPorAno[] = [];

        const anoInicio = fechaUltimoAbono.getFullYear();
        const anoFin = fechaConsulta.getFullYear();

        // Fecha límite superior: Último día del mes anterior a la fecha de consulta
        // (Ej: Si fechaConsulta es Agosto 2026, el tope es 31 de Julio 2026)
        const fechaLimiteFinal = fechaConsulta;
        // new Date(Date.UTC(fechaConsulta.getFullYear(), fechaConsulta.getMonth(), 0)        );

        // Si la fecha del último abono es posterior al tope del mes anterior, no hay periodos que calcular
        if (fechaUltimoAbono > fechaLimiteFinal) {
            return resultado;
        }

        // Tasa diaria al rebatir
        const tint = tasaMensual / 100;
        const tmor = tasaMor / 100;
        const tasaDia = Math.pow(1 + tint, 1 / 30) - 1;

        for (let ano = anoInicio; ano <= anoFin; ano++) {
            let inicioRango: Date;
            let finRango: Date;

            // 1. Determinar inicio del periodo para este año
            if (ano === anoInicio) {
                inicioRango = new Date(fechaUltimoAbono);
            } else {
                inicioRango = new Date(Date.UTC(ano, 0, 1)); // 1 de enero
            }

            // 2. Determinar fin del periodo para este año
            if (ano === anoFin) {
                finRango = new Date(fechaLimiteFinal);
            } else {
                finRango = new Date(Date.UTC(ano, 11, 31)); // 31 de diciembre
            }

            // Validar si el rango generado es válido
            if (inicioRango <= finRango) {
                // Diferencia exacta en días
                const diffTime = finRango.getTime() - inicioRango.getTime();
                const dias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                console.log(`Diferencia en días: ${dias}`);

                if (dias > 0) {
                    // Interés al rebatir exponencial
                    const interes = Number(((Math.pow((1 + tint), dias / 360) - 1) * saldoCapital).toFixed(2));
                    const mora = Number(((Math.pow((1 + tmor), dias / 360) - 1) * saldoCapital).toFixed(2));

                    resultado.push({
                        ano,
                        dias,
                        interes,
                        mora,
                        desde: inicioRango.toISOString().split('T')[0],
                        hasta: finRango.toISOString().split('T')[0],
                    });
                }
            }
        }

        return resultado;
    }
}
