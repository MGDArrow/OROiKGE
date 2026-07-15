<template>
  <div>
    <UIMenu :menu />
    <h2 id="info">УВАЖАЕМЫЕ ПЕДАГОГИ, РОДИТЕЛИ И ДЕТИ!</h2>
    <CompetitionSection>
      <p>
        Отдел религиозного образования и катехизации Горловской епархии
        приглашает Вас принять участие в XXII Международном конкурсе детского
        творчества «Красота Божьего мира». Организаторы конкурса:
      </p>
      <UIList>
        <li>Синодальный Отдел Религиозного Образования и Катехизации;</li>
        <li>АНО Центр образовательных и культурных инициатив «ПОКОЛЕНИЕ»;</li>
        <li>
          Проект реализуется при поддержке Президентского фонда культурных
          инициатив
        </li>
      </UIList>
      <a
        href="https://pravobraz.ru/konkursy/krasota-bozhego-mira/"
        class="organization-competition"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div>
          Организаторы конкурса: Синодальный отдел религиозного образования и
          катехизации
        </div>
        <div>
          <NuxtImg
            src="/logo_soroik.png"
            alt="Синодальный Отдел Религиозного Образования и Катехизации"
          />
        </div>
      </a>
      <h3 id="info-1">
        II региональный этап Конкурса проводится
        <strong>с 1 сентября по 10 ноября 2026 года</strong>, принять участие в
        нем могут учащиеся <strong>с 5 до 17 лет</strong>:
      </h3>
      <UIList>
        <li>образовательных и профессиональных образовательных организаций;</li>
        <li>организаций дополнительного образования;</li>
        <li>воскресных школ;</li>
        <li>
          воспитанники иных детских и образовательных учреждений на территории
          Горловской епархии.
        </li>
      </UIList>

      <h3 id="info-2"><strong>Цели и задачи</strong> Конкурса:</h3>
      <UIList>
        <li>
          духовное просвещение, нравственное и патриотическое воспитание
          подрастающего поколения;
        </li>
        <li>развитие системы дополнительного образования детей;</li>
        <li>
          повышение роли изобразительного и декоративно-прикладного искусства в
          нравственно-эстетическом воспитании учащихся;
        </li>
        <li>
          приобщение молодежи к православной культуре и мировой культуре в
          целом;
        </li>
        <li>
          создание среды для творческого общения детей и юношества России, стран
          ближнего востока и дальнего зарубежья.
        </li>
      </UIList>
      <h3 id="info-3">
        В Конкурсе установлены следующие <strong>номинации:</strong>
      </h3>
      <UIList :type="'ol'">
        <li>
          <strong
            >«КРАСОТА ГЛАЗАМИ РЕБЁНКА» (работы участвуют только в Региональном
            этапе и не отправляются на Международный этап):</strong
          >
          <UIList>
            <li>Рождество Христово;</li>
            <li>Библейские сюжеты;</li>
            <li>Мир духовный и мир земной;</li>
            <li>Любимый храм;</li>
            <li>Красота родной природы;</li>
            <li>Мой дом, моя деревня, мой город;</li>
            <li>Моя семья, мои друзья.</li>
          </UIList>
        </li>
        <li>
          <strong>«ОСНОВНАЯ ТЕМАТИКА»:</strong>
          <UIList>
            <li>Рождество Христово;</li>
            <li>Библейские сюжеты;</li>
            <li>Мир духовный и мир земной;</li>
            <li>Любимый храм;</li>
            <li>Красота родной природы;</li>
            <li>Мой дом, моя деревня, мой город;</li>
            <li>Моя семья, мои друзья.</li>
          </UIList>
        </li>
        <li>
          <strong>«РОСПИСЬ ПО ФАРФОРУ»:</strong>
          <UIList>
            <li>Монастыри и храмы Москвы;</li>
            <li>Утраченная Москва;</li>
            <li>Значимые места моего края;</li>
            <li>Эскизы, посвященные юбилейным датам страны.</li>
          </UIList>
        </li>
      </UIList>
      <h3 id="info-4">
        Конкурс проводится в следующих
        <strong>возрастных группах</strong>:
      </h3>
      <UIList>
        <li><strong>«КРАСОТА ГЛАЗАМИ РЕБЁНКА»</strong>, (5–8 лет);</li>
        <li><strong>«ОСНОВНАЯ ТЕМАТИКА»</strong>, первая группа (9–12 лет);</li>
        <li>
          <strong>«ОСНОВНАЯ ТЕМАТИКА»</strong>, вторая группа (13–17 лет);
        </li>
        <li><strong>«РОСПИСЬ ПО ФАРФОРУ»</strong>, (13–17 лет).</li>
      </UIList>
      <p>
        Отражая в своих работах всё то, что окружает их в повседневной жизни —
        свою семью, друзей, родной дом и город, природу в разных ее проявлениях,
        перенося на бумагу свое видение сотворенного Богом мира, дети учатся
        видеть вокруг себя прекрасное, а значит – любить свою землю, свою
        Родину.
      </p>
      <p>
        Все участники получат Сертификаты. По итогам регионального этапа
        Конкурса <strong>жюри отберет 18 работ</strong>, которые будут
        отправлены в город Москву на заключительный этап. Также будут отобраны
        <strong>6 работ победителей</strong> в номинации «Красота глазами
        ребёнка», которые не будут отправлены на Международный этап, но будут
        отмечены призовыми местами Горловской Епархии.
      </p>
      <p id="info-5">
        Работы принимаются <strong>с 1 сентября до 31 октября 2026 г.</strong> в
        храмах на иконных лавках, по следующим адресам:
      </p>
      <UIList>
        <li>
          <strong>Город Горловка</strong> — Богоявленский кафедральный собор
          (Центрально-Городской район, Соборная площадь);
        </li>
        <li>
          <strong>Город Енакиево</strong> — Покровский собор (пр. Металлургов,
          21);
        </li>
        <li>
          <strong>Город Шахтёрск</strong> — Храм святого апостола Иоанна
          Богослова (ул. Коммунаров, 1а);
        </li>
        <li>
          <strong>Город Дебальцево</strong> — Александро-Невский храм (ул.
          Калинина, 52);
        </li>
        <li>
          <strong>Город Ждановка</strong> — Андреевский храм (ул. Школьная, 3);
        </li>
        <li>
          <strong>Город Кировское</strong> — Храм cвятого праведного Иоанна
          Кронштадтского (Космический переулок).
        </li>
      </UIList>
      <h3 id="info-6">
        <strong>Контакты организаторов регионального этапа Конкурса:</strong>
      </h3>
      <p>
        Протоиерей Кирилл Щевелев, руководитель Отдела религиозного образования
        и катехизации Горловской епархии:
      </p>

      <UIList>
        <li>
          <strong>Телефон: </strong>
          <a href="tel:79495208117">+7 (949) 520-81-17</a>
        </li>
        <li>
          <strong>E-mail: </strong>
          <a href="mailto:MGD.Kirill.Sch@yandex.ru">MGD.Kirill.Sch@yandex.ru</a>
        </li>
      </UIList>
    </CompetitionSection>

    <CompetitionSection>
      <h2 id="docs">Документы для конкурса</h2>
      <UIDocumentWrap>
        <UIDocumentCard
          v-for="doc in docs"
          :key="doc.href"
          :size="doc.size"
          :href="doc.href"
          >{{ doc.name }}</UIDocumentCard
        >
      </UIDocumentWrap>
    </CompetitionSection>

    <CompetitionSection>
      <h2 id="order">Подать заявку</h2>
      <p><strong>Для участия в конкурсе необходимо:</strong></p>
      <UIList :type="'ul'">
        <li>
          Ознакомиться с
          <a href="#docs"
            >документами конкурса (Положениями международного и регионального
            этапов)</a
          >;
        </li>
        <li>
          Ознакомиться с <a href="#info-3">номинациями</a>,
          <a href="#info-4">возрастными группами</a>, а также
          <a href="#docs">требованиями к работам</a>;
        </li>

        <li>
          Сделать ксерокопию паспорта (или свидетельства о рождении) участника
          конкурса (на каждую работу отдельный экземпляр);
        </li>
        <li>
          Заполнить и подать заявку (для каждой работы новая заявка) на участие
          в региональном этапе, на сайте ОРОиК Горловской епархии;
        </li>
        <li>
          После заполнения заявки скачать ярлык на обратную сторону рисунка,
          распечатать и приклеить;
        </li>
        <li>
          Заполнить <a href="#docs">согласие на передачу авторских прав</a>, а
          также
          <a href="#docs">согласие на обработку персональных данных</a> (на
          каждую работу отдельный экземпляр). Для удобства наполовину
          заполненные образцы скачиваются вместе с ярлыком после заполнения
          заявки;
        </li>
        <li>
          Подготовить работу с ярлыком, а также полный пакет документов
          (паспорт/свидетельство о рождении, 2 согласия);
        </li>
        <li>
          Отнести по
          <a href="#info-5">указанным адрессам в указанные сроки</a> работу c
          ярлыком и пакет документов.
        </li>
      </UIList>

      <div
        class="order__disabled"
        v-if="dateCurrent && dateCurrent < dateStart"
      >
        Приём заявок начнётся: {{ dateStart.toLocaleDateString() }}
      </div>
      <div
        class="order__new"
        @click="isOpenPopupOrder = true"
        v-if="dateCurrent && dateCurrent >= dateStart && dateCurrent <= dateEnd"
      >
        Подать заявку
      </div>
      <div class="order__disabled" v-if="dateCurrent && dateCurrent > dateEnd">
        Приём заявок завершился {{ dateEnd.toLocaleDateString() }}
      </div>
    </CompetitionSection>

    <CompetitionSection>
      <h2 id="winners">Итоги и победители конкурса</h2>

      <div style="text-align: center">
        {{
          status === 'before'
            ? `Ожидаем начало Конкурса`
            : status === 'during'
              ? 'Идёт приём заявок на Конкурс'
              : status === 'after' && !data?.totalWinners
                ? 'Идёт подведение итогов конкурса'
                : ''
        }}
      </div>

      <div
        v-if="status !== 'before'"
        class="results"
        :class="{ grey: data.totalWinners === 0 }"
      >
        <div class="results__item">
          <div>{{ data.totalApplications }}</div>
          <span>работ участников</span>
        </div>
        <div class="results__item">
          <div>{{ data.totalSchools }}</div>
          <span>организации</span>
        </div>
        <div
          v-if="status === 'after' && data.totalWinners > 0"
          class="results__item"
        >
          <div>{{ data.totalWinners }}</div>
          <span>победителей</span>
        </div>
      </div>

      <div
        v-if="status === 'after' && data.totalWinners > 0"
        class="results__nominations"
      >
        <div
          v-for="group in data.groups"
          :key="`${group.nomination}-${group.ageGroup}`"
          class="results__nominatia"
          :class="{
            full:
              group.nomination === '«КРАСОТА ГЛАЗАМИ РЕБЁНКА»' ||
              group.nomination === '«РОСПИСЬ ПО ФАРФОРУ»',
          }"
        >
          <span>{{ formatGroupTitle(group) }}</span>
          <UIList>
            <li
              v-for="winner in group.winners"
              :key="winner.authorSurname + winner.authorName"
            >
              <strong>{{ formatPlace(winner.place) }}</strong> —
              {{ winner.authorSurname }} {{ winner.authorName }}
              {{ winner.authorFathername }} ({{ winner.authorOld }} лет), «{{
                winner.jobName
              }}»
            </li>
          </UIList>
        </div>
      </div>
    </CompetitionSection>

    <Teleport to="body">
      <WidgetsFormsBeauty2026
        v-if="isOpenPopupOrder"
        @close-popup="isOpenPopupOrder = false"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
  interface IDoc {
    size?: string | null;
    href: string;
    name: string;
  }

  // Даты конкурса (при необходимости скорректировать)
  const dateStart = new Date(2025, 8, 1);
  const dateEnd = new Date(2026, 5, 31);

  const dateCurrent = ref<Date | null>(null);
  onMounted(() => {
    dateCurrent.value = new Date();
  });

  // Загрузка результатов
  const { data, pending, error } = useAsyncData(
    'beauty2026-results',
    () => $fetch('/api/beauty-2026/results'),
    {
      default: () => ({
        totalApplications: 0,
        totalSchools: 0,
        totalWinners: 0,
        groups: [],
      }),
    },
  );

  // Статус конкурса
  const status = computed<'before' | 'during' | 'after'>(() => {
    if (!dateCurrent.value) return 'before';
    if (dateCurrent.value < dateStart) return 'before';
    if (dateCurrent.value <= dateEnd) return 'during';
    return 'after';
  });

  // Форматирование заголовка группы
  function formatGroupTitle(group: {
    nomination: string;
    ageGroup: string;
  }): string {
    const nomMap: Record<string, string> = {
      'КРАСОТА ГЛАЗАМИ РЕБЁНКА': '«Красота глазами ребёнка»',
      'ОСНОВНАЯ ТЕМАТИКА': '«Основная тематика»',
      'РОСПИСЬ ПО ФАРФОРУ': '«Роспись по фарфору»',
    };
    return `${nomMap[group.nomination] || group.nomination} (${group.ageGroup})`;
  }

  // Форматирование места
  function formatPlace(place: string | null): string {
    if (!place) return '';
    const map: Record<string, string> = {
      'I': '1-е место',
      'II': '2-е место',
      'III': '3-е место',
      'Гран-При': 'Гран-При',
    };
    return map[place] || place;
  }

  // --- Остальные данные ---
  const isOpenPopupOrder = ref(false);

  const docs: Array<IDoc> = [
    {
      size: '3.06 Mb',
      href: `https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/docs/01_Положение о конкурсе 'Красота Божьего мира'.pdf`,
      name: `Положение международного этапа`,
    },
    {
      size: '2.80 Mb',
      href: `https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/docs/01_Положение регионального этапа о конкурсе.pdf`,
      name: `Положение регионального этапа`,
    },
    {
      size: '3.37 Mb',
      href: `https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/docs/03_Требования к работам.pdf`,
      name: `Требования к работам`,
    },
    {
      size: '17 Kb',
      href: `https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/docs/05_Согласие на передачу авторских прав.docx`,
      name: `Согласие на передачу авторских прав`,
    },
    {
      size: '21 Kb',
      href: `https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/docs/06_Согласие на обработку персональных данных.docx`,
      name: `Согласие на обработку персональных данных`,
    },
  ];

  const menu = [
    { name: 'Информация о конкурсе', id: 'info', lvl: 1 },
    { name: 'Сроки проведения', id: 'info-1', lvl: 2 },
    { name: 'Цели и задачи', id: 'info-2', lvl: 2 },
    { name: 'Номинации', id: 'info-3', lvl: 2 },
    { name: 'Возрастные группы', id: 'info-4', lvl: 2 },
    { name: 'Приём работ', id: 'info-5', lvl: 2 },
    { name: 'Контакты организаторов', id: 'info-6', lvl: 2 },
    { name: 'Документы для конкурса', id: 'docs', lvl: 1 },
    { name: 'Подать заявку', id: 'order', lvl: 1 },
    { name: 'Итоги и победители конкурса', id: 'winners', lvl: 1 },
  ];
</script>

<style scoped lang="scss">
  .order {
    &__new,
    &__disabled {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      min-width: 300px;
      height: 100px;
      margin: 30px auto;
      font-weight: 600;
      text-align: center;
      text-transform: uppercase;
      border: 5px solid var(--accent);
    }
    &__new {
      font-size: 1.6em;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        color: var(--color-white);
        background: var(--accent);
      }
    }
    &__disabled {
      color: grey;
      border-color: grey;
    }
  }
</style>
