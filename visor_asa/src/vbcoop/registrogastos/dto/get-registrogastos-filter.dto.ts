import { IsArray, IsOptional, IsString, IsInt, Min, IsDate } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class GetRegistroGastosFilterDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page!: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit!: number;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsDate({ message: 'La fecha "desde" debe ser una fecha válida' })
    @Type(() => Date) // Transforma el string de la URL a un objeto Date de JS
    desde?: Date;

    @IsOptional()
    @IsDate({ message: 'La fecha "hasta" debe ser una fecha válida' })
    @Type(() => Date) // Transforma el string de la URL a un objeto Date de JS
    hasta?: Date;

    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'idTipoGastos esta mal' })
    idTipoGastos?: number;
}