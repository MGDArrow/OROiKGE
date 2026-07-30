<template>
  <header>
    <div class="logo">
      <NuxtImg v-if="page === 'easter-egg'" src="/logo_egg.svg" alt="logo" />
      <NuxtImg
        v-else-if="page === 'beauty-of-gods-world'"
        src="/logo_beauty.svg"
        alt="logo"
      />
      <NuxtImg
        v-else-if="page === 'summer-of-lord'"
        src="/logo_summer.svg"
        alt="logo"
      />
      <NuxtImg v-else src="/logo.svg" alt="logo" />
    </div>
    <h1>{{ pageName }}</h1>
    <nav>
      <NuxtLink
        :class="{ active: page === 'index' }"
        to="/"
        @click="setSecondMenu('')"
        >Главная</NuxtLink
      >
      <div
        :class="{
          active: secondMenu === 'OPK' || isOPK,
          halfactive: !isOPK,
        }"
        @click="setSecondMenu('OPK')"
      >
        Сотрудничество со школами
      </div>
      <div
        :class="{
          active: secondMenu === 'Competition' || isCompetition,
          halfactive: !isCompetition,
        }"
        @click="setSecondMenu('Competition')"
      >
        Конкурсы
      </div>
      <NuxtLink
        :class="{ active: page === 'klass-duhovnogo-peniya' }"
        to="/klass-duhovnogo-peniya"
        @click="setSecondMenu('')"
        >Класс Духовного Пения</NuxtLink
      >
      <NuxtLink
        :class="{ active: page === 'contacts' }"
        to="/contacts"
        @click="setSecondMenu('')"
        >Контакты</NuxtLink
      >
    </nav>
    <nav class="second">
      <template v-if="secondMenu === 'OPK'">
        <NuxtLink
          :class="{ active: page === 'opk-for-teacher' }"
          to="/opk-for-teacher"
          >Материалы для учителей</NuxtLink
        >
        <NuxtLink
          :class="{ active: page === 'opk-for-student' }"
          to="/opk-for-student"
          >Материалы для учеников</NuxtLink
        >
        <NuxtLink
          :class="{ active: page === 'opk-for-parents' }"
          to="/opk-for-parents"
          >Информация для родителей</NuxtLink
        >
      </template>
      <template v-if="secondMenu === 'Competition'">
        <NuxtLink
          :class="{ active: page === 'beauty-of-gods-world' }"
          to="/beauty-of-gods-world"
          >Красота Божьего Мира</NuxtLink
        >
        <NuxtLink :class="{ active: page === 'easter-egg' }" to="/easter-egg"
          >Пасхальное яйцо</NuxtLink
        >
        <NuxtLink
          :class="{ active: page === 'summer-of-lord' }"
          to="/summer-of-lord"
          >Лето Господне</NuxtLink
        >
      </template>
    </nav>
  </header>
</template>

<script setup lang="ts">
  const secondMenu = ref('');

  function setSecondMenu(point: string) {
    if (secondMenu.value === point) secondMenu.value = '';
    else secondMenu.value = point;
  }

  const page = ref(useRoute().name);

  const pageName = computed(() => {
    if (page.value === 'easter-egg')
      return `Епархиальный этап международного конкурса-фестиваля
      декоративно-прикладного творчества «Пасхальное яйцо»`;
    else if (page.value === 'beauty-of-gods-world')
      return `Региональный этап международного конкурса детского творчества «Красота
      Божьего мира»`;
    else if (page.value === 'summer-of-lord')
      return `Международный детско-юношеский литературный конкурс имени И.С. Шмелева «Лето Господне»`;
    else if (page.value === 'opk-for-parents')
      return `Информация для родителей`;
    else if (page.value === 'opk-for-teacher') return `Материалы для учителей`;
    else if (page.value === 'opk-for-student') return `Материалы для учеников`;
    else if (page.value === 'klass-duhovnogo-peniya')
      return `Класс Духовного Пения`;
    else if (page.value === 'contacts') return `Контакты`;
    else
      return `Отдел Религиозного Образования и Катехизации Горловской Епархии`;
  });

  const isOPK = computed(() => {
    return (
      page.value === 'opk-for-teacher' ||
      page.value === 'opk-for-student' ||
      page.value === 'opk-for-parents'
    );
  });
  const isCompetition = computed(() => {
    return (
      page.value === 'beauty-of-gods-world' ||
      page.value === 'easter-egg' ||
      page.value === 'summer-of-lord'
    );
  });

  useRouter().afterEach((to) => {
    page.value = to.name as string;
  });

  onMounted(() => {
    if (isOPK.value) secondMenu.value = 'OPK';
    if (isCompetition.value) secondMenu.value = 'Competition';
  });
</script>

<style scoped lang="scss"></style>
