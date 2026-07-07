import { z } from 'zod';
import prisma from '~~/utils/prisma';

const querySchema = z.object({
  sortBy: z
    .enum([
      'createdAt',
      'school',
      'place',
      'author',
      'teacher',
      'representative',
      'nomination',
    ])
    .optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, querySchema.parse);

  let orderBy = undefined;
  if (query.sortBy && query.sortOrder) {
    const order = query.sortOrder;
    switch (query.sortBy) {
      case 'createdAt':
      case 'school':
      case 'place':
        orderBy = { [query.sortBy]: order };
        break;
      case 'author':
        orderBy = [
          { authorSurname: order },
          { authorName: order },
          { authorFathername: order },
        ];
        break;
      case 'teacher':
        orderBy = [
          { teacherSurname: order },
          { teacherName: order },
          { teacherFathername: order },
        ];
        break;
      case 'representative':
        orderBy = [
          { representativeSurname: order },
          { representativeName: order },
          { representativeFathername: order },
        ];
        break;
      case 'nomination':
        orderBy = [{ nomination: order }, { authorOld: order }];
        break;
    }
  }

  const data = await prisma.beautyII.findMany({
    orderBy: orderBy,
  });

  const authors = new Set();
  const schools = new Set();

  data.forEach((el) => {
    authors.add(
      `${el.authorSurname} ${el.authorName} ${el.authorFathername} ${el.authorOld}`,
    );
    schools.add(el.school);
  });

  const statistic = {
    pictures: data.length,
    authors: authors.size,
    schools: schools.size,
    winners: data.filter((el) => el.place !== null).length,
  };

  return { data, statistic };
});
