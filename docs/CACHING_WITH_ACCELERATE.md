# Cacheo de Consultas con Prisma Accelerate (`src/caching.ts`)

Este documento detalla cómo se utiliza el cacheo en Prisma Accelerate para optimizar el rendimiento de las consultas a la base de datos, tomando como referencia el archivo `src/caching.ts`.

## ¿Qué es el Cacheo y por qué usarlo?

El cacheo es una técnica que consiste en almacenar temporalmente el resultado de una operación costosa (como una consulta a la base de datos) para que las solicitudes posteriores puedan ser atendidas mucho más rápido. En lugar de volver a consultar la base de datos, se devuelve el resultado desde la memoria (caché).

**Prisma Accelerate** integra esta funcionalidad directamente en el Prisma Client, permitiendo una mejora drástica del rendimiento con una configuración mínima.

## Implementación en `src/caching.ts`

El archivo de ejemplo está diseñado para demostrar el efecto del cacheo midiendo el tiempo que tarda en ejecutarse una consulta.

```typescript
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient()
  .$extends(withAccelerate());

async function main() {
  // Medición de tiempo de inicio
  const startTime = performance.now();

  const cachedUsersWithPosts = await prisma.user.findMany({
    where: {
      email: { contains: "alice" }
    },
    include: { posts: true },
    // Aquí se define la estrategia de cacheo
    cacheStrategy: {
      swr: 30, // 30 segundos
      ttl: 60  // 60 segundos
    }
  });

  // Medición de tiempo de finalización
  const endTime = performance.now();
  const elapsedTime = endTime - startTime;

  console.log(`La consulta tardó ${elapsedTime}ms.`);
}
```

### La Clave: `cacheStrategy`

El objeto `cacheStrategy` le indica a Prisma Accelerate cómo y durante cuánto tiempo debe cachear el resultado de esta consulta específica.

*   `ttl: 60` (**Time-to-Live**)
    *   Define el tiempo máximo que el resultado de la consulta permanecerá en la caché: **60 segundos**.
    *   Si la misma consulta se repite dentro de este período, Accelerate devolverá los datos cacheados casi instantáneamente, sin contactar a la base de datos.

*   `swr: 30` (**Stale-While-Revalidate**)
    *   Define un período de **30 segundos** dentro del `ttl` durante el cual los datos se consideran "viejos" (stale).
    *   Si una consulta llega después de 30 segundos pero antes de los 60, Accelerate hace dos cosas a la vez:
        1.  Devuelve inmediatamente los datos "viejos" de la caché (para que el usuario no espere).
        2.  Ejecuta una consulta en segundo plano a la base de datos para actualizar la caché con datos frescos para la próxima solicitud.

### Resultados Prácticos

*   **Primera ejecución**: La consulta se ejecuta contra la base de datos. El tiempo medido será el real (ej. `50ms`).
*   **Ejecuciones posteriores (dentro de 60s)**: La consulta devuelve los datos desde la caché global de Accelerate. El tiempo medido será mínimo (ej. `1-2ms`), demostrando una ganancia masiva de rendimiento.
