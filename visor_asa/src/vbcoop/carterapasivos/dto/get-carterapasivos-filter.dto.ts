import { IsOptional, IsString, IsInt, Min, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class GetCarterapasivosFilterDto {
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
    @IsString()
    periodo?: string;

    @IsOptional()
    @IsString()
    moneda?: string;

    @IsOptional()
    @IsString()
    condicion?: string;
}