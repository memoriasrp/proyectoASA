export class DashboardResumenDto {
    ahorros: {
        cantidadMN: number;
        cantidadME: number;
        cantidad: number;
        cantidadInicial: number;
        SaldoMN: number;
        SaldoME: number;
        Saldo: number;
        SaldoInicial: number;
    };
    dpf: {
        cantidadMN: number;
        cantidadME: number;
        cantidad: number;
        cantidadInicial: number;
        totalMN: number;
        totalME: number;
        total: number;
        totalInicial: number;
    };
    prestamos: {
        cantidadMN: number;
        cantidadME: number;
        cantidad: number;
        cantidadInicial: number;
        totalMN: number;
        totalME: number;
        total: number;
        totalInicial: number;
    };
    seguimientos: {
        total: number;
        mes: number;
        semana: number;
    };
}