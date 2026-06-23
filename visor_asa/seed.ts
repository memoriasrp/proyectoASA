// seed.ts
import { PrismaClient } from './generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Cargamos el .env para que process.env.DATABASE_URL tenga la ruta correcta
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('DATABASE_URL no encontrada en el archivo .env');
}

// Creamos el pool nativo y el adaptador requerido por Prisma 7
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Pasamos el adapter como argumento (usando as any para evitar restricciones estrictas del Subset)
const prisma = new PrismaClient({ adapter } as any);

async function main() {
    console.log('Iniciando la carga de datos (seed)...');

    // 1. Crear los Roles en el esquema config
    const adminRole = await prisma.tipoUsuario.create({ data: { nombre: 'Administrador' } });
    const visorRole = await prisma.tipoUsuario.create({ data: { nombre: 'Visor' } });

    // 2. Crear las Opciones de Menú de la Barra Lateral con sus rutas de Angular
    const op1 = await prisma.opcionMenu.create({ data: { nombre: 'Inicio', ruta: '/dashboard/inicio' } });
    const op2 = await prisma.opcionMenu.create({ data: { nombre: 'Visor de Mapas', ruta: '/dashboard/mapa' } });
    const op3 = await prisma.opcionMenu.create({ data: { nombre: 'Usuarios', ruta: '/dashboard/usuarios' } });
    const op4 = await prisma.opcionMenu.create({ data: { nombre: 'Tipos de Usuarios', ruta: '/dashboard/userTypes' } });
    const op5 = await prisma.opcionMenu.create({ data: { nombre: 'Menus', ruta: '/dashboard/menus' } });

    // 3. Asignar Permisos (Admin ve todo, Visor solo Inicio y Mapas)
    await prisma.permisoPantalla.createMany({
        data: [
            { tipoUsuarioId: adminRole.id, opcionMenuId: op1.id },
            { tipoUsuarioId: adminRole.id, opcionMenuId: op2.id },
            { tipoUsuarioId: adminRole.id, opcionMenuId: op3.id },
            { tipoUsuarioId: adminRole.id, opcionMenuId: op4.id },
            { tipoUsuarioId: adminRole.id, opcionMenuId: op5.id },
            { tipoUsuarioId: visorRole.id, opcionMenuId: op1.id },
            { tipoUsuarioId: visorRole.id, opcionMenuId: op2.id },
        ]
    });

    // 4. Crear un Usuario Administrador inicial de prueba
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.usuario.create({
        data: {
            nombre: 'Silvia Rodriguez',
            email: 'admin@mail.com',
            password: hashedPassword,
            tipoUsuarioId: adminRole.id
        }
    });

    console.log('¡Base de datos poblada con éxito!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });