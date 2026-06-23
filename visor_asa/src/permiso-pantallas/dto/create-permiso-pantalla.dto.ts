import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePermisoPantallaDto {
    @IsNumber()
    @IsNotEmpty()
    tipoUsuarioId!: number;

    @IsNumber()
    @IsNotEmpty()
    opcionMenuId!: number;
}