import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetListaSeguimientoFilterDto {
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
    orderBy?: string; // Columna por la que se ordenará

    @IsOptional()
    @IsString()
    orderDir?: string; // Dirección del ordenamiento: 'ASC' o 'DESC'
}