import {
    Controller, Post, Body,
    UseInterceptors, UploadedFiles, Param,
    Get, UploadedFile, ParseFilePipe,
    BadRequestException, NotFoundException, Res
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';
import { SeguimientoService } from './seguimiento.service';
import { existsSync, mkdirSync } from 'fs';
import { Response } from 'express';
import * as fs from 'fs';

const UPLOAD_DIR = 'C:/visor-asa-storage/adjuntos';

if (!existsSync(UPLOAD_DIR)) {
    mkdirSync(UPLOAD_DIR, { recursive: true });
}

@Controller('seguimiento')
export class SeguimientoController {
    constructor(private readonly seguimientoService: SeguimientoService) { }

    @Post()
    @UseInterceptors(
        FilesInterceptor('file', 20, { // 🟢 3. Permitimos hasta 20 archivos bajo la clave 'file'
            storage: diskStorage({
                destination: UPLOAD_DIR, // 📁 Carpeta física en la raíz del backend donde se guardarán
                filename: (req, file, callback) => {
                    // Generamos un nombre único usando un código aleatorio + la extensión original
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    callback(null, `${randomName}${extname(file.originalname)}`);
                },
            }),
        }),
    )
    async guardarSeguimiento(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Body() body: any
    ) {
        if (!body.idsocio || !body.detalle) {
            throw new BadRequestException('El código de socio y el detalle son obligatorios.');
        }

        const idusuario = body.idusuario ? parseInt(body.idusuario, 10) : 1;

        return this.seguimientoService.crearSeguimientoConAdjuntos({
            idsocio: body.idsocio.trim(),
            tipoproducto: body.tipoproducto ? body.tipoproducto.trim().toUpperCase() : 'GENERAL',
            idproducto: body.idproducto ? body.idproducto.trim() : '',
            detalle: body.detalle,
            idusuario: idusuario,
            files: files || []
        });
    }

    @Get('socio/:idsocio')
    async obtenerHistorialPorSocio(@Param('idsocio') idsocio: string) {
        return this.seguimientoService.buscarHistorialPorSocio(idsocio);
    }
    @Get('socio/:idsocio/productos')
    async obtenerProductosSocio(@Param('idsocio') idsocio: string) {
        return this.seguimientoService.obtenerProductosSocio(idsocio);
    }

    @Get('adjunto/:id')
    async descargarAdjunto(@Param('id') id: string, @Res() res: Response) {
        const idAdjunto = parseInt(id, 10);

        // 1. Buscamos el archivo en la BD para conocer su ruta física real
        const adjunto = await this.seguimientoService.obtenerAdjuntoPorId(idAdjunto);

        if (!adjunto || !adjunto.ruta_archivo) {
            throw new NotFoundException('El registro del archivo adjunto no existe.');
        }

        // 2. Verificamos que el archivo realmente exista en el disco duro (C:\visor-asa-storage\...)
        if (!fs.existsSync(adjunto.ruta_archivo)) {
            throw new NotFoundException('El archivo físico no fue encontrado en el servidor.');
        }

        // 3. Forzamos que el navegador reconozca el archivo correctamente según su extensión
        // Si es PDF lo abrirá directamente en pantalla; si es Excel o Word lo descargará
        let contentType = 'application/octet-stream';
        if (adjunto.extension === 'pdf') contentType = 'application/pdf';
        else if (adjunto.extension === 'jpg' || adjunto.extension === 'jpeg') contentType = 'image/jpeg';
        else if (adjunto.extension === 'png') contentType = 'image/png';

        res.setHeader('Content-Type', contentType);
        // Para que conserve su nombre original legible al descargar:
        res.setHeader('Content-Disposition', `inline; filename="${adjunto.nombre_original}"`);

        // 4. Enviamos el archivo por streaming directo al navegador
        const fileStream = fs.createReadStream(adjunto.ruta_archivo);
        fileStream.pipe(res);
    }
}
