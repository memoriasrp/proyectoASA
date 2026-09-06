import { Controller } from '@nestjs/common';
import { PeriodoEstadoService } from './periodo-estado.service';

@Controller('periodo-estado')
export class PeriodoEstadoController {
  constructor(private readonly periodoEstadoService: PeriodoEstadoService) {}
}
