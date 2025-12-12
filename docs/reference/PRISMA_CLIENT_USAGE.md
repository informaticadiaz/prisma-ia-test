# Guía de Uso de Prisma Client (`src/queries.ts`)

Este documento explica cómo utilizamos **Prisma Client** en el archivo `src/queries.ts` para ejecutar operaciones contra la base de datos. Este archivo sirve como un ejemplo práctico de las capacidades de Prisma.

## Estructura del Archivo

El script está diseñado para ser ejecutado directamente con Node.js y sigue una estructura clara:

1.  **Importaciones**: Se importan `PrismaClient` y la extensión `withAccelerate`.
2.  **Instanciación del Cliente**: Se crea una instancia de `PrismaClient`, que es la puerta de entrada a todas las operaciones de base de datos.
3.  **Función `main`**: Una función `async` que encapsula todas las consultas para poder usar `await` y manejar las operaciones asíncronas de forma limpia.
4.  **Ejecución y Desconexión**: Se invoca a `main` y se asegura que, tanto si la ejecución es exitosa como si falla, la conexión a la base de datos (`prisma.$disconnect()`) se cierre correctamente para liberar recursos.

```typescript
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// 1. Instanciación de Prisma Client con Accelerate
const prisma = new PrismaClient()
  .$extends(withAccelerate());

// 2. Función principal asíncrona
async function main() {
  // ... aquí van todas las consultas
}

// 3. Ejecución y cierre de conexión
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

## Operaciones de Base de Datos

Dentro de la función `main`, se realizan varias operaciones CRUD (Crear, Leer, Actualizar, Borrar) para demostrar el uso de Prisma Client.

### 1. Crear Registros (Create)

Prisma permite crear registros y, al mismo tiempo, crear y anidar registros relacionados en una sola transacción.

**Ejemplo: Crear un `User` y un `Post` anidado.**

```typescript
const user1 = await prisma.user.create({
  data: {
    email: 'alice@prisma.io',
    name: 'Alice',
    posts: { // Crea un post y lo conecta a este usuario
      create: {
        title: 'Join the Prisma community on Discord',
        content: 'https://pris.ly/discord',
        published: true,
      },
    },
  },
});
```

### 2. Leer Registros (Read)

Se pueden buscar múltiples registros con `findMany` y aplicar filtros con la cláusula `where`.

**Ejemplo: Encontrar todos los posts publicados.**
```typescript
const allPosts = await prisma.post.findMany({
  where: { published: true },
});
```

También puedes hacer búsquedas a través de relaciones.

**Ejemplo: Encontrar todos los posts de un autor específico.**
```typescript
const postsByUser = await prisma.post.findMany({
  where: {
    author: {
      email: 'alice@prisma.io',
    },
  },
});
```

### 3. Conectar Registros Relacionados (Connect)

Al crear un nuevo registro, puedes vincularlo a uno ya existente usando `connect`.

**Ejemplo: Crear un `Post` y conectarlo a un `User` existente.**
```typescript
const newPost = await prisma.post.create({
  data: {
    title: 'Join the Prisma Discord community',
    author: {
      connect: { // Conecta este post con el usuario que tenga este email
        email: 'alice@prisma.io',
      },
    },
  },
});
```

### 4. Actualizar Registros (Update)

Con `update`, puedes modificar un registro existente. Se usa `where` para encontrar el registro y `data` para especificar los cambios.

**Ejemplo: Publicar un post que antes era un borrador.**
```typescript
const updatedPost = await prisma.post.update({
  where: {
    id: newPost.id, // Encuentra el post por su ID único
  },
  data: {
    published: true, // Cambia el estado de 'published'
  },
});
```
