<template>
  <div>
    <UIMenu :menu />
    <OPKAboutORKSE :addressee="'parents'" />
    <OPKAboutOPK :addressee="'parents'" />
    <OPKMeeting />
    <OPKLessons :addressee="'parents'" />
    <OPKLaws />
  </div>
</template>

<script setup lang="ts">
  const menu = [
    {
      name: 'О предмете «Основы Религиозной Культуры и Светской Этики»',
      id: 'about-orkse',
      lvl: 1,
    },
    {
      name: 'Выбор модуля «Основы православной культуры»',
      id: 'about-opk',
      lvl: 1,
    },
    { name: 'Живопись', id: 'about-opk-1', lvl: 2 },
    { name: 'Литература', id: 'about-opk-2', lvl: 2 },
    { name: 'Архитектура', id: 'about-opk-3', lvl: 2 },
    { name: 'Язык и повседневность', id: 'about-opk-4', lvl: 2 },
    {
      name: 'Нравственный ориентир в современном мире',
      id: 'about-opk-5',
      lvl: 2,
    },
    { name: 'Что дает ребенку изучение ОПК?', id: 'about-opk-6', lvl: 2 },

    { name: 'Родительское собрание', id: 'meeting', lvl: 1 },
    { name: '1. Подготовка и содержание собрания', id: 'meeting-1', lvl: 2 },
    {
      name: '2. Процедура выбора и документальное оформление',
      id: 'meeting-2',
      lvl: 2,
    },
    {
      name: '3. Составление итоговых документов класса',
      id: 'meeting-3',
      lvl: 2,
    },
    { name: '4. Утверждение и передача данных', id: 'meeting-4', lvl: 2 },
    { name: 'Дополнительные ресурсы', id: 'meeting-resourses', lvl: 2 },
    { name: 'Материалы к урокам', id: 'lessons', lvl: 1 },
    { name: 'Законодательство', id: 'laws', lvl: 1 },
    { name: 'Федеральный Закон №125, от 26.09.1997', id: 'laws-1', lvl: 2 },
    { name: 'Федеральный Закон №273, от 29.12.2012', id: 'laws-2', lvl: 2 },
    { name: 'Указ Президента РФ №809, от 09.11.2022', id: 'laws-3', lvl: 2 },
    { name: 'Иные документы и дополнительные материалы', id: 'laws-4', lvl: 2 },
  ];
</script>

<style scoped lang="scss"></style>
