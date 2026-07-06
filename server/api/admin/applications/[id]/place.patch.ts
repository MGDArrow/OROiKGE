import { z } from 'zod';
import prisma from '~~/utils/prisma';

const bodySchema = z.object({
  place: z.enum(['I', 'II', 'III', 'Гран-При']).nullable(),
});

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  if (!id) throw createError({ statusCode: 400, message: 'ID не указан' });

  const body = await readValidatedBody(event, bodySchema.parse);

  const updated = await prisma.beautyII.update({
    where: { id: Number(id) },
    data: { place: body.place },
  });

  return { success: true, data: updated };
});
