import { Controller } from '@nestjs/common';
import { ListaSeguimientoService } from './lista-seguimiento.service';

@Controller('lista-seguimiento')
export class ListaSeguimientoController {
  constructor(private readonly listaSeguimientoService: ListaSeguimientoService) {}
}
