// Cambia la línea de class-class-validator por esta:
import { IsString, IsNotEmpty, IsInt, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { GrupoMenu } from '@prisma/client';

export class CreateMenuDto {
    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @IsString()
    @IsNotEmpty()
    ruta!: string;

    @IsString()
    icono!: string;
    // Declaramos el orden como un entero obligatorio
    @IsNotEmpty()
    @Transform(({ value }) => Number(value))
    @IsInt({ message: 'orden must be an integer number' }) // Ahora sí pasará la validación
    orden: number;

    // Declaramos el grupo usando el Enum obligatorio generado por Prisma
    @IsEnum(GrupoMenu)
    @IsNotEmpty()
    grupo: GrupoMenu;
}
