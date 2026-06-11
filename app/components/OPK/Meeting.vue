<template>
  <CompetitionSection>
    <h2>Родительское собрание</h2>
    <p>
      Ключевым этапом введения курса «Основы религиозных культур и светской
      этики» (ОРКСЭ) является информированный и добровольный выбор модуля
      родителями (законными представителями) обучающихся. Данный выбор
      осуществляется на специальном родительском собрании, которое проводится в
      последней до начала учебного года в 4-м классе.
    </p>
    <p>
      Ниже представлен регламент организации и проведения такого собрания, а
      также необходимые документы.
    </p>
    <h3><strong>1. Подготовка и содержание собрания</strong></h3>
    <p>
      Перед началом собрания классный руководитель знакомит родителей с общими
      целями и задачами курса ОРКСЭ. Для наглядности используется информационный
      лист.
    </p>
    <UIDocumentWrap>
      <UIDocumentCard
        v-for="doc in informList"
        :key="doc.href"
        :size="doc.size"
        :href="doc.href"
        >{{ doc.name }}</UIDocumentCard
      >
    </UIDocumentWrap>
    <p>
      Для подробного раскрытия содержания модуля «Основы православной культуры»
      на собрании могут присутствовать приглашённые священнослужители (по
      согласованию с епархией или благочинием). Они выступают в роли экспертов в
      области православной традиции, отвечают на вопросы родителей и помогают
      сделать осознанный выбор.
    </p>
    <p v-if="isTeachers">
      Рекомендуем для информирвания родителей показать видеоролики составленные
      Отделом Религиозного Образования и Катехизации Горловской епархии:
    </p>
    <div class="gallery gallery__video" v-if="isTeachers">
      <figure>
        <video-player>
          <video-skin>
            <video
              playsinline
              controls
              src="https://s3.regru.cloud/opk-info/videos/Общая информация о предмете ОРКСЭ_720p.mp4"
            ></video>
          </video-skin>
        </video-player>
        <figcaption>«Общая информация о предмете ОРКСЭ»</figcaption>
        <p>
          Ссылка для скачивания видео (<a
            href="https://s3.regru.cloud/opk-info/videos/Общая информация о предмете ОРКСЭ_360p.mp4"
            >360p</a
          >,
          <a
            href="https://s3.regru.cloud/opk-info/videos/Общая информация о предмете ОРКСЭ_720p.mp4"
            >720p</a
          >,
          <a
            href="https://s3.regru.cloud/opk-info/videos/Общая информация о предмете ОРКСЭ_1080p.mp4"
            >1080p</a
          >)
        </p>
      </figure>
      <figure>
        <video-player>
          <video-skin>
            <video
              playsinline
              controls
              src="https://s3.regru.cloud/opk-info/videos/Краткий обзор тем модуля ОПК_720p.mp4"
            ></video>
          </video-skin>
        </video-player>
        <figcaption>«Краткий обзор тем модуля ОПК»</figcaption>
        <!-- !TODO -->
        <p>
          Ссылка для скачивания видео (<a
            href="https://s3.regru.cloud/opk-info/videos/Краткий обзор тем модуля ОПК_720p.mp4"
            >720p</a
          >,
          <a
            href="https://s3.regru.cloud/opk-info/videos/Краткий обзор тем модуля ОПК_1080p.mp4"
            >1080p</a
          >,
          <a
            href="https://s3.regru.cloud/opk-info/videos/Краткий обзор тем модуля ОПК_2k.mp4"
            >2k</a
          >)
        </p>
      </figure>
    </div>
    <h3><strong>2. Процедура выбора и документальное оформление</strong></h3>
    <p>
      После информационной части каждый из родителей заполняет письменное
      заявление о выборе конкретного модуля для своего ребёнка
    </p>
    <p>
      <strong>Важно:</strong> выбор осуществляется исключительно добровольно,
      фиксируется личной подписью родителя и не может быть изменён без его
      согласия в течение учебного года.
    </p>
    <UIDocumentWrap>
      <UIDocumentCard
        v-for="doc in zayavlenie"
        :key="doc.href"
        :size="doc.size"
        :href="doc.href"
        >{{ doc.name }}</UIDocumentCard
      >
    </UIDocumentWrap>
    <h3><strong>3. Составление итоговых документов класса</strong></h3>
    <p>
      На основании собранных заявлений классный руководитель составляет протокол
      родительского собрания в котором отражается повестка, ход голосования и
      принятые решения.
    </p>
    <UIDocumentWrap>
      <UIDocumentCard
        v-for="doc in protocol"
        :key="doc.href"
        :size="doc.size"
        :href="doc.href"
        >{{ doc.name }}</UIDocumentCard
      >
    </UIDocumentWrap>
    <h3><strong>4. Утверждение и передача данных</strong></h3>
    <p>
      По итогам родительских собраний во всех паралелях 4-х классов, директор
      составляет лист сводной информации.
    </p>
    <p>
      Лист сводной информации заверяется печатью образовательной организации.
      Далее этот документ вместе с копиями протоколов передаётся в муниципальный
      орган управления образованием (Управление образования) для формирования
      муниципального заказа на учебные пособия и распределения часов.
    </p>
    <UIDocumentWrap>
      <UIDocumentCard
        v-for="doc in endList"
        :key="doc.href"
        :size="doc.size"
        :href="doc.href"
        >{{ doc.name }}</UIDocumentCard
      >
    </UIDocumentWrap>
    <h3><strong>Дополнительные ресурсы:</strong></h3>
    <UIList :type="'ol'">
      <li>
        <a
          href="https://news.clever-lab.pro/kto-napisal-uchebnik-opk-i-chto-o-nem-govorjat/"
          target="blank"
          >Кто написал учебник ОПК и что о нем говорят?</a
        >
      </li>
      <li>
        <a
          href="https://news.clever-lab.pro/10-voprosov-pro-orksje/"
          target="blank"
          >10 вопросов про ОРКСЭ: зачем, про что, кто его преподает и какой
          модуль выбрать?</a
        >
      </li>
      <li v-if="isTeachers">
        <a
          href="https://news.clever-lab.pro/reglament-provedenija-roditelskogo-sobranija/"
          target="blank"
          >Регламент проведения родительского собрания;</a
        >
      </li>
      <li v-if="isTeachers">
        <a
          href="https://news.clever-lab.pro/kak-povysit-procent-vybora-opk-roditeljami/"
          target="blank"
          >Как повысить процент выбора ОПК родителями?</a
        >
      </li>
      <li v-if="isTeachers">
        <a href="https://clever-lab.pro/course/view.php?id=54" target="blank"
          >Открытый вебинар «Родительское собрание-выбор модуля ОРКСЭ»;</a
        >
      </li>
      <li v-if="isTeachers">
        <a href="https://clever-lab.pro/course/view.php?id=81" target="blank"
          >Открытый вебинар «Выбор ОПК: взаимодействие Церкви и школы».</a
        >
      </li>
    </UIList>
  </CompetitionSection>
