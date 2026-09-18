import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRegistrogastoDto {
    @IsOptional()
    @IsString()
    idsocio?: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    idtipogasto: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    fecha?: Date;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    montopactado: number;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    montopagado: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    fechapago?: Date;

    @IsNotEmpty()
    @IsString()
    detalle: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    idusuariocreacion: number;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    idusuariopago: number;
}
