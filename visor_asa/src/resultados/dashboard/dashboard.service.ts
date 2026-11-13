import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DashboardResumenDto } from './dto/dashboard-resumen.dto';
@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) { }
async getResumenDashboard(): Promise<DashboardResumenDto> {
    try {
        const periodoActivoObj = await this.prisma.calendario_periodos.findFirst({
            where: { activo: true }
        });

        const periodoActivo = periodoActivoObj?.periodo || '';
        // Convertimos el Decimal de Prisma a number de JavaScript
        const tipoCambio = Number(periodoActivoObj?.tc) || 1.00;

        const ahora = new Date();
        const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
        
        const inicioSemana = new Date(ahora);
        const diaSemana = ahora.getDay() || 7; // Lunes como inicio
        inicioSemana.setDate(ahora.getDate() - diaSemana + 1);
        inicioSemana.setHours(0, 0, 0, 0);

        // 3. Ejecutar TODAS las consultas en paralelo para máximo rendimiento
        const [
            resumenPasivos,
            resumenPrestamos,
            totalSeguimientos,
            seguimientosMes,
            seguimientosSemana,
            saldosInicialesAhorroMN,
            saldosInicialesAhorroME,
            saldosInicialesDPFMN,
            saldosInicialesDPFME,
            saldosInicialesPrestamo
        ] = await Promise.all([
            // Pasivos (Ahorros y DPF) en el periodo activo
            this.prisma.carteraxperiodo_pasivo.groupBy({
                by: ['tipo', 'moneda'],
                _sum: {
                    saldo_periodomn: true,
                    saldo_periodomo: true,
                },
                _count: {
                    idcdp: true,
                },
                where: {
                    periodo: periodoActivo,
                    condicion: 'VIGENTE',
                },
            }),

            // Préstamos en el periodo activo
            this.prisma.consolidado_carteraxperiodo_prestamo.groupBy({
                by: ['moneda'],
                _sum: {
                    saldocapitalmn: true,
                    saldocapitalmo: true,
                },
                _count: {
                    idpagare: true,
                },
                where: {
                    periodo: periodoActivo,
                    condicion: 'VIGENTE',
                },
            }),

            // Conteo de Seguimientos
            this.prisma.seguimiento.count(),
            this.prisma.seguimiento.count({ where: { fecha: { gte: inicioMes } } }),
            this.prisma.seguimiento.count({ where: { fecha: { gte: inicioSemana } } }),

            // Saldos iniciales SBS (en paralelo)
            this.prisma.saldoahorro.aggregate({
                _sum: { saldo230831: true },
                _count: { _all: true },
            }),
            this.prisma.saldoahorrome.aggregate({
                _sum: { saldo230831: true },
                _count: { _all: true },
            }),
            this.prisma.saldodpfmn.aggregate({
                _sum: { saldo230831: true },
                _count: { _all: true },
            }),
            this.prisma.saldodpfme.aggregate({
                _sum: { saldo230831: true },
                _count: { _all: true },
            }),
            this.prisma.saldoprestamo.groupBy({
                by: ['moneda'],
                _sum: { saldo: true },
                _count: { _all: true },
            }),
        ]);

        // 4. Mapeo de Saldos Actuales (Periodo Activo)
        
        // Ahorros
        const ahorrosSoles = resumenPasivos.find((p) => p.tipo === 'AHORRO' && p.moneda === 'S');
        const ahorrosDolares = resumenPasivos.find((p) => p.tipo === 'AHORRO' && p.moneda === 'D');

        const cantAhorroMN = ahorrosSoles?._count?.idcdp || 0;
        const cantAhorroME = ahorrosDolares?._count?.idcdp || 0;
        const saldoAhorroMN = Number(ahorrosSoles?._sum?.saldo_periodomn || 0);
        const saldoAhorroME = Number(ahorrosDolares?._sum?.saldo_periodomo || 0);

        // DPF
        const dpfSoles = resumenPasivos.find((p) => p.tipo === 'DPF' && p.moneda === 'S');
        const dpfDolares = resumenPasivos.find((p) => p.tipo === 'DPF' && p.moneda === 'D');

        const cantDpfMN = dpfSoles?._count?.idcdp || 0;
        const cantDpfME = dpfDolares?._count?.idcdp || 0;
        const totalDpfMN = Number(dpfSoles?._sum?.saldo_periodomn || 0);
        const totalDpfME = Number(dpfDolares?._sum?.saldo_periodomo || 0);

        // Préstamos
        const prestamosSoles = resumenPrestamos.find((p) => p.moneda === 'S');
        const prestamosDolares = resumenPrestamos.find((p) => p.moneda === 'D');

        const cantPrestamoMN = prestamosSoles?._count?.idpagare || 0;
        const cantPrestamoME = prestamosDolares?._count?.idpagare || 0;
        const totalPrestamoMN = Number(prestamosSoles?._sum?.saldocapitalmn || 0);
        const totalPrestamoME = Number(prestamosDolares?._sum?.saldocapitalmo || 0);

        // 5. Mapeo de Saldos Iniciales SBS (Consolidando Soles + Dólares convertidos con TC)

        // Inicial Ahorros
        const cantIniAhorro = (saldosInicialesAhorroMN._count._all || 0) + (saldosInicialesAhorroME._count._all || 0);
        const montoIniAhorroMN = Number(saldosInicialesAhorroMN._sum.saldo230831 || 0);
        const montoIniAhorroME = Number(saldosInicialesAhorroME._sum.saldo230831 || 0);
        const saldoInicialAhorroTotal = montoIniAhorroMN + (montoIniAhorroME * tipoCambio);

        // Inicial DPF
        const cantIniDpf = (saldosInicialesDPFMN._count._all || 0) + (saldosInicialesDPFME._count._all || 0);
        const montoIniDpfMN = Number(saldosInicialesDPFMN._sum.saldo230831 || 0);
        const montoIniDpfME = Number(saldosInicialesDPFME._sum.saldo230831 || 0);
        const totalInicialDpf = montoIniDpfMN + (montoIniDpfME * tipoCambio);

        // Inicial Préstamos (GroupBy moneda 'S' y 'D')
        const iniPrestamoSoles = saldosInicialesPrestamo.find((p) => p.moneda === 1);
        const iniPrestamoDolares = saldosInicialesPrestamo.find((p) => p.moneda ===2);

        const cantIniPrestamo = (iniPrestamoSoles?._count?._all || 0) + (iniPrestamoDolares?._count?._all || 0);
        const montoIniPrestamoMN = Number(iniPrestamoSoles?._sum?.saldo || 0);
        const montoIniPrestamoME = Number(iniPrestamoDolares?._sum?.saldo || 0);
        const totalInicialPrestamo = montoIniPrestamoMN + (montoIniPrestamoME * tipoCambio);

        // 6. Retorno del DTO consolidado
        return {
            ahorros: {
                cantidadMN: cantAhorroMN,
                cantidadME: cantAhorroME,
                cantidad: cantAhorroMN + cantAhorroME,
                cantidadInicial: cantIniAhorro,
                SaldoMN: saldoAhorroMN,
                SaldoME: saldoAhorroME,
                Saldo: saldoAhorroMN + (saldoAhorroME * tipoCambio),
                SaldoInicial: saldoInicialAhorroTotal,
            },
            dpf: {
                cantidadMN: cantDpfMN,
                cantidadME: cantDpfME,
                cantidad: cantDpfMN + cantDpfME,
                cantidadInicial: cantIniDpf,
                totalMN: totalDpfMN,
                totalME: totalDpfME,
                total: totalDpfMN + (totalDpfME * tipoCambio),
                totalInicial: totalInicialDpf,
            },
            prestamos: {
                cantidadMN: cantPrestamoMN,
                cantidadME: cantPrestamoME,
                cantidad: cantPrestamoMN + cantPrestamoME,
                cantidadInicial: cantIniPrestamo,
                totalMN: totalPrestamoMN,
                totalME: totalPrestamoME,
                total: totalPrestamoMN + (totalPrestamoME * tipoCambio),
                totalInicial: totalInicialPrestamo,
            },
            seguimientos: {
                total: totalSeguimientos,
                mes: seguimientosMes,
                semana: seguimientosSemana,
            },
        };
    } catch (error: any) {
        console.error('Error al calcular métricas del Dashboard:', error);
        throw new InternalServerErrorException(
            `Error al consultar el resumen general: ${error.message}`,
        );
    }
}
}