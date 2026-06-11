<template>
  <CompetitionSection>
    <h2>Материалы к урокам</h2>
    <p><strong>Материалы к урокам включают в себя:</strong></p>
    <UIList :type="'ol'">
      <li v-if="addressee === 'teachers'">
        <strong>План конспект</strong> — План конспект урока;
      </li>
      <li><strong>Презентация</strong> — Презентация к уроку;</li>
      <li>
        <strong>Учебник</strong> — фрагмент с уроком из учебника «Основы
        православной культуры» Васильевой Ольги Юрьевны, который является
        официальным, аккредитованным учебником в данной дисциплине;
      </li>
      <li v-if="addressee === 'teachers'">
        <strong>Дидактический материал</strong> — практические задания к уроку,
        составленные порталом «Клевер Лаборатория» (практические задания,
        которые учитель может использовать на уроке либо в качестве домашнего
        задания);
      </li>
      <li v-else>
        <strong>Домашнее задание</strong> — практические задания к уроку,
        которые можно использовать для проверки знаний;
      </li>
      <li v-if="addressee === 'teachers'">
        <strong>Теоретический материал</strong> — короткая статья для учителя,
        объясняющая тему или учебный текст (который учитель может использовать
        для чтения с детьми на уроке в качестве дополнительного материала),
        составленные порталом «Клевер Лаборатория» и оформлены в сборник Отедлом
        Религиозного Образования и Катехизации Горловской Епархии;
      </li>
      <li v-else-if="addressee === 'parents'">
        <strong>Теоретический материал</strong> — короткая статья для родителей
        или учителя, объясняющая тему или учебный текст;
      </li>
      <li v-if="addressee === 'teachers'">
        <strong>Видео. Комментарий священника к уроку</strong> — видео с
        комментарием священника из Нижнетагильской епархии по теме данного урока
        (для подготовки преподавателя к уроку);
      </li>
      <li v-if="addressee === 'teachers'">
        <strong>Видео. Опыт построения урока</strong> — видео с комментарием
        преподавателей из Нижнетагильской епархии и их советами (для подготовки
        преподавателя к уроку);
      </li>
      <li v-if="addressee === 'teachers'">
        <strong>Видео. Учитель учителю</strong> — видео с комментарием
        преподавателей портала «Клевер Лаборатория» и их советами (для
        подготовки преподавателя к уроку);
      </li>
      <li v-if="addressee !== 'children'">
        <strong>Сериал. Девочка и Робот </strong> — Детский короткометражный
        сериал разработанный Синодальный Отделом Религиозного Образования и
        Катехизации с подборкой тем к каждому уроку (дополнительный
        мультимедийный материал для показа детям). Сериал имеет единую канву с
        освещением всех тем по учебнику ОПК.
      </li>
      <li v-else>
        <strong>Сериал. Девочка и Робот </strong> — Детский короткометражный
        сериал с подборкой тем к каждому уроку.
      </li>
    </UIList>
    <div class="lesson" v-for="(lesson, index) in lessons" :key="index">
      <h3 @click="openLesson(index)">
        <strong>{{ lesson.name }}</strong>
      </h3>
      <template v-if="opensLessons.has(index)">
        <UIDocumentWrap>
          <UIDocumentCard
            v-for="doc in getMaterials(lesson.materials)"
            :key="doc.href"
            :size="doc.size"
            :href="doc.href"
            >{{ getNameMaterial(doc.name, doc.type) }}</UIDocumentCard
          >
        </UIDocumentWrap>
        <div class="gallery gallery__video">
          <figure
            v-for="(video, index) in lesson.videos"
            :key="index"
            v-if="addressee === 'teachers'"
          >
            <video-player>
              <video-skin>
                <video :src="video.href" playsinline controls></video>
              </video-skin>
            </video-player>
            <figcaption>{{ video.name }}</figcaption>
            <p>
              <a :href="video.href" target="blank" download
                >Скачать ({{ video.size }})</a
              >
            </p>
          </figure>
          <figure>
            <video-player>
              <video-skin>
                <video :src="lesson.series.href" playsinline controls></video>
              </video-skin>
            </video-player>
            <figcaption>{{ lesson.series.name }}</figcaption>
            <p v-if="addressee === 'teachers'">
              <a
                :href="lesson.series.href"
                target="blank"
                download
                v-if="addressee === 'teachers'"
                >Скачать ({{ lesson.series.size }})</a
              >
            </p>
          </figure>
        </div>
      </template>
    </div>
  </CompetitionSection>
</template>

