import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateRegistrogastoDto {

    @IsNotEmpty({ message: 'El socio es obligatorio' })
    idsocio: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    idtipogasto: number;

    @IsNotEmpty({ message: 'El monto pactado es obligatorio' })
    @Type(() => Number)
    @IsNumber({}, { message: 'montopactado debe ser un número' })
    montopactado: number;

    @IsNotEmpty({ message: 'El monto pagado es obligatorio' })
    @Type(() => Number)
    @IsNumber({}, { message: 'montopagado debe ser un número' })
    montopagado: number;

    @IsNotEmpty({ message: 'El detalle es obligatorio' })
    @IsString()
    detalle: string;

    @IsNotEmpty({ message: 'El detalle es obligatorio' })
    @Type(() => Number)
    @IsNumber()
    idusuariocreacion?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    idusuariopago?: number;
}