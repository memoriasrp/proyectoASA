import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateMovimientoDto {
    // Clave Primaria Compuesta & Identificadores de Operación
    @IsString()
    @IsNotEmpty()
    idnumope: string;

    @IsDateString()
    @IsNotEmpty()
    fecha: string;

    @IsString()
    @IsNotEmpty()
    idpagare: string;

    @IsNumber()
    @IsNotEmpty()
    nrocuota: number;

    @IsString()
    @IsNotEmpty()
    car_abo: string; // Ej: 'A' (Abono) o 'C' (Cargo)

    // Información del Socio y Préstamo
    @IsString()
    @IsOptional()
    idsocio?: string;

    @IsString()
    @IsOptional()
    nombre?: string;

    @IsString()
    @IsOptional()
    numdoc?: string;

    @IsString()
    @IsOptional()
    descri?: string;

    @IsString()
    @IsOptional()
    moneda?: string;

    @IsNumber()
    @IsOptional()
    plazo?: number;

    @IsNumber()
    @IsOptional()
    tasa?: number;

    @IsNumber()
    @IsOptional()
    tasa2?: number;

    @IsDateString()
    @IsOptional()
    fechades?: string;

    @IsNumber()
    @IsOptional()
    tipsoc?: number;

    @IsNumber()
    @IsOptional()
    natjur?: number;

    @IsString()
    @IsOptional()
    ruc?: string;

    @IsNumber()
    @IsOptional()
    sexo?: number;

    // Conceptos Monetarios / Financieros
    @IsNumber()
    @IsOptional()
    capital?: number;

    @IsNumber()
    @IsOptional()
    interes?: number;

    @IsNumber()
    @IsOptional()
    mora?: number;

    @IsNumber()
    @IsOptional()
    seguro?: number;

    @IsNumber()
    @IsOptional()
    aporte?: number;

    @IsNumber()
    @IsOptional()
    total?: number;

    @IsNumber()
    @IsOptional()
    importe?: number;

    @IsNumber()
    @IsOptional()
    castigada?: number;

    @IsNumber()
    @IsOptional()
    castigo?: number;

    // Control y Auditoría
    @IsString()
    @IsOptional()
    operacion?: string;

    @IsString()
    @IsOptional()
    idforma?: string;

    @IsDateString()
    @IsOptional()
    f1?: string;

    @IsDateString()
    @IsOptional()
    f2?: string;

    @IsString()
    @IsOptional()
    f3?: string;

    @IsString()
    @IsOptional()
    idusuario?: string;
}