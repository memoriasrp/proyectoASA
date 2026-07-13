import { Controller } from '@nestjs/common';
import { ObservacionesAhorroService } from './observaciones-ahorro.service';

@Controller('observaciones-ahorro')
export class ObservacionesAhorroController {
  constructor(private readonly observacionesAhorroService: ObservacionesAhorroService) {}
}
