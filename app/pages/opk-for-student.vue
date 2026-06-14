<template>
  <div>
    <UIMenu :menu />
    <OPKAboutORKSE :addressee="'children'" />
    <OPKAboutOPK :addressee="'children'" />
    <OPKLessons :addressee="'children'" />
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
      name: '«Основы православной культуры»',
      id: 'about-opk',
      lvl: 1,
    },
    { name: 'Живопись', id: 'about-opk-1', lvl: 2 },
    { name: 'Литература', id: 'about-opk-2', lvl: 2 },
    { name: 'Архитектура', id: 'about-opk-3', lvl: 2 },
    { name: 'Язык и повседневность', id: 'about-opk-4', lvl: 2 },

    { name: 'Материалы к урокам', id: 'lessons', lvl: 1 },
  ];
</script>

<style scoped lang="scss"></style>
