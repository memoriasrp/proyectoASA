import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PermisoPantallasService } from './permiso-pantallas.service';
import { CreatePermisoPantallaDto } from './dto/create-permiso-pantalla.dto';
import { UpdatePermisoPantallaDto } from './dto/update-permiso-pantalla.dto';

@Controller('permiso-pantallas')
export class PermisoPantallasController {
  constructor(private readonly permisoPantallasService: PermisoPantallasService) { }

  @Post()
  create(@Body() createPermisoPantallaDto: CreatePermisoPantallaDto) {
    return this.permisoPantallasService.create(createPermisoPantallaDto);
  }

  @Get()
  findAll() {
    return this.permisoPantallasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permisoPantallasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePermisoPantallaDto: UpdatePermisoPantallaDto) {
    return this.permisoPantallasService.update(+id, updatePermisoPantallaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permisoPantallasService.remove(+id);
  }

}
