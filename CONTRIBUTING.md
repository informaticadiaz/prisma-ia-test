
# Contribuyendo a este proyecto

¡Gracias por tu interés en contribuir a este proyecto! Esta guía te ayudará a entender cómo funciona y cómo puedes empezar a hacer cambios.

## Entendiendo el flujo de trabajo de Prisma

Usamos [Prisma](https://www.prisma.io/) como nuestro ORM (Mapeador Objeto-Relacional) para interactuar con la base de datos. Esto significa que en lugar de escribir SQL directamente, usamos un esquema de Prisma para definir nuestros modelos de datos y Prisma Client para interactuar con ellos de una manera segura y eficiente.

El flujo de trabajo básico es el siguiente:

1.  **Modificar el esquema:** El archivo `prisma/schema.prisma` es la única fuente de verdad para la estructura de tu base de datos. Cada vez que quieras hacer un cambio en la base de datos (añadir una tabla, una columna, etc.), debes empezar por modificar este archivo.

2.  **Crear y aplicar una migración:** Una vez que has modificado el `schema.prisma`, debes crear una nueva migración. Las migraciones son archivos que contienen el SQL necesario para aplicar los cambios a la base de datos. Para crear y aplicar una nueva migración, ejecuta el siguiente comando:

    ```bash
    npx prisma migrate dev --name "nombre-descriptivo-de-la-migracion"
    ```

    Esto hará dos cosas:
    *   Creará un nuevo archivo de migración en la carpeta `prisma/migrations`.
    *   Aplicará la migración a tu base de datos de desarrollo.

3.  **Generar el Prisma Client:** Después de aplicar la migración, debes generar el Prisma Client. El Prisma Client es una librería de TypeScript que se genera a partir de tu esquema de Prisma. Proporciona métodos para interactuar con tu base de datos de una manera segura y con autocompletado. Para generar el cliente, ejecuta el siguiente comando:

    ```bash
    npx prisma generate
    ```

4.  **Escribir el código de la aplicación:** Ahora puedes usar el Prisma Client en tu código para interactuar con la base de datos. El cliente se importa desde `@prisma/client`.

## Estándares de codificación

*   **Nombres de modelos:** Usa PascalCase en singular para los nombres de los modelos (ej. `User`, `Post`).
*   **Nombres de campos:** Usa camelCase para los nombres de los campos (ej. `firstName`, `createdAt`).

## Empezando a desarrollar

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/informaticadiaz/prisma-ia-test.git
    ```
2.  **Instala las dependencias:**
    ```bash
    npm install
    ```
3.  **Explora el esquema:** Echa un vistazo al archivo `prisma/schema.prisma` para entender los modelos de datos existentes.
4.  **Haz tus cambios:** Sigue el flujo de trabajo de Prisma descrito anteriormente para hacer tus cambios.
5.  **Envía un Pull Request:** Cuando estés listo, envía un Pull Request para que tus cambios sean revisados e integrados.
