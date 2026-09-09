import { PartialType } from '@nestjs/mapped-types';
import { CreateTipogastoDto } from './create-tipogasto.dto';

export class UpdateTipogastoDto extends PartialType(CreateTipogastoDto) {}
