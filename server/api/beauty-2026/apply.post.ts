import { z } from 'zod';
import prisma from '../../../utils/prisma';

// Схема валидации тела запроса
const applicationSchema = z.object({
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
  representativeSurname: z.string().min(1, 'Фамилия представителя обязательна'),
  representativeName: z.string().min(1, 'Имя представителя обязательно'),
  representativeFathername: z
    .string()
    .min(1, 'Отчество представителя обязательно'),
  representativePhone: z.string().min(1, 'Телефон представителя обязателен'),
  teacherSurname: z.string().min(1, 'Фамилия педагога обязательна'),
  teacherName: z.string().min(1, 'Имя педагога обязательно'),
  teacherFathername: z.string().min(1, 'Отчество педагога обязательно'),
  teacherPhone: z.string().min(1, 'Телефон педагога обязателен'),
  school: z.string().min(1, 'Учебное заведение обязательно'),
});
const jobInfoSchema = z.object({
  size: z.string().min(1, 'Размер работы обязательно'),
  matherial: z.string().min(1, 'Материал работы обязательно'),
  tecnology: z.string().min(1, 'Техника работы обязательно'),
  year: z.number().int().min(2011).max(2026),
  city: z.string().min(1, 'Место создания работы обязательно'),
});

async function generateApplicationNumber(): Promise<string> {
  while (true) {
    const num = Math.floor(100000 + Math.random() * 900000).toString();
    const existing = await prisma.BeautyII.findUnique({
      where: { number: num },
    });
    if (!existing) return num;
  }
}

export default defineEventHandler(async (event) => {
  try {
    const { order, jobInfo } = await readBody(event);

    const validated = applicationSchema.parse(order);
    const validatedInfo = jobInfoSchema.parse(jobInfo);
    const number = await generateApplicationNumber();
    const data = { ...validated, number };

    const label = await $fetch('/api/beauty-2026/label', {
      method: 'POST',
      body: { ...data, ...validatedInfo },
      responseType: 'blob',
    });

    const arrayBuffer = await label.arrayBuffer();
    const pdfBase64Label = Buffer.from(arrayBuffer).toString('base64');

    await prisma.BeautyII.create({
      data,
    });

    return {
      success: true,
      data,
      pdfBase64Label,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        message: 'Ошибка валидации данных',
        data: error.errors,
      });
    }

    console.error('Ошибка при сохранении заявки:', error);
    throw createError({
      statusCode: 500,
      message: 'Внутренняя ошибка сервера',
    });
  }
});
