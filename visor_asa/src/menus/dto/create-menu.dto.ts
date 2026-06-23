// Cambia la línea de class-class-validator por esta:
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateMenuDto {
    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @IsString()
    @IsNotEmpty()
    ruta!: string;

    @IsString()
    icono!: string;
}
