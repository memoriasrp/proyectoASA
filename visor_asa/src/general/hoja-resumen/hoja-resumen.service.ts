import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { HojaResumenDto } from './dto/hoja-resumen-response.dto';

@Injectable()
export class HojaResumenService {
    constructor(private readonly prisma: PrismaService) { }
    async obtenerHojaResumen(idSocio: string) {
        // 1. Verificar si el socio existe
        const socio = await this.prisma.socios.findFirst({
            where: { idsocio: idSocio },
        });

        if (!socio) {
            throw new NotFoundException(`El socio con ID ${idSocio} no fue encontrado`);
        }

        const aportes = await this.prisma.$queryRaw`
            select * from consolidado.carteraxperiodo_pasivo 
            where 
            idsocio= ${idSocio} and descri='APORTE' AND
            periodo=(SELECT periodo FROM consolidado.calendario_periodos WHERE activo =true)
            order by condicion desc`;

        const ahorros = await this.prisma.$queryRaw`
            select * from consolidado.carteraxperiodo_pasivo 
            where 
            idsocio= ${idSocio} and tipo='AHORRO' AND
            periodo=(SELECT periodo FROM consolidado.calendario_periodos WHERE activo =true)
            order by condicion desc`;
        const dpf = await this.prisma.$queryRaw`
            select * from consolidado.carteraxperiodo_pasivo 
            where 
            idsocio= ${idSocio} and tipo='DPF' AND
            periodo=(SELECT periodo FROM consolidado.calendario_periodos WHERE activo =true)
            order by condicion desc `;
        const prestamo = await this.prisma.$queryRaw`
            select crt.*, fecha_repr, plazo_repr, tasa_repro, importe_re
            from consolidado.carteraxperiodo_prestamo crt
            inner join ctacte.pagares pgr on crt.idpagare=pgr.idpagare
            where 
            crt.idsocio= ${idSocio} AND
            periodo=(SELECT periodo FROM consolidado.calendario_periodos WHERE activo =true)
            order by condicion desc, crt.fechades desc`;

        const historial: any[] = await this.prisma.$queryRaw`
      SELECT 
        sg.id,
        sg.idsocio,
        sg.tipoproducto,
        sg.idproducto,
        sg.fecha,
        sg.detalle,
        sg.idusuario,
        sg.created_at,
        us.nombre as "usuario_nombre",
        -- Agrupamos los adjuntos en un sub-arreglo JSON nativo de Postgres
        COALESCE(
          (
            SELECT json_agg(json_build_object(
              'id', adj.id,
              'nombre_original', adj.nombre_original,
              'nombre_almacenado', adj.nombre_almacenado,
              'ruta_archivo', adj.ruta_archivo,
              'extension', adj.extension,
              'tamano_bytes', adj.tamano_bytes
            ))
            FROM consolidado.seguimiento_adjunto adj
            WHERE adj.id_seguimiento = sg.id
          ), 
          '[]'::json
        ) as "seguimiento_adjunto"
      FROM consolidado.seguimiento sg
      LEFT JOIN config."Usuario" us ON us.id = sg.idusuario
      WHERE TRIM(sg.idsocio) = ${idSocio}
      ORDER BY sg.fecha DESC;
    `;

        // 3. Formatear y consolidar la respuesta final
        return {
            datosPersonales: socio,
            aportes: aportes,
            ahorros: ahorros,
            depositosPlazoFijo: dpf,
            prestamo: prestamo,
            historial: historial
        }
    }
}
