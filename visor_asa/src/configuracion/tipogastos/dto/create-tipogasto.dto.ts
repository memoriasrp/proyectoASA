import { IsString, IsNotEmpty, IsInt, IsEnum, IsOptional } from 'class-validator';
import { MaxLength } from 'class-validator';

export class CreateTipogastoDto {
    @IsString({ message: 'La descripción debe ser un texto.' })
    @IsOptional()
    @MaxLength(255, { message: 'La descripción no puede superar los 255 caracteres.' })
    descripcion?: string;
}
