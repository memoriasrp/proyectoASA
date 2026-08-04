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
            SELECT  crt.*, pgr.fecha_repr,  pgr.plazo_repr, pgr.tasa_repro, pgr.importe_re, 
             garantes.detalle_garantes,   gexterno.garantes_ext
            FROM consolidado.carteraxperiodo_prestamo crt  INNER JOIN ctacte.pagares pgr ON crt.idpagare = pgr.idpagare
            LEFT JOIN (
                SELECT  ge.idpagare,
                STRING_AGG( CONCAT( fg.idgarante, ' (', fg.numdoc, ')-', fg.nombre,
                    E'\n Direccion: ', CONCAT_WS(' ', fg.telefono, fg.direccion),
                    CASE 
                        WHEN fg.centrotra IS NOT NULL 
                        THEN CONCAT(E'\n Centro laboral: ', CONCAT_WS('-', fg.centrotel, fg.centrotra))
                        ELSE '' 
                    END ),
                    E'\n-----------------------------------\n' -- Separador entre un garante y otro
                ) AS garantes_ext
                FROM ctacte.garanext ge
                INNER JOIN ctacte.ficgaran fg ON fg.idgarante = ge.idgarante
                GROUP BY ge.idpagare
            ) gexterno  ON gexterno.idpagare = crt.idpagare
            LEFT JOIN (
                SELECT  g.idpagare, STRING_AGG( CONCAT(
                    sc.idsocio, ' (', sc.numdoc, ')-',CONCAT_WS(' ',  sc.paterno, sc.materno),',',coalesce (sc.nombres,''),
                    E'\n Direccion: ', CONCAT_WS(' ', sc.telefono, sc.direccion),
                    CASE 
                        WHEN sc.centrotra IS NOT NULL 
                        THEN CONCAT(E'\n Centro laboral: ', CONCAT_WS('-', sc.centrotel, sc.centrotra))
                        ELSE '' 
                    END ),
                    E'\n-----------------------------------\n' -- Separador entre un garante y otro
                ) AS detalle_garantes
                FROM  ctacte.garantes g INNER JOIN ctacte.socios sc ON sc.idsocio=g.idsocio
                GROUP BY g.idpagare
            ) garantes ON garantes.idpagare = crt.idpagare           
            WHERE 
                crt.idsocio = ${idSocio}  AND 
            crt.periodo = (SELECT periodo FROM consolidado.calendario_periodos WHERE activo = true)
            ORDER BY crt.condicion DESC, crt.fechades DESC;
            `;
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
