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
import { PeriodosModule } from './configuracion/periodos/periodos.module';
import { MovpasivosModule } from './vbcoop/movpasivos/movpasivos.module';
import { MovactivosModule } from './vbcoop/movactivos/movactivos.module';
import { SeguimientoModule } from './vbcoop/seguimiento/seguimiento.module';
import { CarterapasivosModule } from './vbcoop/carterapasivos/carterapasivos.module';
import { CarteraprestamosModule } from './vbcoop/carteraprestamos/carteraprestamos.module';
import { CarteradpfModule } from './resultados/carteradpf/carteradpf.module';
import { ObservacionesAhorroModule } from './resultados/observaciones-ahorro/observaciones-ahorro.module';
import { ObservacionesPrestamoModule } from './resultados/observaciones-prestamo/observaciones-prestamo.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, MenusModule, TipoUsuariosModule, PermisoPantallasModule,
    SociosModule, AportacionesModule, CreditosModule, AhorrosModule, DpfModule, AsignarIdsocioModule, PeriodosModule, MovpasivosModule, MovactivosModule, SeguimientoModule, CarterapasivosModule, CarteraprestamosModule, CarteradpfModule, ObservacionesAhorroModule, ObservacionesPrestamoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