</template>

<script setup lang="ts">
  interface Props {
    isTeachers?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    isTeachers: false,
  });

  interface IDoc {
    size?: string | null;
    href: string;
    name: string;
  }

  const informList: Array<IDoc> = [
    {
      size: '124 Kb',
      href: `https://s3.regru.cloud/opk-info/docs/00_Информационный лист для родителей.pdf`,
      name: `Информационный лист для родителей PDF`,
    },
    {
      size: '11.6 Kb',
      href: `https://s3.regru.cloud/opk-info/docs/00_Информационный лист для родителей.docx`,
      name: `Информационный лист для родителей Word`,
    },
  ];
  const zayavlenie: Array<IDoc> = [
    {
      size: '111 Kb',
      href: `https://s3.regru.cloud/opk-info/docs/01_Заявление родителей.pdf`,
      name: `Заявление родителей PDF`,
    },
    {
      size: '16.7 Kb',
      href: `https://s3.regru.cloud/opk-info/docs/01_Заявление родителей.docx`,
      name: `Заявление родителей Word`,
    },
  ];
  const protocol: Array<IDoc> = [
    {
      size: '112 Kb',
      href: `https://s3.regru.cloud/opk-info/docs/02_Протокол собрания.pdf`,
      name: `Протокол собрания PDF`,
    },
    {
      size: '17.1 Kb',
      href: `https://s3.regru.cloud/opk-info/docs/02_Протокол собрания.docx`,
      name: `Протокол собрания Word`,
    },
  ];
  const endList: Array<IDoc> = [
    {
      size: '126 Kb',
      href: `https://s3.regru.cloud/opk-info/docs/03_Лист сводной информации.pdf`,
      name: `Лист сводной информации PDF`,
    },
    {
      size: '17.5 Kb',
      href: `https://s3.regru.cloud/opk-info/docs/03_Лист сводной информации.docx`,
      name: `Лист сводной информации Word`,
    },
  ];
</script>

<style scoped lang="scss">
  a {
    color: var(--col-text);
  }
</style>
