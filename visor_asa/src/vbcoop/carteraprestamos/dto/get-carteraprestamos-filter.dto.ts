import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class GetCarteraprestamosFilterDto {
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
    @IsString()
    producto?: string;

    @IsOptional()
    @IsString()
    periodo?: string;

    @IsOptional()
    @IsString()
    moneda?: string;

    @IsOptional()
    @IsString()
    condicion?: string;

    @IsOptional()
    @Transform(({ value }) => {
        // Convierte el string separado por comas (ej: "GRUPO1,GRUPO2") a un array string[]
        if (typeof value === 'string') {
            return value.split(',').map((g) => g.trim()).filter((g) => g.length > 0);
        }
        // Si ya viene como un arreglo
        if (Array.isArray(value)) {
            return value;
        }
        return [];
    })
    @IsArray()
    @IsString({ each: true })
    grupos?: string[];
}