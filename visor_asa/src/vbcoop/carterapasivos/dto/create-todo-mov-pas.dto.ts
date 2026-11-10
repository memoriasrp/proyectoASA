import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
    IsDate,
    IsInt
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTodoMovPasDto {
    @IsNotEmpty({ message: 'El tipo es obligatorio.' })
    @IsString()
    tipo: string;

    @IsNotEmpty({ message: 'El ID CDP es obligatorio.' })
    @IsString()
    idcdp: string;

    // 🟢 Transformación automática a objeto Date
    @IsNotEmpty({ message: 'La fecha es obligatoria.' })
    @Type(() => Date)
    @IsDate({ message: 'Debe ser una fecha válida.' })
    fecha: Date;

    @IsNotEmpty({ message: 'El N° de operación es obligatorio.' })
    @IsString()
    idnumope: string;

    @IsNotEmpty({ message: 'El item es obligatorio.' })
    @IsInt()
    @Type(() => Number)
    item: number;

    @IsOptional()
    @IsString()
    idsocio?: string;

    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsString()
    numdoc?: string;

    @IsOptional()
    @IsString()
    descri?: string;

    @IsOptional()
    @IsString()
    moneda?: string;

    @IsOptional()
    @IsString()
    car_abo?: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    capital?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    interes?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    total?: number;

    @IsOptional()
    @IsString()
    operacion?: string;

    @IsOptional()
    @IsString()
    idahorro?: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    cap_original?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    plazo?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    tasa?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    tasaanual?: number;

    // 🟢 Fechas opcionales convertidas a Date o null
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    fecing?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    fechaemi?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    fechaven?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    fechacan?: Date;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    tipsoc?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    natjur?: number;

    @IsOptional()
    @IsString()
    ruc?: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    sexo?: number;

    @IsOptional()
    @IsString()
    idusuario?: string;
}