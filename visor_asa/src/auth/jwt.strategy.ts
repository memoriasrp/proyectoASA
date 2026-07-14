// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // Extrae el token desde la cabecera 'Authorization: Bearer <TOKEN>'
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'CLAVE_POR_DEFECTO_SI_NO_HAY_ENV',
        });
    }

    // Este método se ejecuta automáticamente cuando el token es válido
    async validate(payload: any) {
        // Si el token es correcto, retornamos la data del usuario.
        // Esto se inyectará automáticamente en 'req.user'
        if (!payload) {
            throw new UnauthorizedException('Token inválido o expirado');
        }

        return {
            id: payload.sub || payload.id, // ID del usuario
            username: payload.username,
            role: payload.role
        };
    }
}