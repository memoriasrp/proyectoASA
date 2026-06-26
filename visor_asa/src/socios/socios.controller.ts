import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { SociosService } from './socios.service';
import { GetSociosFilterDto } from './dto/get-socios-filter.dto';

@Controller('socios')
export class SociosController {
    constructor(private readonly sociosService: SociosService) { }

    @Get()
    // Usamos el ValidationPipe global o local con transform: true para mapear los strings de la URL a números en el DTO (page y limit)
    @UsePipes(new ValidationPipe({ transform: true }))
    findAll(@Query() filterDto: GetSociosFilterDto) {
        return this.sociosService.findAll(filterDto);
    }
}