-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "config";

-- CreateTable
CREATE TABLE "config"."TipoUsuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "TipoUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "config"."OpcionMenu" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ruta" TEXT NOT NULL,
    "icono" TEXT,

    CONSTRAINT "OpcionMenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "config"."PermisoPantalla" (
    "id" SERIAL NOT NULL,
    "tipoUsuarioId" INTEGER NOT NULL,
    "opcionMenuId" INTEGER NOT NULL,

    CONSTRAINT "PermisoPantalla_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "config"."Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tipoUsuarioId" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TipoUsuario_nombre_key" ON "config"."TipoUsuario"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "PermisoPantalla_tipoUsuarioId_opcionMenuId_key" ON "config"."PermisoPantalla"("tipoUsuarioId", "opcionMenuId");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "config"."Usuario"("email");

-- AddForeignKey
ALTER TABLE "config"."PermisoPantalla" ADD CONSTRAINT "PermisoPantalla_tipoUsuarioId_fkey" FOREIGN KEY ("tipoUsuarioId") REFERENCES "config"."TipoUsuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "config"."PermisoPantalla" ADD CONSTRAINT "PermisoPantalla_opcionMenuId_fkey" FOREIGN KEY ("opcionMenuId") REFERENCES "config"."OpcionMenu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "config"."Usuario" ADD CONSTRAINT "Usuario_tipoUsuarioId_fkey" FOREIGN KEY ("tipoUsuarioId") REFERENCES "config"."TipoUsuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
