import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // EndPoint: POST /auth/registro
    @Post('registro')
    async registro(@Body() body: any) {
        return this.authService.registrar(body.nombre, body.email, body.password, body.tipoUsuarioId);
    }

    // EndPoint: POST /auth/login
    @Post('login')
    @HttpCode(HttpStatus.OK) // Por defecto los POST devuelven 201, pero el login suele ser 200 OK
    async login(@Body() body: any) {
        return this.authService.login(body.email, body.password);
    }
}
