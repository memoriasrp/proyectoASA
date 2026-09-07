import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { SociosService } from './socios.service';
import { GetSociosFilterDto } from './dto/get-socios-filter.dto';

import { AuthGuard } from '@nestjs/passport';
import { GetPeriodo, GetTipoCambio } from '../auth/get-periodo.decorator';



@Controller('socios')
export class SociosController {
    constructor(private readonly sociosService: SociosService) { }

    @Get()
    // Usamos el ValidationPipe global o local con transform: true para mapear los strings de la URL a números en el DTO (page y limit)
    @UsePipes(new ValidationPipe({ transform: true }))
    findAll(@Query() filterDto: GetSociosFilterDto,
        @GetPeriodo() periodo?: string,
        @GetTipoCambio() tc?: number) {
        return this.sociosService.findAll(filterDto, periodo, tc);
    }
    @Get('exportar')
    @UsePipes(new ValidationPipe({ transform: true }))
    exportar(@Query() filterDto: GetSociosFilterDto,
        @GetPeriodo() periodo?: string,
        @GetTipoCambio() tc?: number) {
        return this.sociosService.AllExport(filterDto, periodo, tc);
    }
}