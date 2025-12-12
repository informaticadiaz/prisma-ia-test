
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Permite a un usuario VIAJERO agregar una reseña a un lugar.
 */
export async function agregarResena(data: {
  lugarId: number;
  autorId: number;
  rating: number; // Ej: 1-5
  comentario: string;
}) {
  console.log(`Agregando reseña al lugar ${data.lugarId} por el usuario ${data.autorId}`);
  const nuevaResena = await prisma.resena.create({ data });
  console.log('Reseña agregada:', nuevaResena);
  return nuevaResena;
}
