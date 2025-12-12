
# Guía para Desarrolladores de EscapadasGram

## 1. Introducción

Este documento proporciona toda la información necesaria para configurar el entorno de desarrollo, entender la arquitectura y contribuir al backend de EscapadasGram.

## 2. Puesta en Marcha del Entorno Local

Sigue estos pasos para tener una copia del proyecto funcionando en tu máquina.

### a. Prerrequisitos

- Node.js (v18 o superior)
- npm
- Git

### b. Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone <URL-del-repositorio>
    cd escapadasgram-backend
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

### c. Configuración de la Base de Datos

El proyecto usa Prisma para comunicarse con una base de datos PostgreSQL alojada en Supabase.

1.  **Crea el archivo `.env`:**
    Crea un archivo llamado `.env` en la raíz del proyecto.

2.  **Añade la URL de la Base de Datos:**
    Dentro de `.env`, añade tu `DATABASE_URL` de Supabase. Esta URL es la que permite a Prisma conectarse y gestionar la base de datos.
    ```
    DATABASE_URL="postgresql://..."
    ```
    *Nota: Por seguridad, este archivo nunca se debe subir al repositorio de Git.*

3.  **Aplica las Migraciones:**
    Este comando leerá el `schema.prisma` y creará las tablas y columnas correspondientes en tu base de datos.
    ```bash
    npx prisma migrate dev
    ```

4.  **Genera el Cliente de Prisma:**
    Para asegurar que tu código tiene los tipos más actualizados que coinciden con tu esquema de base de datos, ejecuta:
    ```bash
    npx prisma generate
    ```

¡Con estos pasos, tu entorno de desarrollo está listo!

## 3. Testing

Utilizamos **Vitest** para las pruebas. Los tests se encuentran en la carpeta `src/tests/`.

### Estado Actual de los Tests

- **Tests Unitarios:** Funcionan correctamente. Puedes ejecutar `npm test` para correrlos. Tenemos un test (`simple.test.ts`) que valida que la configuración de Vitest es correcta.

- **Tests de Integración con Base de Datos:** **(En Desarrollo)**. La conexión directa con la base de datos desde los tests está actualmente en fase de implementación y **aún no es funcional**. Este es el principal foco de desarrollo actual.
