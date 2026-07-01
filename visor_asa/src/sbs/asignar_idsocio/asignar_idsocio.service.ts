import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Ajusta la ruta a tu proyecto

@Injectable()
export class AsignarIdsocioService {
    constructor(private prisma: PrismaService) { }
    async getResumenNulos() {
        // Ejecutamos los conteos en paralelo para máxima velocidad
        const [aportesNull, ahorroMnNull, ahorroMeNull, dpfMNNull, dpfMENull, prestamosNull] = await Promise.all([
            // 1. Aportes
            this.prisma.aportaciones_socios.count({
                where: { idsocioc: null }
            }),
            // 2. Ahorros Soles
            this.prisma.saldoahorro.count({
                where: { idsocioc: null }
            }),
            // 3. Ahorros Dólares
            this.prisma.saldoahorrome.count({
                where: { idsocioc: null }
            }),
            // 4. DPF (Asumiendo el nombre de tu modelo Prisma, cámbialo si varía)
            this.prisma.saldodpfmn.count({
                where: { idsocioc: null }
            }),
            this.prisma.saldodpfme.count({
                where: { idsocioc: null }
            }),
            // 5. Préstamos / Créditos
            this.prisma.saldoprestamo.count({
                where: { idsocioc: null }
            })
        ]);

        return {
            aportes: aportesNull,
            ahorrosMN: ahorroMnNull,
            ahorrosME: ahorroMeNull, // Unificamos ambas tablas de ahorros
            dpfMN: dpfMNNull,
            dpfME: dpfMENull,
            prestamos: prestamosNull
        };
    }

    async procesarConciliacion(modulo: string) {
        // 1. Determinar la tabla e ID correspondiente al módulo seleccionado
        let tablaTarget = '';
        let idColumn = '';

        switch (modulo.toLowerCase()) {
            case 'aportes':
                tablaTarget = 'sbs.aportaciones_socios'; // Ajusta al nombre real de tu tabla en la BD
                idColumn = 'codigo';
                break;
            case 'ahorrosmn':
                tablaTarget = 'sbs.saldoahorro';
                idColumn = 'idahorro';
                break;
            case 'ahorrosme':
                tablaTarget = 'sbs.saldoahorrome';
                idColumn = 'idahorrome';
                break;
            case 'dpfmn':
                tablaTarget = 'sbs.saldodpfmn';
                idColumn = 'iddpfmn';
                break;
            case 'dpfme':
                tablaTarget = 'sbs.saldodpfme';
                idColumn = 'iddpfmn';
                break;
            case 'prestamos':
                tablaTarget = 'sbs.saldoprestamo';
                idColumn = 'idpagare';
                break;
            default:
                throw new Error('Módulo no válido para conciliación');
        }

        // 2. Traer todos los registros donde idsocioc sea NULL
        // Seleccionamos el ID de la fila y el campo del nombre (asumiendo que se llama 'nombres' o 'socio')
        const campoNombre = modulo === 'prestamos' || modulo === 'aportes' ? 'socio' : 'nombres';

        const registrosHuérfanos = await this.prisma.$queryRawUnsafe<any[]>(`
      SELECT ${idColumn} AS id, ${campoNombre} AS nombre_completo 
      FROM ${tablaTarget} 
      WHERE idsocioc IS NULL AND ${campoNombre} IS NOT NULL;
    `);

        let actualizados = 0;

        // 3. Recorrer uno por uno los registros huérfanos
        for (const reg of registrosHuérfanos) {
            if (!reg.nombre_completo || reg.nombre_completo.trim() === '') continue;

            const nombreBusqueda = `%${reg.nombre_completo.trim().replace(/[\s,]+/g, '%')}%`;

            // Buscamos coincidencias cruzando contra paterno, materno y nombre unidos
            const coincidencias = await this.prisma.$queryRawUnsafe<any[]>(`
        SELECT idsocio , CONCAT(TRIM(paterno), ' ', TRIM(materno), ' ', TRIM(nombres)) AS nombre_completo
        FROM ctacte.socios 
        WHERE CONCAT(TRIM(paterno), ' ', TRIM(materno), ' ', TRIM(nombres)) ILIKE $1 
        AND FECRET IS NULL;
      `, nombreBusqueda);

            // 4. SI HAY EXACTAMENTE 1 COINCIDENCIA -> ACTUALIZAMOS EL CAMPO idsocioc
            if (coincidencias && coincidencias.length === 1) {
                const idSocioEncontrado = coincidencias[0].idsocio;

                await this.prisma.$queryRawUnsafe(`
          UPDATE ${tablaTarget}
          SET idsocioc = $1
          WHERE ${idColumn} = $2;
        `, String(idSocioEncontrado), reg.id);

                actualizados++;
            }
        }

        return {
            modulo,
            procesados: registrosHuérfanos.length,
            actualizados: actualizados
        };
    }
    async obtenerDetalleNulos(modulo: string) {
        let tablaTarget = '';
        let idColumn = '';
        let cuenta = '';
        let saldo = '';
        const moduloLimpio = modulo.trim().toLowerCase();
        const campoNombre = moduloLimpio === 'prestamos' || moduloLimpio === 'aportes' ? 'socio' : 'nombres';

        switch (moduloLimpio) {
            case 'aportes':
                tablaTarget = 'sbs.aportaciones_socios'; // Ajusta al nombre real de tu tabla en la BD
                idColumn = 'codigo';
                cuenta = 'codigo';
                saldo = 'saldo';
                break;
            case 'ahorrosmn':
                tablaTarget = 'sbs.saldoahorro';
                idColumn = 'idahorro';
                cuenta = 'cuenta';
                saldo = 'saldo230831';
                break;
            case 'ahorrosme':
                tablaTarget = 'sbs.saldoahorrome';
                idColumn = 'idahorrome';
                cuenta = 'cuenta';
                saldo = 'saldo230831';
                break;
            case 'dpfmn':
                tablaTarget = 'sbs.saldodpfmn';
                idColumn = 'iddpfmn';
                cuenta = 'cuenta';
                saldo = 'saldo230831';
                break;
            case 'dpfme':
                tablaTarget = 'sbs.saldodpfme';
                idColumn = 'iddpfmn';
                cuenta = 'cuenta';
                saldo = 'saldo230831';
                break;
            case 'prestamos':
                tablaTarget = 'sbs.saldoprestamo';
                idColumn = 'idpagare';
                cuenta = 'cuenta';
                saldo = 'saldo';
                break;
            default:
                throw new Error('Módulo inválido');
        }

        // Query para Aportes, DPF y Préstamos

        return this.prisma.$queryRawUnsafe<any[]>(`
    SELECT ${idColumn} AS id, ${cuenta} AS cuenta, ${campoNombre} AS nombre_completo, ${saldo} AS saldo
    FROM ${tablaTarget}
    WHERE idsocioc IS NULL
    ORDER BY ${campoNombre} ASC;
  `);
    }
}