<script setup lang="ts">
  interface Props {
    addressee: 'children' | 'teachers' | 'parents';
  }

  const props = defineProps<Props>();

  const opensLessons = ref(new Set());

  function openLesson(index: number) {
    if (opensLessons.value.has(index)) opensLessons.value.delete(index);
    else opensLessons.value.add(index);
  }

  const materialChildren = ['presentation', 'textbook', 'dz'];
  const materialParents = [...materialChildren, 'theory'];

  function getMaterials(materials: any[]) {
    if (props.addressee === 'children')
      return materials.filter((material) =>
        materialChildren.includes(material.type),
      );
    if (props.addressee === 'parents')
      return materials.filter((material) =>
        materialParents.includes(material.type),
      );
    else return materials;
  }

  function getNameMaterial(text: string, type: string) {
    if (type === 'dz') {
      if (props.addressee !== 'teachers') return 'Домашнее задание';
    }
    return text;
  }

  const lessons = [
    {
      name: 'Урок 01. Россия — наша Родина',
      materials: [
        {
          type: 'plan',
          size: '21.8 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 01. Россия -- наша Родина/Урок 01. Россия -- наша Родина. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'presentation',
          size: '11.3 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 01. Россия -- наша Родина/Урок 01. Россия -- наша Родина. II. Презентация.ppsx',
          name: 'Презентация',
        },
        {
          type: 'textbook',
          size: '949.9 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 01. Россия -- наша Родина/Урок 01. Россия -- наша Родина. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '15.7 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 01. Россия -- наша Родина/Урок 01. Россия -- наша Родина. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '1.2 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 01. Россия -- наша Родина/Урок 01. Россия -- наша Родина. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [
        {
          type: 'video',
          size: '187.6 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 01. Россия -- наша Родина/Урок 01. Россия -- наша Родина. VII. Видео. Комментарий священника к уроку.mp4',
          name: 'Комментарий священника к уроку',
        },
        {
          type: 'video',
          size: '159.5 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 01. Россия -- наша Родина/Урок 01. Россия -- наша Родина. VIII. Видео. Опыт построения урока.mp4',
          name: 'Опыт построения урока',
        },
        {
          type: 'video',
          size: '114.0 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 01. Россия -- наша Родина/Урок 01. Россия -- наша Родина. X. Видео. Учитель учителю.mp4',
          name: 'Учитель учителю',
        },
      ],
      series: {
        size: '56.6 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 01. Россия -- наша Родина/Урок 01. Россия -- наша Родина. XI. Сериал. Девочка и Робот (Чего не хватает роботу).mp4',
        name: 'Сериал. Девочка и Робот (Чего не хватает роботу)',
      },
    },
    {
      name: 'Урок 02. Культура и религия',
      materials: [
        {
          type: 'plan',
          size: '158.3 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 02. Культура и религия/Урок 02. Культура и религия. I. План конспект. v.2.0.pdf',
          name: 'План конспект',
        },
        {
          type: 'presentation',
          size: '66.0 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 02. Культура и религия/Урок 02. Культура и религия. II. Презентация.ppsx',
          name: 'Презентация',
        },
        {
          type: 'textbook',
          size: '1.0 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 02. Культура и религия/Урок 02. Культура и религия. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '16.7 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 02. Культура и религия/Урок 02. Культура и религия. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '1.2 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 02. Культура и религия/Урок 02. Культура и религия. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [
        {
          type: 'video',
          size: '149.5 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 02. Культура и религия/Урок 02. Культура и религия. VII. Видео. Комментарий священника к уроку.mp4',
          name: 'Комментарий священника к уроку',
        },
        {
          type: 'video',
          size: '139.6 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 02. Культура и религия/Урок 02. Культура и религия. VIII. Видео. Опыт построения урока.mp4',
          name: 'Опыт построения урока',
        },
        {
          type: 'video',
          size: '86.9 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 02. Культура и религия/Урок 02. Культура и религия. X. Видео. Учитель учителю.mp4',
          name: 'Учитель учителю',
        },
      ],
      series: {
        size: '58.6 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 02. Культура и религия/Урок 02. Культура и религия. XI. Сериал. Девочка и Робот (Другой такой нам не найти).mp4',
        name: 'Сериал. Девочка и Робот (Другой такой нам не найти)',
      },
    },
    {
      name: 'Урок 03. Как христианство пришло на Русь',
      materials: [
        {
          type: 'plan',
          size: '23.2 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 03. Как христианство пришло на Русь/Урок 03. Как христианство пришло на Русь. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'presentation',
          size: '10.2 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 03. Как христианство пришло на Русь/Урок 03. Как христианство пришло на Русь. II. Презентация.ppsx',
          name: 'Презентация',
        },
        {
          type: 'textbook',
          size: '1.2 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 03. Как христианство пришло на Русь/Урок 03. Как христианство пришло на Русь. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '14.7 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 03. Как христианство пришло на Русь/Урок 03. Как христианство пришло на Русь. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '2.2 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 03. Как христианство пришло на Русь/Урок 03. Как христианство пришло на Русь. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [
        {
          type: 'video',
          size: '193.2 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 03. Как христианство пришло на Русь/Урок 03. Как христианство пришло на Русь. VII. Видео. Комментарий священника к уроку.mp4',
          name: 'Комментарий священника к уроку',
        },
        {
          type: 'video',
          size: '222.0 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 03. Как христианство пришло на Русь/Урок 03. Как христианство пришло на Русь. VIII. Видео. Опыт построения урока.mp4',
          name: 'Опыт построения урока',
        },
        {
          type: 'video',
          size: '62.4 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 03. Как христианство пришло на Русь/Урок 03. Как христианство пришло на Русь. X. Видео. Учитель учителю.mp4',
          name: 'Учитель учителю',
        },
      ],
      series: {
        size: '69.5 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 03. Как христианство пришло на Русь/Урок 03. Как христианство пришло на Русь. XI. Сериал. Девочка и Робот (Переход на новый уровень).mp4',
        name: 'Сериал. Девочка и Робот (Переход на новый уровень)',
      },
    },
    {
      name: 'Урок 04. Бог, мир, человек',
      materials: [
        {
          type: 'plan',
          size: '21.7 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 04. Бог, мир, человек/Урок 04. Бог, мир, человек. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'presentation',
          size: '6.9 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 04. Бог, мир, человек/Урок 04. Бог, мир, человек. II. Презентация.ppsx',
          name: 'Презентация',
        },
        {
          type: 'textbook',
          size: '990.7 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 04. Бог, мир, человек/Урок 04. Бог, мир, человек. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '18.6 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 04. Бог, мир, человек/Урок 04. Бог, мир, человек. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '1.4 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 04. Бог, мир, человек/Урок 04. Бог, мир, человек. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [
        {
          type: 'video',
          size: '237.9 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 04. Бог, мир, человек/Урок 04. Бог, мир, человек. VII. Видео. Комментарий священника к уроку (Основное).mp4',
          name: 'Комментарий священника к уроку (Основное)',
        },
        {
          type: 'video',
          size: '93.2 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 04. Бог, мир, человек/Урок 04. Бог, мир, человек. VII. Видео. Комментарий священника к уроку (Отношение христианина к природе).mp4',
          name: 'Комментарий священника к уроку (Отношение христианина к природе)',
        },
        {
          type: 'video',
          size: '93.7 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 04. Бог, мир, человек/Урок 04. Бог, мир, человек. VIII. Видео. Опыт построения урока (Основное).mp4',
          name: 'Опыт построения урока (Основное)',
        },
        {
          type: 'video',
          size: '336.6 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 04. Бог, мир, человек/Урок 04. Бог, мир, человек. VIII. Видео. Опыт построения урока (Отношение христианина к природе).mp4',
          name: 'Опыт построения урока (Отношение христианина к природе)',
        },
        {
          type: 'video',
          size: '137.4 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 04. Бог, мир, человек/Урок 04. Бог, мир, человек. X. Видео. Учитель учителю.mp4',
          name: 'Учитель учителю',
        },
      ],
      series: {
        size: '49.1 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 04. Бог, мир, человек/Урок 04. Бог, мир, человек. XI. Сериал. Девочка и Робот (Я всё могу).mp4',
        name: 'Сериал. Девочка и Робот (Я всё могу)',
      },
    },
    {
      name: 'Урок 05. Библия',
      materials: [
        {
          type: 'plan',
          size: '191.2 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 05. Библия/Урок 05. Библия. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'presentation',
          size: '5.1 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 05. Библия/Урок 05. Библия. II. Презентация.ppsx',
          name: 'Презентация',
        },
        {
          type: 'textbook',
          size: '973.6 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 05. Библия/Урок 05. Библия. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '13.5 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 05. Библия/Урок 05. Библия. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '1.3 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 05. Библия/Урок 05. Библия. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [
        {
          type: 'video',
          size: '40.1 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 05. Библия/Урок 05. Библия. VII. Видео. Комментарий священника к уроку.mp4',
          name: 'Комментарий священника к уроку',
        },
        {
          type: 'video',
          size: '107.8 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 05. Библия/Урок 05. Библия. VIII. Видео. Опыт построения урока.mp4',
          name: 'Опыт построения урока',
        },
        {
          type: 'video',
          size: '154.4 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 05. Библия/Урок 05. Библия. X. Видео. Учитель учителю.mp4',
          name: 'Учитель учителю',
        },
      ],
      series: {
        size: '47.7 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 05. Библия/Урок 05. Библия. XI. Сериал. Девочка и Робот (Неожиданная победа).mp4',
        name: 'Сериал. Девочка и Робот (Неожиданная победа)',
      },
    },
    {
      name: 'Урок 06. Грехопадение (Ошибка первых людей)',
      materials: [
        {
          type: 'plan',
          size: '22.0 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 06. Грехопадение (Ошибка первых людей)/Урок 06. Грехопадение (Ошибка первых людей). I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'presentation',
          size: '7.3 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 06. Грехопадение (Ошибка первых людей)/Урок 06. Грехопадение (Ошибка первых людей). II. Презентация. v.2.0.ppsx',
          name: 'Презентация',
        },
        {
          type: 'textbook',
          size: '1.0 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 06. Грехопадение (Ошибка первых людей)/Урок 06. Грехопадение (Ошибка первых людей). III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '474.1 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 06. Грехопадение (Ошибка первых людей)/Урок 06. Грехопадение (Ошибка первых людей). IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '1.2 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 06. Грехопадение (Ошибка первых людей)/Урок 06. Грехопадение (Ошибка первых людей). V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [],
      series: {
        size: '65.0 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 06. Грехопадение (Ошибка первых людей)/Урок 06. Грехопадение (Ошибка первых людей). XI. Сериал. Девочка и Робот (Разбитое зеркало).mp4',
        name: 'Сериал. Девочка и Робот (Разбитое зеркало)',
      },
    },
    {
      name: 'Урок 07. Вдали от рая (Каин и Авель. Потоп)',
      materials: [
        {
          type: 'plan',
          size: '19.6 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 07. Вдали от рая (Каин и Авель. Потоп)/Урок 07. Вдали от рая (Каин и Авель. Потоп). I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'presentation',
          size: '19.2 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 07. Вдали от рая (Каин и Авель. Потоп)/Урок 07. Вдали от рая (Каин и Авель. Потоп). II. Презентация. v.2.0.ppsx',
          name: 'Презентация',
        },
        {
          type: 'textbook',
          size: '815.7 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 07. Вдали от рая (Каин и Авель. Потоп)/Урок 07. Вдали от рая (Каин и Авель. Потоп). III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '283.8 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 07. Вдали от рая (Каин и Авель. Потоп)/Урок 07. Вдали от рая (Каин и Авель. Потоп). IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '1.0 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 07. Вдали от рая (Каин и Авель. Потоп)/Урок 07. Вдали от рая (Каин и Авель. Потоп). V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [],
      series: {
        size: '71.8 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 07. Вдали от рая (Каин и Авель. Потоп)/Урок 07. Вдали от рая (Каин и Авель. Потоп). XI. Сериал. Девочка и Робот (Сладкое прозрение).mp4',
        name: 'Сериал. Девочка и Робот (Сладкое прозрение)',
      },
    },
    {
      name: 'Урок 08. В ожидании Спасителя',
      materials: [
        {
          type: 'plan',
          size: '21.1 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 08. В ожидании Спасителя/Урок 08. В ожидании Спасителя. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'presentation',
          size: '37.3 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 08. В ожидании Спасителя/Урок 08. В ожидании Спасителя. II. Презентация. v.2.0.ppsx',
          name: 'Презентация',
        },
        {
          type: 'textbook',
          size: '1.1 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 08. В ожидании Спасителя/Урок 08. В ожидании Спасителя. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '793.6 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 08. В ожидании Спасителя/Урок 08. В ожидании Спасителя. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '1.2 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 08. В ожидании Спасителя/Урок 08. В ожидании Спасителя. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [],
      series: {
        size: '59.4 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 08. В ожидании Спасителя/Урок 08. В ожидании Спасителя. XI. Сериал. Девочка и Робот (Успеть до двенадцати).mp4',
        name: 'Сериал. Девочка и Робот (Успеть до двенадцати)',
      },
    },
    {
      name: 'Урок 09. Десять заповедей',
      materials: [
        {
          type: 'plan',
          size: '23.6 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 09. Десять заповедей/Урок 09. Десять заповедей. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'presentation',
          size: '77.3 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 09. Десять заповедей/Урок 09. Десять заповедей. II. Презентация. v.2.0.ppsx',
          name: 'Презентация',
        },
        {
          type: 'textbook',
          size: '1.0 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 09. Десять заповедей/Урок 09. Десять заповедей. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '621.4 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 09. Десять заповедей/Урок 09. Десять заповедей. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '1.3 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 09. Десять заповедей/Урок 09. Десять заповедей. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [
        {
          type: 'video',
          size: '201.4 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 09. Десять заповедей/Урок 09. Десять заповедей. VII. Видео. Комментарий священника к уроку.mp4',
          name: 'Комментарий священника к уроку',
        },
        {
          type: 'video',
          size: '82.8 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 09. Десять заповедей/Урок 09. Десять заповедей. VIII. Видео. Опыт построения урока.mp4',
          name: 'Опыт построения урока',
        },
        {
          type: 'video',
          size: '165.7 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 09. Десять заповедей/Урок 09. Десять заповедей. X. Видео. Учитель учителю.mp4',
          name: 'Учитель учителю',
        },
      ],
      series: {
        size: '49.7 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 09. Десять заповедей/Урок 09. Десять заповедей. XI. Сериал. Девочка и Робот (Главная роль).mp4',
        name: 'Сериал. Девочка и Робот (Главная роль)',
      },
    },
    {
      name: 'Урок 10. Благовещение. Рождество Христово',
      materials: [
        {
          type: 'plan',
          size: '22.7 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 10. Благовещение. Рождество Христово/Урок 10. Благовещение. Рождество Христово. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'presentation',
          size: '20.4 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 10. Благовещение. Рождество Христово/Урок 10. Благовещение. Рождество Христово. II. Презентация. v.2.0.ppsx',
          name: 'Презентация',
        },
        {
          type: 'textbook',
          size: '1.0 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 10. Благовещение. Рождество Христово/Урок 10. Благовещение. Рождество Христово. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '519.2 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 10. Благовещение. Рождество Христово/Урок 10. Благовещение. Рождество Христово. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '1.2 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 10. Благовещение. Рождество Христово/Урок 10. Благовещение. Рождество Христово. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [],
      series: {
        size: '63.0 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 10. Благовещение. Рождество Христово/Урок 10. Благовещение. Рождество Христово. XI. Сериал. Девочка и Робот (Подарок).mp4',
        name: 'Сериал. Девочка и Робот (Подарок)',
      },
    },
    {
      name: 'Урок 11. Богоявление. Искушение в пустыне',
      materials: [
        {
          type: 'plan',
          size: '21.1 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 11. Богоявление. Искушение в пустыне/Урок 11. Богоявление. Искушение в пустыне. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '1.0 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 11. Богоявление. Искушение в пустыне/Урок 11. Богоявление. Искушение в пустыне. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '734.4 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 11. Богоявление. Искушение в пустыне/Урок 11. Богоявление. Искушение в пустыне. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '1.1 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 11. Богоявление. Искушение в пустыне/Урок 11. Богоявление. Искушение в пустыне. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [],
      series: {
        size: '45.0 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 11. Богоявление. Искушение в пустыне/Урок 11. Богоявление. Искушение в пустыне. XI. Сериал. Девочка и Робот (Кто за старшего).mp4',
        name: 'Сериал. Девочка и Робот (Кто за старшего)',
      },
    },
    {
      name: 'Урок 12. Нагорная проповедь (Заповеди Блаженств)',
      materials: [
        {
          type: 'plan',
          size: '21.8 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 12. Нагорная проповедь (Заповеди Блаженств)/Урок 12. Нагорная проповедь (Заповеди Блаженств). I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '1013.9 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 12. Нагорная проповедь (Заповеди Блаженств)/Урок 12. Нагорная проповедь (Заповеди Блаженств). III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '466.1 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 12. Нагорная проповедь (Заповеди Блаженств)/Урок 12. Нагорная проповедь (Заповеди Блаженств). IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '1.5 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 12. Нагорная проповедь (Заповеди Блаженств)/Урок 12. Нагорная проповедь (Заповеди Блаженств). V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [
        {
          type: 'video',
          size: '299.1 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 12. Нагорная проповедь (Заповеди Блаженств)/Урок 12. Нагорная проповедь (Заповеди Блаженств). VII. Видео. Комментарий священника к уроку 01.mp4',
          name: 'Комментарий священника к уроку 01',
        },
        {
          type: 'video',
          size: '71.7 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 12. Нагорная проповедь (Заповеди Блаженств)/Урок 12. Нагорная проповедь (Заповеди Блаженств). VII. Видео. Комментарий священника к уроку 02.mp4',
          name: 'Комментарий священника к уроку 02',
        },
        {
          type: 'video',
          size: '148.9 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 12. Нагорная проповедь (Заповеди Блаженств)/Урок 12. Нагорная проповедь (Заповеди Блаженств). VIII. Видео. Опыт построения урока 01.mp4',
          name: 'Опыт построения урока 01',
        },
        {
          type: 'video',
          size: '76.6 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 12. Нагорная проповедь (Заповеди Блаженств)/Урок 12. Нагорная проповедь (Заповеди Блаженств). VIII. Видео. Опыт построения урока 02.mp4',
          name: 'Опыт построения урока 02',
        },
        {
          type: 'video',
          size: '150.9 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 12. Нагорная проповедь (Заповеди Блаженств)/Урок 12. Нагорная проповедь (Заповеди Блаженств). X. Видео. Учитель учителю.mp4',
          name: 'Учитель учителю',
        },
      ],
      series: {
        size: '48.6 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 12. Нагорная проповедь (Заповеди Блаженств)/Урок 12. Нагорная проповедь (Заповеди Блаженств). XI. Сериал. Девочка и Робот (Доброе дело).mp4',
        name: 'Сериал. Девочка и Робот (Доброе дело)',
      },
    },
    {
      name: 'Урок 13. Евангельские притчи',
      materials: [
        {
          type: 'plan',
          size: '116.8 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 13. Евангельские притчи/Урок 13. Евангельские притчи. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '1011.4 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 13. Евангельские притчи/Урок 13. Евангельские притчи. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '381.3 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 13. Евангельские притчи/Урок 13. Евангельские притчи. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '1.5 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 13. Евангельские притчи/Урок 13. Евангельские притчи. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [],
      series: {
        size: '57.3 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 13. Евангельские притчи/Урок 13. Евангельские притчи. XI. Сериал. Девочка и Робот (На дне, или Невыполненные обещания).mp4',
        name: 'Сериал. Девочка и Робот (На дне, или Невыполненные обещания)',
      },
    },
    {
      name: 'Урок 14. Крест',
      materials: [
        {
          type: 'plan',
          size: '22.8 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 14. Крест/Урок 14. Крест. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '1.2 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 14. Крест/Урок 14. Крест. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '346.3 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 14. Крест/Урок 14. Крест. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '1.2 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 14. Крест/Урок 14. Крест. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [
        {
          type: 'video',
          size: '147.6 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 14. Крест/Урок 14. Крест. VII. Видео. Комментарий священника к уроку.mp4',
          name: 'Комментарий священника к уроку',
        },
        {
          type: 'video',
          size: '127.2 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 14. Крест/Урок 14. Крест. VIII. Видео. Опыт построения урока.mp4',
          name: 'Опыт построения урока',
        },
      ],
      series: {
        size: '45.7 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 14. Крест/Урок 14. Крест. XI. Сериал. Девочка и Робот (Что за суеверия...).mp4',
        name: 'Сериал. Девочка и Робот (Что за суеверия...)',
      },
    },
    {
      name: 'Урок 15. Пасха',
      materials: [
        {
          type: 'plan',
          size: '22.0 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 15. Пасха/Урок 15. Пасха. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '928.1 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 15. Пасха/Урок 15. Пасха. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '345.2 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 15. Пасха/Урок 15. Пасха. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '1.4 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 15. Пасха/Урок 15. Пасха. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [
        {
          type: 'video',
          size: '126.5 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 15. Пасха/Урок 15. Пасха. VII. Видео. Комментарий священника к уроку.mp4',
          name: 'Комментарий священника к уроку',
        },
        {
          type: 'video',
          size: '50.6 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 15. Пасха/Урок 15. Пасха. VIII. Видео. Опыт построения урока.mp4',
          name: 'Опыт построения урока',
        },
      ],
      series: {
        size: '59.3 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 15. Пасха/Урок 15. Пасха. XI. Сериал. Девочка и Робот (Перезагрузка).mp4',
        name: 'Сериал. Девочка и Робот (Перезагрузка)',
      },
    },
    {
      name: 'Урок 16. Итоговые учебные проекты',
      materials: [
        {
          type: 'plan',
          size: '14.5 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 16. Итоговые учебные проекты/Урок 16. Итоговые учебные проекты. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '265.3 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 16. Итоговые учебные проекты/Урок 16. Итоговые учебные проекты. III. Учебник.pdf',
          name: 'Учебник',
        },
      ],
      videos: [],
      series: {
        size: '59.4 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 16. Итоговые учебные проекты/Урок 16. Итоговые учебные проекты. XI. Сериал. Девочка и Робот (Сила настоящего героя).mp4',
        name: 'Сериал. Девочка и Робот (Сила настоящего героя)',
      },
    },
    {
      name: 'Урок 17. Храм (Храмы России)',
      materials: [
        {
          type: 'plan',
          size: '21.0 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 17. Храм (Храмы России)/Урок 17. Храм (Храмы России). I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '1008.8 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 17. Храм (Храмы России)/Урок 17. Храм (Храмы России). III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '452.4 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 17. Храм (Храмы России)/Урок 17. Храм (Храмы России). IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '658.8 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 17. Храм (Храмы России)/Урок 17. Храм (Храмы России). V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [
        {
          type: 'video',
          size: '258.6 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 17. Храм (Храмы России)/Урок 17. Храм (Храмы России). VII. Видео. Комментарий священника к уроку.mp4',
          name: 'Комментарий священника к уроку',
        },
        {
          type: 'video',
          size: '161.5 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 17. Храм (Храмы России)/Урок 17. Храм (Храмы России). VIII. Видео. Опыт построения урока.mp4',
          name: 'Опыт построения урока',
        },
      ],
      series: {
        size: '38.8 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 17. Храм (Храмы России)/Урок 17. Храм (Храмы России). XI. Сериал. Девочка и Робот (Разговор о доме).mp4',
        name: 'Сериал. Девочка и Робот (Разговор о доме)',
      },
    },
    {
      name: 'Урок 18. Икона',
      materials: [
        {
          type: 'plan',
          size: '19.5 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 18. Икона/Урок 18. Икона. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '1.3 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 18. Икона/Урок 18. Икона. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '413.6 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 18. Икона/Урок 18. Икона. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '1.0 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 18. Икона/Урок 18. Икона. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [
        {
          type: 'video',
          size: '88.8 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 18. Икона/Урок 18. Икона. VIII. Видео. Опыт построения урока.mp4',
          name: 'Опыт построения урока',
        },
      ],
      series: {
        size: '45.3 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 18. Икона/Урок 18. Икона. XI. Сериал. Девочка и Робот (Подарок для мамы).mp4',
        name: 'Сериал. Девочка и Робот (Подарок для мамы)',
      },
    },
    {
      name: 'Урок 19. Церковнославянский язык',
      materials: [
        {
          type: 'plan',
          size: '19.2 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 19. Церковнославянский язык/Урок 19. Церковнославянский язык. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '1.2 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 19. Церковнославянский язык/Урок 19. Церковнославянский язык. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '491.8 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 19. Церковнославянский язык/Урок 19. Церковнославянский язык. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '550.8 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 19. Церковнославянский язык/Урок 19. Церковнославянский язык. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [],
      series: {
        size: '45.0 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 19. Церковнославянский язык/Урок 19. Церковнославянский язык. XI. Сериал. Девочка и Робот (Зашифрованное послание).mp4',
        name: 'Сериал. Девочка и Робот (Зашифрованное послание)',
      },
    },
    {
      name: 'Урок 20. Православная молитва',
      materials: [
        {
          type: 'plan',
          size: '130.0 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 20. Православная молитва/Урок 20. Православная молитва. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '1013.8 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 20. Православная молитва/Урок 20. Православная молитва. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '406.2 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 20. Православная молитва/Урок 20. Православная молитва. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '623.9 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 20. Православная молитва/Урок 20. Православная молитва. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [
        {
          type: 'video',
          size: '267.1 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 20. Православная молитва/Урок 20. Православная молитва. VII. Видео. Комментарий священника к уроку.mp4',
          name: 'Комментарий священника к уроку',
        },
        {
          type: 'video',
          size: '127.2 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 20. Православная молитва/Урок 20. Православная молитва. VIII. Видео. Опыт построения урока.mp4',
          name: 'Опыт построения урока',
        },
      ],
      series: {
        size: '66.7 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 20. Православная молитва/Урок 20. Православная молитва. XI. Сериал. Девочка и Робот (Роботы не обижаются).mp4',
        name: 'Сериал. Девочка и Робот (Роботы не обижаются)',
      },
    },
    {
      name: 'Урок 21. Церковь',
      materials: [
        {
          type: 'plan',
          size: '20.3 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 21. Церковь/Урок 21. Церковь. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '1.0 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 21. Церковь/Урок 21. Церковь. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '447.3 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 21. Церковь/Урок 21. Церковь. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '590.7 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 21. Церковь/Урок 21. Церковь. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [],
      series: {
        size: '61.8 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 21. Церковь/Урок 21. Церковь. XI. Сериал. Девочка и Робот (Найди отличия).mp4',
        name: 'Сериал. Девочка и Робот (Найди отличия)',
      },
    },
    {
      name: 'Урок 22. Причастие',
      materials: [
        {
          type: 'plan',
          size: '18.1 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 22. Причастие/Урок 22. Причастие. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '773.6 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 22. Причастие/Урок 22. Причастие. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '491.5 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 22. Причастие/Урок 22. Причастие. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '946.9 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 22. Причастие/Урок 22. Причастие. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [
        {
          type: 'video',
          size: '99.6 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 22. Причастие/Урок 22. Причастие. VII. Видео. Комментарий священника к уроку.mp4',
          name: 'Комментарий священника к уроку',
        },
        {
          type: 'video',
          size: '48.7 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 22. Причастие/Урок 22. Причастие. VIII. Видео. Опыт построения урока.mp4',
          name: 'Опыт построения урока',
        },
      ],
      series: {
        size: '43.3 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 22. Причастие/Урок 22. Причастие. XI. Сериал. Девочка и Робот (Загадка моего счастья).mp4',
        name: 'Сериал. Девочка и Робот (Загадка моего счастья)',
      },
    },
    {
      name: 'Урок 23. Покаяние',
      materials: [
        {
          type: 'plan',
          size: '18.4 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 23. Покаяние/Урок 23. Покаяние. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '828.7 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 23. Покаяние/Урок 23. Покаяние. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '422.7 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 23. Покаяние/Урок 23. Покаяние. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '946.9 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 23. Покаяние/Урок 23. Покаяние. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [
        {
          type: 'video',
          size: '135.5 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 23. Покаяние/Урок 23. Покаяние. VII. Видео. Комментарий священника к уроку.mp4',
          name: 'Комментарий священника к уроку',
        },
        {
          type: 'video',
          size: '143.1 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 23. Покаяние/Урок 23. Покаяние. VIII. Видео. Опыт построения урока.mp4',
          name: 'Опыт построения урока',
        },
      ],
      series: {
        size: '90.1 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 23. Покаяние/Урок 23. Покаяние. XI. Сериал. Девочка и Робот (Как разрушить стену).mp4',
        name: 'Сериал. Девочка и Робот (Как разрушить стену)',
      },
    },
    {
      name: 'Урок 24. Подвиг',
      materials: [
        {
          type: 'plan',
          size: '23.0 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 24. Подвиг/Урок 24. Подвиг. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '1.1 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 24. Подвиг/Урок 24. Подвиг. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '562.8 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 24. Подвиг/Урок 24. Подвиг. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '455.5 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 24. Подвиг/Урок 24. Подвиг. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [
        {
          type: 'video',
          size: '92.1 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 24. Подвиг/Урок 24. Подвиг. VII. Видео. Комментарий священника к уроку.mp4',
          name: 'Комментарий священника к уроку',
        },
        {
          type: 'video',
          size: '186.9 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 24. Подвиг/Урок 24. Подвиг. VIII. Видео. Опыт построения урока.mp4',
          name: 'Опыт построения урока',
        },
      ],
      series: {
        size: '45.7 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 24. Подвиг/Урок 24. Подвиг. XI. Сериал. Девочка и Робот (Подвиги).mp4',
        name: 'Сериал. Девочка и Робот (Подвиги)',
      },
    },
    {
      name: 'Урок 25. Брак',
      materials: [
        {
          type: 'plan',
          size: '19.3 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 25. Брак/Урок 25. Брак. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '786.2 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 25. Брак/Урок 25. Брак. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '325.9 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 25. Брак/Урок 25. Брак. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '829.0 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 25. Брак/Урок 25. Брак. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [
        {
          type: 'video',
          size: '116.1 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 25. Брак/Урок 25. Брак. VII. Видео. Комментарий священника к уроку.mp4',
          name: 'Комментарий священника к уроку',
        },
        {
          type: 'video',
          size: '68.4 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 25. Брак/Урок 25. Брак. VIII. Видео. Опыт построения урока.mp4',
          name: 'Опыт построения урока',
        },
      ],
      series: {
        size: '43.0 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 25. Брак/Урок 25. Брак. XI. Сериал. Девочка и Робот (Кто в семье главный).mp4',
        name: 'Сериал. Девочка и Робот (Кто в семье главный)',
      },
    },
    {
      name: 'Урок 26. Родители и дети',
      materials: [
        {
          type: 'plan',
          size: '18.3 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 26. Родители и дети/Урок 26. Родители и дети. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '739.5 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 26. Родители и дети/Урок 26. Родители и дети. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '426.7 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 26. Родители и дети/Урок 26. Родители и дети. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '829.0 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 26. Родители и дети/Урок 26. Родители и дети. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [],
      series: {
        size: '72.3 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 26. Родители и дети/Урок 26. Родители и дети. XI. Сериал. Девочка и Робот (Ох, уж, эти родители).mp4',
        name: 'Сериал. Девочка и Робот (Ох, уж, эти родители)',
      },
    },
    {
      name: 'Урок 27. Монашество',
      materials: [
        {
          type: 'plan',
          size: '154.0 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 27. Монашество/Урок 27. Монашество. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '1.3 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 27. Монашество/Урок 27. Монашество. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '409.2 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 27. Монашество/Урок 27. Монашество. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '1.2 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 27. Монашество/Урок 27. Монашество. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [
        {
          type: 'video',
          size: '147.2 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 27. Монашество/Урок 27. Монашество. VII. Видео. Комментарий священника к уроку.mp4',
          name: 'Комментарий священника к уроку',
        },
        {
          type: 'video',
          size: '99.7 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 27. Монашество/Урок 27. Монашество. VIII. Видео. Опыт построения урока.mp4',
          name: 'Опыт построения урока',
        },
        {
          type: 'video',
          size: '250.4 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 27. Монашество/Урок 27. Монашество. X. Видео. Учитель учителю.mp4',
          name: 'Учитель учителю',
        },
      ],
      series: {
        size: '59.1 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 27. Монашество/Урок 27. Монашество. XI. Сериал. Девочка и Робот (Как стать отшельником).mp4',
        name: 'Сериал. Девочка и Робот (Как стать отшельником)',
      },
    },
    {
      name: 'Урок 28. Труд и творчество',
      materials: [
        {
          type: 'plan',
          size: '18.7 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 28. Труд и творчество/Урок 28. Труд и творчество. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '745.4 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 28. Труд и творчество/Урок 28. Труд и творчество. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '501.2 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 28. Труд и творчество/Урок 28. Труд и творчество. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '801.2 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 28. Труд и творчество/Урок 28. Труд и творчество. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [
        {
          type: 'video',
          size: '79.9 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 28. Труд и творчество/Урок 28. Труд и творчество. VII. Видео. Комментарий священника к уроку.mp4',
          name: 'Комментарий священника к уроку',
        },
        {
          type: 'video',
          size: '190.6 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 28. Труд и творчество/Урок 28. Труд и творчество. VIII. Видео. Опыт построения урока.mp4',
          name: 'Опыт построения урока',
        },
      ],
      series: {
        size: '53.7 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 28. Труд и творчество/Урок 28. Труд и творчество. XI. Сериал. Девочка и Робот (Словарный диктант).mp4',
        name: 'Сериал. Девочка и Робот (Словарный диктант)',
      },
    },
    {
      name: 'Урок 29. Любовь — вершина добродетелей',
      materials: [
        {
          type: 'plan',
          size: '18.8 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 29. Любовь -- вершина добродетелей/Урок 29. Любовь -- вершина добродетелей. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '1005.2 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 29. Любовь -- вершина добродетелей/Урок 29. Любовь -- вершина добродетелей. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '465.5 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 29. Любовь -- вершина добродетелей/Урок 29. Любовь -- вершина добродетелей. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '1.1 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 29. Любовь -- вершина добродетелей/Урок 29. Любовь -- вершина добродетелей. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [
        {
          type: 'video',
          size: '100.9 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 29. Любовь -- вершина добродетелей/Урок 29. Любовь -- вершина добродетелей. VII. Видео. Комментарий священника к уроку (Золотое правило этики).mp4',
          name: 'Комментарий священника к уроку (Золотое правило этики)',
        },
        {
          type: 'video',
          size: '163.6 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 29. Любовь -- вершина добродетелей/Урок 29. Любовь -- вершина добродетелей. VII. Видео. Комментарий священника к уроку (Милосердие и сострадание).mp4',
          name: 'Комментарий священника к уроку (Милосердие и сострадание)',
        },
        {
          type: 'video',
          size: '137.8 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 29. Любовь -- вершина добродетелей/Урок 29. Любовь -- вершина добродетелей. VII. Видео. Комментарий священника к уроку (Чудо в жизни христианина).mp4',
          name: 'Комментарий священника к уроку (Чудо в жизни христианина)',
        },
        {
          type: 'video',
          size: '207.9 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 29. Любовь -- вершина добродетелей/Урок 29. Любовь -- вершина добродетелей. VIII. Видео. Опыт построения урока (Зачем творить добро).mp4',
          name: 'Опыт построения урока (Зачем творить добро)',
        },
        {
          type: 'video',
          size: '191.7 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 29. Любовь -- вершина добродетелей/Урок 29. Любовь -- вершина добродетелей. VIII. Видео. Опыт построения урока (Золотое правило этики).mp4',
          name: 'Опыт построения урока (Золотое правило этики)',
        },
        {
          type: 'video',
          size: '52.4 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 29. Любовь -- вершина добродетелей/Урок 29. Любовь -- вершина добродетелей. VIII. Видео. Опыт построения урока (Милосердие и сострадание).mp4',
          name: 'Опыт построения урока (Милосердие и сострадание)',
        },
        {
          type: 'video',
          size: '75.5 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 29. Любовь -- вершина добродетелей/Урок 29. Любовь -- вершина добродетелей. VIII. Видео. Опыт построения урока (Чудо в жизни христианина).mp4',
          name: 'Опыт построения урока (Чудо в жизни христианина)',
        },
      ],
      series: {
        size: '71.3 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 29. Любовь -- вершина добродетелей/Урок 29. Любовь -- вершина добродетелей. XI. Сериал. Девочка и Робот (В кого бы влюбиться).mp4',
        name: 'Сериал. Девочка и Робот (В кого бы влюбиться)',
      },
    },
    {
      name: 'Урок 30. Суд Божий и суд человеческий',
      materials: [
        {
          type: 'plan',
          size: '18.2 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 30. Суд Божий и суд человеческий/Урок 30. Суд Божий и суд человеческий. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '1.6 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 30. Суд Божий и суд человеческий/Урок 30. Суд Божий и суд человеческий. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '553.1 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 30. Суд Божий и суд человеческий/Урок 30. Суд Божий и суд человеческий. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '2.3 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 30. Суд Божий и суд человеческий/Урок 30. Суд Божий и суд человеческий. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [
        {
          type: 'video',
          size: '182.1 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 30. Суд Божий и суд человеческий/Урок 30. Суд Божий и суд человеческий. VII. Видео. Комментарий священника к уроку.mp4',
          name: 'Комментарий священника к уроку',
        },
        {
          type: 'video',
          size: '83.6 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 30. Суд Божий и суд человеческий/Урок 30. Суд Божий и суд человеческий. VIII. Видео. Опыт построения урока.mp4',
          name: 'Опыт построения урока',
        },
      ],
      series: {
        size: '40.6 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 30. Суд Божий и суд человеческий/Урок 30. Суд Божий и суд человеческий. XI. Сериал. Девочка и Робот (Неотвеченный звонок).mp4',
        name: 'Сериал. Девочка и Робот (Неотвеченный звонок)',
      },
    },
    {
      name: 'Урок 31. Отечество земное и небесное',
      materials: [
        {
          type: 'plan',
          size: '19.1 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 31. Отечество земное и небесное/Урок 31. Отечество земное и небесное. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '1.3 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 31. Отечество земное и небесное/Урок 31. Отечество земное и небесное. III. Учебник.pdf',
          name: 'Учебник',
        },
        {
          type: 'dz',
          size: '445.8 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 31. Отечество земное и небесное/Урок 31. Отечество земное и небесное. IV. Дидактический материал.pdf',
          name: 'Дидактический материал',
        },
        {
          type: 'theory',
          size: '756.0 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 31. Отечество земное и небесное/Урок 31. Отечество земное и небесное. V. Теоретический материал.pdf',
          name: 'Теоретический материал',
        },
      ],
      videos: [
        {
          type: 'video',
          size: '189.0 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 31. Отечество земное и небесное/Урок 31. Отечество земное и небесное. VII. Видео. Комментарий священника к уроку (Защита Отечества).mp4',
          name: 'Комментарий священника к уроку (Защита Отечества)',
        },
        {
          type: 'video',
          size: '69.8 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 31. Отечество земное и небесное/Урок 31. Отечество земное и небесное. VII. Видео. Комментарий священника к уроку (Любовь и уважение к Отечеству).mp4',
          name: 'Комментарий священника к уроку (Любовь и уважение к Отечеству)',
        },
        {
          type: 'video',
          size: '139.5 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 31. Отечество земное и небесное/Урок 31. Отечество земное и небесное. VIII. Видео. Опыт построения урока (Защита Отечества).mp4',
          name: 'Опыт построения урока (Защита Отечества)',
        },
        {
          type: 'video',
          size: '148.0 Mb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 31. Отечество земное и небесное/Урок 31. Отечество земное и небесное. VIII. Видео. Опыт построения урока (Любовь и уважение к Отечеству).mp4',
          name: 'Опыт построения урока (Любовь и уважение к Отечеству)',
        },
      ],
      series: {
        size: '69.9 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 31. Отечество земное и небесное/Урок 31. Отечество земное и небесное. XI. Сериал. Девочка и Робот (Береги платье снову).mp4',
        name: 'Сериал. Девочка и Робот (Береги платье снову)',
      },
    },
    {
      name: 'Урок 32. Итоговый опрос',
      materials: [
        {
          type: 'plan',
          size: '15.7 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 32. Итоговый опрос/Урок 32. Итоговый опрос. I. План конспект. v.1.0.docx',
          name: 'План конспект',
        },
        {
          type: 'textbook',
          size: '257.5 Kb',
          href: 'https://s3.regru.cloud/opk-lessons/Урок 32. Итоговый опрос/Урок 32. Итоговый опрос. III. Учебник.pdf',
          name: 'Учебник',
        },
      ],
      videos: [],
      series: {
        size: '56.7 Mb',
        href: 'https://s3.regru.cloud/opk-lessons/Урок 32. Итоговый опрос/Урок 32. Итоговый опрос. XI. Сериал. Девочка и Робот (Математика любви).mp4',
        name: 'Сериал. Девочка и Робот (Математика любви)',
      },
    },
  ];
</script>

<style scoped lang="scss">
  .lesson {
    margin: 10px 0;
    border: 4px solid var(--accent);
    & h3 {
      margin: 20px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
</style>
