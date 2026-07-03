<template>
  <div>
    <UIMenu :menu />
    <h2 id="info">УВАЖАЕМЫЕ ПЕДАГОГИ!</h2>
    <CompetitionSection>
      <p>
        Отдел религиозного образования и катехизации Горловской епархии
        приглашает Вас принять участие в XXI Международном конкурсе детского
        творчества «Красота Божьего мира». Организаторы конкурса – Синодальный
        отдел религиозного образования и катехизации и автономная некоммерческая
        организация Центр образовательных и культурных инициатив «ПОКОЛЕНИЕ»,
        проект реализуется при поддержке Президентского фонда культурных
        инициатив.
      </p>
      <h3 id="info-1">
        Региональный этап Конкурса проводится
        <strong>с 1 сентября по 28 октября 2025 года</strong>, принять участие в
        нем могут учащиеся <strong>с 9 до 17 лет</strong>:
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
          <strong>«ОСНОВНАЯ ТЕМАТИКА»</strong>
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
          <strong>«РОСПИСЬ ПО ФАРФОРУ»</strong>
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
        <li><strong>«ОСНОВНАЯ ТЕМАТИКА»</strong>, первая группа (9–12 лет);</li>
        <li>
          <strong>«ОСНОВНАЯ ТЕМАТИКА»</strong>, вторая группа (13–17 лет);
        </li>
        <li><strong>«РОСПИСЬ ПО ФАРФОРУ»</strong> (13–17 лет).</li>
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
        отправлены в город Москву на заключительный этап.
      </p>
      <p id="info-5">
        Работы принимаются <strong>с 1 сентября до 26 октября 2025 г.</strong> в
        храмах на иконных лавках, по следующим адресам:
      </p>
      <UIList>
        <li>
          Богоявленский кафедральный собор, город Горловка — г. Горловка,
          Центрально-Городской район, Соборная площадь. С 07:00 по 16:00.
          Контактный номер для связи: +7 (949) 520-81-17 (прот. Кирилл Щевелев).
        </li>
        <li>
          Покровский собор, город Енакиево — г. Енакиево, пр. Металлургов, 21;
        </li>
        <li>
          Храм святого апостола Иоанна Богослова — г. Шахтёрск, ул. Коммунаров,
          1а;
        </li>
        <li>Александро-Невский храм — г. Дебальцево, ул. Калинина, 52;</li>
        <li>Андреевский храм — г. Ждановка, ул. Школьная, 3.</li>
      </UIList>
      <h3 id="info-6">
        <strong>Контакты организаторов регионального этапа Конкурса:</strong>
      </h3>
      <UIList>
        <li>
          Протоиерей Кирилл Щевелев, руководитель Отдела религиозного
          образования и катехизации Горловской епархии. тел.: +7 (949) 520-81-17
          // e-mail: MGD.Kirill.Sch@yandex.ru
        </li></UIList
      >
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
      <h2 id="photos">Фотогалерея</h2>
      <UIPhotos :images="photosJury" />
    </CompetitionSection>

    <CompetitionSection>
      <h2 id="winners">Итоги и победители конкурса</h2>
      <div class="results">
        <div class="results__item">
          <div>76</div>
          <span>работ участников</span>
        </div>
        <div class="results__item">
          <div>27</div>
          <span>организации</span>
        </div>
        <div class="results__item">
          <div>17</div>
          <span>победителей</span>
        </div>
      </div>
      <div class="results__nominations">
        <div class="results__nominatia">
          <span>«Основная тематика» (9–12 лет)</span>
          <UIList>
            <li>
              <strong>1-е место</strong> — Лихачев Павел (12 лет), «Священная
              память»;
            </li>
            <li>
              <strong>2-е место</strong> — Лебедь Дарья (12 лет), «Моя
              Горловка»;
            </li>
            <li>
              <strong>2-е место</strong> — Близнюк Ева (10 лет), «На Валааме»;
            </li>
            <li>
              <strong>3-е место</strong> — Дьяченко Дарина (12 лет), «Мир
              добра»;
            </li>
            <li>
              <strong>3-е место</strong> — Григорьева Варвара (10 лет), «Божьи
              творенья»;
            </li>
            <li>
              <strong>3-е место</strong> — Кашлюнова Николь (11 лет), «Радость
              бытия».
            </li>
          </UIList>
        </div>
        <div class="results__nominatia">
          <span>«Основная тематика» (13–17 лет)</span>
          <UIList>
            <li>
              <strong>1-е место</strong> — Киселев Владислав (16 лет),
              «Богоявленский кафедральный собор (Горловка)»;
            </li>
            <li>
              <strong>2-е место</strong> — Володкевич Полина (14 лет), «Зов
              колоколен»;
            </li>
            <li>
              <strong>2-е место</strong> — Свириденко Полина (14 лет),
              «Казанский храм г. Горловка»;
            </li>
            <li>
              <strong>3-е место</strong> — Кирносова Виктория (14 лет), «Мир
              моего дома»;
            </li>
            <li>
              <strong>3-е место</strong> — Агаева София (13 лет), «Семейные
              ценности»;
            </li>
            <li>
              <strong>3-е место</strong> — Хроменко Никита (15 лет), «Мой
              собор».
            </li>
          </UIList>
        </div>
        <div class="results__nominatia full">
          <span>«Роспись по фарфору» (13–17 лет)</span>
          <UIList>
            <li>
              <strong>1-е место</strong> — Козюра Владислава (14 лет), «Утро в
              Новодевичьем монастыре»;
            </li>
            <li>
              <strong>2-е место</strong> — Трофимец Дарья (15 лет),
              «Троице-Сергиевская Лавра»;
            </li>
            <li>
              <strong>2-е место</strong> — Ключник Юлиана (15 лет), «Моя
              Горловка»;
            </li>
            <li>
              <strong>3-е место</strong> — Попова Алина (17 лет), «Накануне
              Рождества»;
            </li>
            <li>
              <strong>3-е место</strong> — Терехичева Елизавета (13 лет),
              «Церковь Похвалы Пресвятой Богородицы».
            </li>
          </UIList>
        </div>
      </div>

      <UIPhotos :images="photosWinners" />
    </CompetitionSection>
  </div>
