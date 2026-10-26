import { z } from 'zod';
import prisma from '../../../utils/prisma';

const bodySchema = z.object({
  jobName: z.string().min(1, 'Название работы обязательно'),
  nomination: z.enum([
    '«КРАСОТА ГЛАЗАМИ РЕБЁНКА»',
    '«ОСНОВНАЯ ТЕМАТИКА»',
    '«РОСПИСЬ ПО ФАРФОРУ»',
  ]),
  authorSurname: z.string().min(1, 'Фамилия автора обязательна'),
  authorName: z.string().min(1, 'Имя автора обязательно'),
  authorFathername: z.string().min(1, 'Отчество автора обязательно'),
  authorOld: z.number().int().min(5).max(17),
  school: z.string().min(1, 'Учебное заведение обязательно'),
});

async function generateApplicationNumber(): Promise<string> {
  while (true) {
    const num = Math.floor(100000 + Math.random() * 900000).toString();
    const existing = await prisma.beautyII.findUnique({
      where: { number: num },
    });
    if (!existing) return num;
  }
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const validated = bodySchema.parse(body);
    const number = await generateApplicationNumber();

    const data = await prisma.beautyII.create({
      data: { ...validated, number },
    });

    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        message: 'Ошибка валидации данных',
        data: error.errors,
      });
    }
    console.error('Ошибка при ручном добавлении заявки:', error);
    throw createError({
      statusCode: 500,
      message: 'Внутренняя ошибка сервера',
    });
  }
});
