import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTipoUsuarioDto {
    @IsString()
    @IsNotEmpty()
    nombre!: string;
}