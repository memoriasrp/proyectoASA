import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) { }

  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @Get()
  async findAll() {
    return this.menusService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.menusService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(Number(id), updateMenuDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.menusService.remove(Number(id));
  }
}
