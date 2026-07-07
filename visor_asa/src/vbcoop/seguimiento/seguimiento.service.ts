import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { extname } from 'path';
import { CrearSeguimientoDto } from './dto/crear-seguimiento.dto';

@Injectable()
export class SeguimientoService {
    constructor(private prisma: PrismaService) { }

    // src/vbcoop/seguimiento/seguimiento.service.ts

    async crearSeguimientoConAdjuntos(dto: CrearSeguimientoDto) {
        try {
            console.log('🚀 Iniciando transacción Prisma...');

            return await this.prisma.$transaction(async (tx) => {

                // 1. Insertar el seguimiento padre
                const nuevoSeguimiento = await tx.seguimiento.create({
                    data: {
                        idsocio: dto.idsocio,
                        tipoproducto: dto.tipoproducto,
                        idproducto: dto.idproducto || null,
                        detalle: dto.detalle,
                        idusuario: dto.idusuario,
                        fecha: new Date(),
                    },
                });

                console.log('✅ Seguimiento padre creado con ID:', nuevoSeguimiento.id);

                // 2. Insertar los adjuntos si existen
                if (dto.files && dto.files.length > 0) {
                    console.log(`📂 Mapeando ${dto.files.length} archivos para insertar...`);

                    const datosAdjuntos = dto.files.map((file) => ({
                        id_seguimiento: nuevoSeguimiento.id,
                        nombre_original: file.originalname,
                        nombre_almacenado: file.filename || file.originalname, // El nombre único de Multer
                        ruta_archivo: file.path || '',                          // Ej: "uploads/random.pdf"
                        extension: file.originalname.split('.').pop()?.toLowerCase() || '',
                        tamano_bytes: file.size,
                        idusuario_sube: dto.idusuario,
                    }));

                    const resultadoAdjuntos = await tx.seguimiento_adjunto.createMany({
                        data: datosAdjuntos,
                    });

                    console.log('✅ createMany ejecutado con éxito:', resultadoAdjuntos);
                } else {
                    console.log('ℹ️ No se detectaron archivos para adjuntar.');
                }

                return {
                    success: true,
                    id_seguimiento: nuevoSeguimiento.id,
                    archivos_subidos: dto.files ? dto.files.length : 0
                };
            });

        } catch (error: any) { // 🟢 CAMBIADO: Forzamos el tipo 'any' aquí

            // Ahora sí podrás ver en la terminal de NestJS la razón exacta por la que no guarda:
            console.error('❌ ERROR REAL DETECTADO EN POSTGRESQL/PRISMA:');
            console.error('Código de error:', error.code);
            console.error('Mensaje detallado:', error.message);
            console.error('Meta de Prisma:', error.meta);

            throw new InternalServerErrorException(
                error.message || 'No se pudo registrar la gestión en la base de datos.'
            );
        }
    }


    async registrarConAdjunto(body: any, file?: Express.Multer.File) {
        const idUsuarioNum = Number(body.idusuario);

        try {
            // Usamos una transacción para asegurar que todo se guarde bien o nada se guarde
            return await this.prisma.$transaction(async (tx) => {

                // 1. Insertar el encabezado del seguimiento
                const nuevoSeguimiento = await tx.seguimiento.create({
                    data: {
                        idsocio: body.idsocio || null,
                        tipoproducto: body.tipoproducto || null,
                        idproducto: body.idproducto || null,
                        fecha: new Date(),
                        detalle: body.detalle,
                        idusuario: idUsuarioNum,
                    },
                });

                // 2. Si el usuario subió un archivo, registramos sus metadatos amarrados al ID previo
                if (file) {
                    await tx.seguimiento_adjunto.create({
                        data: {
                            id_seguimiento: nuevoSeguimiento.id,
                            nombre_original: file.originalname,
                            nombre_almacenado: file.filename,
                            ruta_archivo: file.path, // Guarda la ruta exacta (C:/visor-asa-storage/adjuntos/...)
                            extension: extname(file.originalname).replace('.', '').toLowerCase(),
                            tamano_bytes: file.size,
                            idusuario_sube: idUsuarioNum,
                        },
                    });
                }

                return {
                    success: true,
                    message: 'Seguimiento registrado exitosamente',
                    id: nuevoSeguimiento.id,
                    tieneAdjunto: !!file
                };
            });

        } catch (error) {
            console.error('Error en la transacción de seguimiento:', error);
            throw new InternalServerErrorException('No se pudo procesar el registro del seguimiento');
        }
    }
    async buscarHistorialPorSocio(idsocio: string) {
        try {
            const socioLimpio = idsocio.trim();

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
      WHERE TRIM(sg.idsocio) = ${socioLimpio}
      ORDER BY sg.fecha DESC;
    `;

            // Retornamos mapeando limpiamente la estructura exacta que espera tu Angular
            return historial.map(item => ({
                id: item.id,
                idsocio: item.idsocio?.trim(),
                tipoproducto: item.tipoproducto,
                idproducto: item.idproducto,
                fecha: item.fecha,
                detalle: item.detalle,
                idusuario: item.idusuario,
                created_at: item.created_at,
                seguimiento_adjunto: item.seguimiento_adjunto, // Ya es un array directo gracias a Postgres
                Usuario: {
                    nombre: item.usuario_nombre || 'Sistema'
                }
            }));

        } catch (error) {
            console.error(`Error optimizado de historial para socio ${idsocio}:`, error);
            throw new InternalServerErrorException('Error al consultar la bitácora unificada');
        }
    }

    async obtenerProductosSocio(idsocio: string) {
        try {
            const socioLimpio = idsocio.trim();

            // Ejecutamos tu consulta SQL pura optimizada con el filtro del socio
            const productos = await this.prisma.$queryRaw`
      SELECT tipo, idcdp, descri, idsocio, saldo, 
        CASE WHEN saldo = 0 THEN 'CANCELADO' ELSE 'VIGENTE' END AS condicion
      FROM (
        SELECT tipo,  idcdp, descri, idsocio, 
          SUM(CASE WHEN car_abo = 'A' THEN capital * (-1) ELSE capital END) AS saldo
        FROM consolidado.todo_mov_pas
        WHERE TRIM(idsocio) = ${socioLimpio}
        GROUP BY tipo, idcdp, descri, idsocio

        UNION ALL

        SELECT 'PRESTAMO' AS tipo, idpagare AS idcdp, descri, idsocio, 
          SUM(CASE WHEN car_abo = 'A' THEN capital * (-1) ELSE capital END) AS saldo
        FROM consolidado.movimientosprestamos
        WHERE TRIM(idsocio) = ${socioLimpio}
        GROUP BY idpagare, descri, idsocio
      ) AS lista
      ORDER BY condicion DESC, tipo ASC;    `;

            return productos;
        } catch (error) {
            console.error(`Error al obtener productos del socio ${idsocio}:`, error);
            throw new InternalServerErrorException('Error al consultar las cuentas del socio');
        }

    }

    async obtenerAdjuntoPorId(id: number) {
        return this.prisma.seguimiento_adjunto.findUnique({
            where: { id: id }
        });
    }
}
