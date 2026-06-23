import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }
    // 1. Lógica de Registro
    async registrar(nombre: string, email: string, passwordPlain: string, tipoUsuarioId: number) {
        // Delega la creación y el encriptado a nuestro UsersService
        return this.usersService.crearUsuario({
            nombre: nombre,
            email: email,
            password: passwordPlain,
            tipoUsuarioId: tipoUsuarioId
        });
    }

    // src/auth/auth.service.ts
    async login(email: string, passwordPlain: string) {
        // 1. Buscamos al usuario con todo su árbol de permisos anidados
        const usuario = await this.usersService.findByEmail(email);

        // 2. ¡LA SOLUCIÓN! Validamos si es null antes de avanzar
        if (!usuario) {
            throw new UnauthorizedException('El usuario o la contraseña son incorrectos');
        }

        // 3. Validamos la contraseña usando bcrypt
        const passwordValida = await bcrypt.compare(passwordPlain, usuario.password);
        if (!passwordValida) {
            throw new UnauthorizedException('El usuario o la contraseña son incorrectos');
        }

        // 4. Ahora TypeScript sabe con 100% de certeza que 'usuario' NO es null
        const menuPermitido = usuario.tipoUsuario.permisos.map(p => p.opcionMenu);

        const payload = { sub: usuario.id, email: usuario.email, nombre: usuario.nombre };

        return {
            status: 'success',
            access_token: await this.jwtService.signAsync(payload),
            menu: menuPermitido
        };
    }
}
