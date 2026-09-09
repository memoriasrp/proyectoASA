import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TipogastosService } from './tipogastos.service';
import { CreateTipogastoDto } from './dto/create-tipogasto.dto';
import { UpdateTipogastoDto } from './dto/update-tipogasto.dto';

@Controller('tipogastos')
export class TipogastosController {
  constructor(private readonly tipogastosService: TipogastosService) { }

  @Post()
  create(@Body() createTipogastoDto: CreateTipogastoDto) {
    return this.tipogastosService.create(createTipogastoDto);
  }

  @Get()
  findAll() {
    return this.tipogastosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipogastosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTipogastoDto: UpdateTipogastoDto) {
    return this.tipogastosService.update(+id, updateTipogastoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipogastosService.remove(+id);
  }
}
