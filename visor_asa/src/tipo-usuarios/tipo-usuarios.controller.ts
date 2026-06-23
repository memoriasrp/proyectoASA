import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TipoUsuariosService } from './tipo-usuarios.service';
import { CreateTipoUsuarioDto } from './dto/create-tipo-usuario.dto';
import { UpdateTipoUsuarioDto } from './dto/update-tipo-usuario.dto';

@Controller('tipo-usuarios')
export class TipoUsuariosController {
  constructor(private readonly tipoUsuariosService: TipoUsuariosService) { }

  @Post()
  create(@Body() createTipoUsuarioDto: CreateTipoUsuarioDto) {
    return this.tipoUsuariosService.create(createTipoUsuarioDto);
  }

  @Get()
  findAll() {
    return this.tipoUsuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoUsuariosService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTipoUsuarioDto: UpdateTipoUsuarioDto) {
    return this.tipoUsuariosService.update(Number(id), updateTipoUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoUsuariosService.remove(Number(id));
  }

  @Put(':id/permisos')
  async actualizarPermisosRol(
    @Param('id') id: string,
    @Body() datos: { menuIds: number[] }
  ) {
    return this.tipoUsuariosService.guardarPermisos(Number(id), datos.menuIds);
  }
}
