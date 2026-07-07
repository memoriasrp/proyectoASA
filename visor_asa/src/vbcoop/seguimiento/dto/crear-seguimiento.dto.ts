import { IsOptional, IsString, IsInt, Min, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
export interface CrearSeguimientoDto {
    idsocio: string;
    tipoproducto: string;
    idproducto: string;
    detalle: string;
    idusuario: number;
    files: Array<Express.Multer.File>;
}
