import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MenusModule } from './menus/menus.module';
import { TipoUsuariosModule } from './tipo-usuarios/tipo-usuarios.module';
import { PermisoPantallasModule } from './permiso-pantallas/permiso-pantallas.module';
import { SociosModule } from './socios/socios.module';
import { AportacionesModule } from './sbs/aportaciones/aportaciones.module';
import { CreditosModule } from './sbs/creditos/creditos.module';
import { AhorrosModule } from './sbs/ahorros/ahorros.module';
import { DpfModule } from './sbs/dpf/dpf.module';
import { AsignarIdsocioModule } from './sbs/asignar_idsocio/asignar_idsocio.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, MenusModule, TipoUsuariosModule, PermisoPantallasModule,
    SociosModule, AportacionesModule, CreditosModule, AhorrosModule, DpfModule, AsignarIdsocioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
