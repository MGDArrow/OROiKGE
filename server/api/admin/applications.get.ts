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
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, querySchema.parse);

  const sortedBy = [];
  switch (query.sortBy) {
    case 'createdAt':
      sortedBy.push({ [query.sortBy]: query.sortOrder });
      break;
    case 'school':
      sortedBy.push({ [query.sortBy]: query.sortOrder });
      break;
    case 'place':
      sortedBy.push({ [query.sortBy]: query.sortOrder });
      break;
    case 'author':
      sortedBy.push(
        { authorSurname: query.sortOrder },
        { authorName: query.sortOrder },
        { authorFathername: query.sortOrder },
      );
      break;
    case 'teacher':
      sortedBy.push(
        { teacherSurname: query.sortOrder },
        { teacherName: query.sortOrder },
        { teacherFathername: query.sortOrder },
      );
      break;
    case 'representative':
      sortedBy.push(
        { representativeSurname: query.sortOrder },
        { representativeName: query.sortOrder },
        { representativeFathername: query.sortOrder },
      );
      break;
    case 'nomination':
      sortedBy.push(
        { nomination: query.sortOrder },
        { authorOld: query.sortOrder },
      );
      break;
  }

  const data = await prisma.beautyII.findMany({
    orderBy: sortedBy,
  });

  return {
    data,
  };
});
