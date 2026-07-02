import { IsOptional, IsString, IsInt, Min, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class GetMovpasivosFilterDto {
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
    search?: string; // Para buscar por nombre, apellido o documento

    @IsOptional()
    @IsString()
    producto?: string; // si solo quiere ahorros, dpf , aportes

    @IsOptional()
    @IsDate({ message: 'La fecha "desde" debe ser una fecha válida' })
    @Type(() => Date) // Transforma el string de la URL a un objeto Date de JS
    desde?: Date;

    @IsOptional()
    @IsDate({ message: 'La fecha "hasta" debe ser una fecha válida' })
    @Type(() => Date) // Transforma el string de la URL a un objeto Date de JS
    hasta?: Date;

    @IsOptional()
    @IsString()
    moneda?: string;
}