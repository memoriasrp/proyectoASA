import { PartialType } from '@nestjs/mapped-types';
import { CreatePermisoPantallaDto } from './create-permiso-pantalla.dto';

export class UpdatePermisoPantallaDto extends PartialType(CreatePermisoPantallaDto) {}
