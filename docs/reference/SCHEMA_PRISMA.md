# ¿Qué es y para qué sirve `prisma/schema.prisma`?

Este archivo es el pilar de tu proyecto con Prisma. Define todo lo relacionado con tu base de datos de una manera legible y declarativa. Es la **única fuente de verdad** para la estructura de tu base de datos.

Se divide en tres partes principales:

### 1. `datasource`

Especifica los detalles de conexión a tu base de datos. Le dice a Prisma:

*   **`provider`**: Qué tipo de base de datos estás usando (ej. PostgreSQL, MySQL, SQLite).
*   **`url`**: Dónde encontrar la base de datos. Generalmente, esta es una URL de conexión que se carga de forma segura desde una variable de entorno (`.env`) para no exponer credenciales en el código fuente.

**Ejemplo:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 2. `generator`

Configura los recursos que se generan automáticamente a partir de tu esquema. El generador más común y fundamental es `prisma-client-js`.

*   **`provider = "prisma-client-js"`**: Este generador lee tus modelos (`User`, `Post`, etc.) y sus relaciones para crear el **Prisma Client**.
*   **Prisma Client**: Es una librería de TypeScript totalmente tipada y optimizada para realizar consultas a tu base de datos. Proporciona autocompletado y seguridad de tipos, lo que previene errores comunes al interactuar con la base de datos.

**Ejemplo:**
```prisma
generator client {
  provider = "prisma-client-js"
}
```

### 3. `model`

Aquí es donde defines la estructura de tu aplicación.

*   **Mapeo a Tablas**: Cada bloque `model` se corresponde con una tabla en tu base de datos.
*   **Campos y Columnas**: Los campos definidos dentro de un modelo (ej. `id`, `email`, `name`) representan las columnas de esa tabla.
*   **Tipos de Datos**: A cada campo se le asigna un tipo (ej. `Int`, `String`, `DateTime`).
*   **Atributos**: Puedes usar atributos (`@`) para definir características especiales como llaves primarias (`@id`), valores por defecto (`@default`), campos únicos (`@unique`), etc.
*   **Relaciones**: También defines las relaciones entre los modelos, como uno a muchos (un `User` tiene muchos `Post`) o uno a uno.

**Ejemplo:**
```prisma
model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  posts   Post[] // Relación: Un usuario puede tener muchos posts
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  author    User?   @relation(fields: [authorId], references: [id]) // Relación inversa
  authorId  Int?
}
```
