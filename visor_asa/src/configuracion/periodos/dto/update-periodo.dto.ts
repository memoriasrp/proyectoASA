import { PartialType } from '@nestjs/mapped-types';
// Cambia la línea de class-class-validator por esta:
import { IsString, IsNumber, IsNotEmpty, IsInt, IsEnum, IsDate, IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class UpdateMenuDto {
    @IsString()
    @IsNotEmpty({ message: 'El periodo es obligatorio' })
    periodo!: string;

    @IsOptional()
    @IsDate({ message: 'Debe ser una fecha válida' })
    @Type(() => Date)
    fecha?: Date | null; // Mapea con el DateTime? de Prisma

    @Transform(({ value }) => (value !== null && value !== undefined ? parseFloat(value) : value))
    @IsNumber(
        { maxDecimalPlaces: 4 }, // 💡 El Tipo de Cambio en Perú (SBS) usualmente maneja de 3 a 4 decimales
        { message: 'El tipo de cambio (tc) debe ser un número decimal válido' } // 👈 Corregido el mensaje
    )
    tc?: number | null; // Mapea con el Decimal? de Prisma

}
