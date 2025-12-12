# Contribuyendo a este proyecto

¡Gracias por tu interés en contribuir a este proyecto! Esta guía te ayudará a entender cómo puedes empezar a hacer cambios.

## Entendiendo el flujo de trabajo de Prisma

Usamos [Prisma](https://www.prisma.io/) como nuestro ORM para interactuar con la base de datos. El flujo de trabajo básico es el siguiente:

1.  **Modificar el esquema:** El archivo `prisma/schema.prisma` es la única fuente de verdad para la estructura de tu base de datos.

2.  **Crear y aplicar una migración:** Una vez que has modificado el `schema.prisma`, debes crear una nueva migración.

    **¡NOTA IMPORTANTE SOBRE SUPABASE!**

    Nuestra base de datos en Supabase requiere usar una URL de conexión **directa** (puerto `5432`) específicamente para las migraciones. Esta URL debe estar definida como `DIRECT_URL` en tu archivo `.env`.

    Para crear y aplicar la migración correctamente, ejecuta el siguiente comando:

    ```bash
    DATABASE_URL=$(grep DIRECT_URL .env | cut -d '=' -f2) npx prisma migrate dev --name "nombre-descriptivo-del-cambio"
    ```

    Este comando asegura que se use la URL correcta para el proceso de migración.

3.  **Generar el Prisma Client:** Después de aplicar la migración, debes generar el Prisma Client. El cliente se actualiza para reflejar los nuevos cambios en el esquema.

    ```bash
    npx prisma generate
    ```

4.  **Escribir el código de la aplicación:** Ahora puedes usar el `PrismaClient` importado desde `@prisma/client`. Este cliente usará automáticamente la `DATABASE_URL` (la de conexión "pooled") del archivo `.env` para las operaciones diarias.

## Estándares de codificación

*   **Nombres de modelos:** Usa PascalCase en singular para los nombres de los modelos (ej. `User`, `Post`).
*   **Nombres de campos:** Usa camelCase para los nombres de los campos (ej. `firstName`, `createdAt`).

## Empezando a desarrollar

1.  **Clona el repositorio.**
2.  **Instala las dependencias (`npm install`).**
3.  **Configura tu archivo `.env`** como se describe en el `README.md`.
4.  **Explora el esquema:** Echa un vistazo al archivo `prisma/schema.prisma`.
5.  **Haz tus cambios:** Sigue el flujo de trabajo de Prisma descrito anteriormente.
6.  **Envía un Pull Request.**
