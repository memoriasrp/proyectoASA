import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistrogastoDto } from './create-registrogasto.dto';

export class UpdateRegistrogastoDto extends PartialType(CreateRegistrogastoDto) {}
