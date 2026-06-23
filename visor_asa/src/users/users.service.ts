import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    // Inyectamos nuestro PrismaService global
    constructor(private prisma: PrismaService) { }

    // 1. Método para buscar un usuario por email (lo usaremos en el Login)
    // src/users/users.service.ts (o donde tengas la consulta del Login)
    async findByEmail(email: string) {
        return this.prisma.usuario.findUnique({
            where: { email },
            // ⚠️ ESTO ES LO QUE FALTA: Le ordena a Prisma traer las tablas del esquema config
            include: {
                tipoUsuario: {
                    include: {
                        permisos: {
                            include: {
                                opcionMenu: true // Trae los detalles de la pantalla (nombre, ruta)
                            }
                        }
                    }
                }
            }
        });
    }
    // 2. Método para crear un nuevo usuario (Registro)
    async crearUsuario(data: any) {
        const { nombre, email, password, tipoUsuarioId } = data;
        // Verificamos si el correo ya está registrado
        const existe = await this.findByEmail(email);
        if (existe) {
            throw new ConflictException('El correo electrónico ya está registrado');
        }

        // Hasheamos la contraseña antes de guardarla (10 rondas de sal)
        const salt = await bcrypt.genSalt(10);
        const passwordHasheada = await bcrypt.hash(password, salt);

        // Guardamos en la base de datos usando Prisma
        return this.prisma.usuario.create({
            data: {
                nombre,
                email,
                password: passwordHasheada,
                // Si te mandan un ID de rol desde el controlador lo usa, 
                // si no, le pone el ID 2 (que en tu seed mapeamos como 'Visor')
                tipoUsuarioId: Number(tipoUsuarioId)
            }
        });
    }

    async listarTodos() {
        return this.prisma.usuario.findMany({
            select: {
                id: true,
                nombre: true,
                email: true,
                tipoUsuario: {
                    select: {
                        nombre: true
                    }
                }
            }
        });
    }
    async remover(id: number) {
        return this.prisma.usuario.delete({
            where: {
                id: id
            }
        });
    }
    async actualizar(id: number, data: any) {
        const datosUpdate: any = {
            nombre: data.nombre,
            email: data.email,
            tipoUsuarioId: Number(data.tipoUsuarioId)
        };

        // Solo si el administrador digitó algo en el campo password, lo actualizamos
        const salt = await bcrypt.genSalt(10);
        datosUpdate.password = await bcrypt.hash(data.password.trim(), salt);


        return this.prisma.usuario.update({
            where: { id: id },
            data: datosUpdate
        });
    }

    async listarRoles() {
        return this.prisma.tipoUsuario.findMany({
            select: {
                id: true,
                nombre: true
            }
        });
    }
}