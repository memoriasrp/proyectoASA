import {
  Controller, Post, Body, Query, Delete,
  UseInterceptors, UploadedFiles, Param,
  Get, UploadedFile, ParseFilePipe, UseGuards,
  BadRequestException, NotFoundException, Res, Req, Patch
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegistrogastosService } from './registrogastos.service';
import { CreateRegistrogastoDto } from './dto/create-registrogasto.dto';
import { UpdateRegistrogastoDto } from './dto/update-registrogasto.dto';
import { GetRegistroGastosFilterDto } from './dto/get-registrogastos-filter.dto';
import { filter } from 'rxjs';

@Controller('registrogastos')
export class RegistrogastosController {
  constructor(private readonly registrogastosService: RegistrogastosService) { }

  @Post()
  create(
    @Body() body: any,
    @Req() req: Request
  ) {
    const usuario = (req as any).user;
    const idUsuarioReal = usuario?.id || 1;
    const createRegistrogastoDto: CreateRegistrogastoDto = {
      idsocio: body.idsocio,
      idtipogasto: Number(body.idtipogastos),
      montopactado: Number(body.montopactado || 0),
      montopagado: Number(body.montopagado || 0),
      detalle: body.detalle || '',
      idusuariocreacion: idUsuarioReal,
      idusuariopago: Number(body.montopagado) > 0 ? idUsuarioReal : undefined,
    };
    return this.registrogastosService.create({
      ...createRegistrogastoDto,
      idusuariocreacion: idUsuarioReal,
      idusuariopago: createRegistrogastoDto.montopagado > 0 ? idUsuarioReal : undefined,
    }, idUsuarioReal);
  }
  @Get()
  findAll(@Query() filters: GetRegistroGastosFilterDto) {
    return this.registrogastosService.findAll(filters);
  }

  @Get('socios')
  findSocios() {
    return this.registrogastosService.obtenerListaSociosSelect();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrogastosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegistrogastoDto: UpdateRegistrogastoDto) {
    return this.registrogastosService.update(+id, updateRegistrogastoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrogastosService.remove(+id);
  }
}
