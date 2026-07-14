import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// 🟢 1. Asegúrate de importar la estrategia aquí (ajusta la ruta según tu carpeta)
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    // Configuramos PassportModule definiendo por defecto la estrategia jwt
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'CLAVE_POR_DEFECTO_SI_NO_HAY_ENV',
      signOptions: { expiresIn: '2h' }, // El token expirará en 2 horas
    }),
  ],
  // 🟢 2. Agregamos JwtStrategy como proveedor para que NestJS lo inicialice
  providers: [
    AuthService,
    JwtStrategy
  ],
  controllers: [AuthController],
  // 🟢 3. ¡ESTO ES LO MÁS IMPORTANTE! 
  // Exportamos PassportModule y JwtStrategy para que otros módulos (como SeguimientoModule) puedan usarlos
  exports: [
    PassportModule,
    JwtStrategy
  ]
})
export class AuthModule { }