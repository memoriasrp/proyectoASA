// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// Ahora está en la misma carpeta local
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
            throw new Error('DATABASE_URL no está definida en el archivo .env de la raíz');
        }
        const adapter = new PrismaPg({
            connectionString: databaseUrl,
        });

        super({ adapter } as any);
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}