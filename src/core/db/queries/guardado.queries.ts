
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Permite a un usuario VIAJERO guardar un lugar en su lista de favoritos.
 */
export async function guardarLugarFavorito(lugarId: number, usuarioId: number) {
  console.log(`Usuario ${usuarioId} guardando lugar ${lugarId}`);
  const guardado = await prisma.guardado.create({
    data: {
      lugarId,
      usuarioId,
    },
  });
  console.log('Lugar guardado en favoritos', guardado);
  return guardado;
}

/**
 * Obtiene los lugares favoritos guardados por un usuario.
 */
export async function obtenerFavoritosDeUsuario(usuarioId: number) {
  console.log(`Buscando favoritos del usuario ${usuarioId}`);
  const favoritos = await prisma.guardado.findMany({
    where: { usuarioId },
    include: {
      lugar: { // Incluir la información completa del lugar guardado
        include: {
          ciudad: true,
          categoria: true
        }
      }
    }
  });
  console.log(`Encontrados ${favoritos.length} lugares guardados.`);
  return favoritos;
}
