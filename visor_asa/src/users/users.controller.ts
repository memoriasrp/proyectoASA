// src/users/users.controller.ts
import { Controller, Get, Post, Delete, Body, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // Esto habilita la ruta: http://localhost:3000/users
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async obtenerUsuarios() {
        return this.usersService.listarTodos();
    }
    @Get('roles')
    async obtenerRoles() {
        return this.usersService.listarRoles();
    }

    @Post()
    async crearUsuario(@Body() usuarioData: any) {
        return this.usersService.crearUsuario(usuarioData);
    }

    @Delete(':id')
    async eliminarUsuario(@Param('id') id: string) {
        return this.usersService.remover(Number(id)); // Lo transformamos a número para Prisma
    }
    @Put(':id')
    async actualizarUsuario(@Param('id') id: string, @Body() datosActualizar: any) {
        return this.usersService.actualizar(Number(id), datosActualizar);
    }
}