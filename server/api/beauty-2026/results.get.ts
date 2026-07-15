import prisma from '~~/utils/prisma';

type Place = 'I' | 'II' | 'III' | 'Гран-При' | null;

interface Winner {
  place: Place;
  authorSurname: string;
  authorName: string;
  authorFathername: string;
  authorOld: number;
  jobName: string;
  school: string;
}

interface Group {
  nomination: string;
  ageGroup: string;
  winners: Winner[];
}

interface ResultsResponse {
  totalApplications: number;
  totalSchools: number;
  totalWinners: number;
  groups: Group[];
}

// Порядок мест для сортировки
const placeOrder: Record<string, number> = {
  'Гран-При': 1,
  'I': 2,
  'II': 3,
  'III': 4,
};

// Определение возрастной группы по номинации и возрасту
function getAgeGroup(nomination: string, age: number): string {
  switch (nomination) {
    case '«КРАСОТА ГЛАЗАМИ РЕБЁНКА»':
      return '5–8 лет';
    case '«ОСНОВНАЯ ТЕМАТИКА»':
      return age <= 12 ? '9–12 лет' : '13–17 лет';
    case '«РОСПИСЬ ПО ФАРФОРУ»':
      return '13–17 лет';
    default:
      return 'Другая';
  }
}

// Жёсткий порядок групп
const groupOrder = [
  { nomination: '«КРАСОТА ГЛАЗАМИ РЕБЁНКА»', ageGroup: '5–8 лет' },
  { nomination: '«ОСНОВНАЯ ТЕМАТИКА»', ageGroup: '9–12 лет' },
  { nomination: '«ОСНОВНАЯ ТЕМАТИКА»', ageGroup: '13–17 лет' },
  { nomination: '«РОСПИСЬ ПО ФАРФОРУ»', ageGroup: '13–17 лет' },
];

export default defineEventHandler(async (event): Promise<ResultsResponse> => {
  const applications = await prisma.beautyII.findMany();

  const totalApplications = applications.length;
  const uniqueSchools = new Set(applications.map((app) => app.school));
  const totalSchools = uniqueSchools.size;

  const winners = applications.filter((app) => app.place !== null);
  const totalWinners = winners.length;

  // Группировка победителей по ключу (номинация|возрастная группа)
  const groupsMap = new Map<string, Group>();
  for (const winner of winners) {
    const ageGroup = getAgeGroup(winner.nomination, winner.authorOld);
    const key = `${winner.nomination}|${ageGroup}`;
    if (!groupsMap.has(key)) {
      groupsMap.set(key, {
        nomination: winner.nomination,
        ageGroup,
        winners: [],
      });
    }
    groupsMap.get(key)!.winners.push({
      place: winner.place,
      authorSurname: winner.authorSurname,
      authorName: winner.authorName,
      authorFathername: winner.authorFathername,
      authorOld: winner.authorOld,
      jobName: winner.jobName,
      school: winner.school,
    });
  }

  // Преобразуем Map в массив и сортируем согласно жёсткому порядку
  const groups: Group[] = [];
  for (const order of groupOrder) {
    const key = `${order.nomination}|${order.ageGroup}`;
    const group = groupsMap.get(key);
    if (group) {
      // Сортируем победителей внутри группы по месту
      group.winners.sort((a, b) => {
        const aOrder = placeOrder[a.place || ''] || 999;
        const bOrder = placeOrder[b.place || ''] || 999;
        return aOrder - bOrder;
      });
      groups.push(group);
    }
  }

  return {
    totalApplications,
    totalSchools,
    totalWinners,
    groups,
  };
});
