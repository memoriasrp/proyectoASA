import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: process.env.JWT_SECRET || 'CLAVE_POR_DEFECTO_SI_NO_HAY_ENV',
    signOptions: { expiresIn: '2h' }, // El token expirará en 2 horas
  }),],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
