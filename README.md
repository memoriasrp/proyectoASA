# Visor 
Este sistema esta diseñado para controlar:
1. La informacion segun cada cierre mes, siendo los hitos de fecha mas importantes:
    - migracion del sistema Softia (2002-06)
    - Intervencion de la SBS a la cooperativa(2023-03)
    - Corte de operaciones (2023-03-03)
    - Cierre contable (2023-03-28)
    - Calculo de pago interes hasta la fecha (2026-06-30)
2. Comparacion de Resultados entre lo recibido de por la SBS, y lo calculado segun operaciones realizadas en el sistema.
3. Informacion de cada socio y sus productos.
4. Registro y control de seguimiento del contacto con los socios, asi como los compromisos acordados con estos.
5. Calculo de interes de ahorros segun productos.
6. Calculo de interes moratorios y compensatorios de los prestamos a la fecha de contacto con el socio.

---

## 🛠️ Tecnologías y Frameworks Utilizados
**Capa,Tecnología 			  Herramienta,Función 		Uso**
Frontend					      Angular			    				Framework SPA para la interfaz web.
Backend						      NestJS		  		  			Framework de Node.js para la API REST.
Base de Datos				    PostgreSQL				  		"Base de datos relacional para socios, cuentas y créditos."
ORM / Query Engine			Prisma  						  	Mapeo objeto-relacional y consultas SQL a PostgreSQL.
Gestor de Procesos			PM2    								  Despliegue y monitoreo de la aplicación en servidor.
Servidor Web Estático		serve / Nginx					  Entrega del bundle optimizado de producción.

### Frontend
* **[Angular](https://angular.io/) / [React](https://reactjs.org/)** - Framework principal para la interfaz de usuario.
* **[TypeScript](https://www.typescriptlang.org/)** - Lenguaje de programación fuertemente tipado.
* **[Bootstrap](https://getbootstrap.com/) / [Tailwind CSS](https://tailwindcss.com/)** - Estilos y diseño responsivo.

### Backend
* **[NestJS](https://nestjs.com/) / [.NET Core](https://dotnet.microsoft.com/)** - Framework para la construcción del lado del servidor.
* **[Node.js](https://nodejs.org/)** - Entorno de ejecución de JavaScript.

### Base de Datos y ORM
* **[PostgreSQL](https://www.postgresql.org/)** - Sistema de gestión de base de datos relacional.
* **[Prisma](https://www.prisma.io/)** - ORM para la interacción con la base de datos.

### Herramientas y Testing
* **[Postman](https://www.postman.com/)** - Pruebas y documentación de la API RESTful.
* **[Git](https://git-scm.com/) / GitHub** - Control de versiones.

---

## 🚀 Características Principales

* 🔐 **Autenticación:** Inicio de sesión seguro con manejo de tokens (JWT).
* 📊 **Gestión de Datos:** Módulos de registro, consulta y reportes estructurados.
* ⚡ **API RESTful:** Endpoints optimizados para realizar operaciones CRUD.

Dependencias


Autenticación: jwt-decode (manejo e interpretación de tokens JWT en el cliente).
Exportación de Datos: xlsx-js-style (generación de reportes Excel con formato personalizado para la cartera).
Estilos y Maquetación: CSS3 puro, utilidades de Bootstrap / Flexbox (soporte multi-página A4 @media print).

---
## 💻 Requisitos Previos

Asegúrate de tener instalado en tu máquina:
* Node.js (v18 o superior)
* PostgreSQL
* Git

---

## 📦 Instalación y Configuración Local

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/memoriasrp/proyectoASA.git](https://github.com/memoriasrp/proyectoASA.git)