</template>

<script setup lang="ts">
  interface IDoc {
    size?: string | null;
    href: string;
    name: string;
  }

  const docs: Array<IDoc> = [
    {
      size: '3.06 Mb',
      href: `https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/docs/01_Положение о конкурсе 'Красота Божьего мира'.pdf`,
      name: `Положение о конкурсе 'Красота Божьего мира'`,
    },
    {
      size: '2.80 Mb',
      href: `https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/docs/01_Положение регионального этапа о конкурсе.pdf`,
      name: `Положение о конкурсе регионального этапа`,
    },
    {
      size: '633 Kb',
      href: `https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/docs/02_Номинации регионального этапа.pdf`,
      name: `Номинации регионального этапа`,
    },
    {
      size: '3.37 Mb',
      href: `https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/docs/03_Требования к работам.pdf`,
      name: `Требования к работам`,
    },
    {
      size: '720 Kb',
      href: `https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/docs/04_Призовые места регионального этапа.pdf`,
      name: `Призовые места регионального этапа`,
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
    {
      size: '13 Kb',
      href: `https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/docs/07_Ярлычк на рисунке с обратной стороны.docx`,
      name: `Ярлык на рисунке с обратной стороны`,
    },
  ];

  const photosJury = [
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/jury (1).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/jury (2).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/jury (3).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/jury (4).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/jury (5).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/jury (6).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/jury (7).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/jury (8).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/jury (9).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/jury (10).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/jury (11).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/jury (12).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/jury (13).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/jury (14).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/jury (15).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/jury (16).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/jury (17).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/jury (18).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/award (1).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/award (2).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/award (3).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/award (4).webp',
  ];
  const photosWinners = [
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/winners (1).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/winners (2).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/winners (3).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/winners (4).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/winners (5).webp',
    'https://s3.regru.cloud/opk-info/beauty-of-gods-world/XXI/photos/winners (6).webp',
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
    { name: 'Фотогалерея', id: 'photos', lvl: 1 },
    { name: 'Итоги и победители конкурса', id: 'winners', lvl: 1 },
  ];
</script>

<style scoped lang="scss"></style>
