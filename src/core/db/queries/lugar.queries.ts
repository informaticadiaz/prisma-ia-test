
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// --- Funciones de Creación (Write) ---

/**
 * Crea un nuevo lugar en la base de datos.
 * Idealmente llamado por un usuario PROPIETARIO o ADMIN.
 */
export async function crearLugar(data: {
  nombre: string;
  descripcion: string;
  direccion: string;
  categoriaId: number;
  ciudadId: number;
  propietarioId?: number;
  latitud?: number;
  longitud?: number;
}) {
  console.log(`Creando lugar: ${data.nombre}`);
  const nuevoLugar = await prisma.lugar.create({ data });
  console.log('Lugar creado con éxito:', nuevoLugar);
  return nuevoLugar;
}

// --- Funciones de Lectura (Read) ---

/**
 * Obtiene un lugar específico por su ID, incluyendo sus relaciones.
 */
export async function obtenerLugarPorId(id: number) {
  console.log(`Buscando lugar con ID: ${id}`);
  const lugar = await prisma.lugar.findUnique({
    where: { id },
    include: {
      categoria: true,
      ciudad: {
        include: {
          provincia: true,
        },
      },
      resenas: {
        include: {
          autor: {
            select: { nombre: true }, // Solo traer el nombre del autor
          },
        },
      },
      media: true,
    },
  });
  console.log('Lugar encontrado:', lugar);
  return lugar;
}

/**
 * Obtiene una lista de lugares, con filtros opcionales.
 */
export async function obtenerLugares(filtros?: {
  provinciaId?: number;
  categoriaId?: number;
  pagina?: number;
}) {
  const take = 10;
  const skip = filtros?.pagina ? (filtros.pagina - 1) * take : 0;

  console.log('Buscando lugares con filtros:', filtros);
  const lugares = await prisma.lugar.findMany({
    where: {
      ciudad: {
        provinciaId: filtros?.provinciaId,
      },
      categoriaId: filtros?.categoriaId,
    },
    include: {
      ciudad: { select: { nombre: true, provincia: { select: { nombre: true } } } },
      categoria: { select: { nombre: true } },
    },
    take,
    skip,
  });
  console.log(`Encontrados ${lugares.length} lugares.`);
  return lugares;
}
