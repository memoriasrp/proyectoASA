// src/prisma/prisma.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Al hacerlo global, no tendrás que importarlo individualmente en cada módulo
@Module({
    providers: [PrismaService],
    exports: [PrismaService], // Esto permite que otros servicios lo inyecten
})
export class PrismaModule { }