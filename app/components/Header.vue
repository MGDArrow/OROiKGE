<template>
  <header>
    <div class="logo">
      <NuxtImg v-if="page === 'easter-egg'" src="/logo_egg.svg" alt="logo" />
      <NuxtImg
        v-else-if="page === 'beauty-of-gods-world'"
        src="/logo_beauty.svg"
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
      return `Регионального этапа международного конкурса детского творчества «Красота
      Божьего мира»`;
    else if (page.value === 'opk-for-parents')
      return `Информация для родителей`;
    else if (page.value === 'opk-for-teacher') return `Материалы для учителей`;
    else if (page.value === 'opk-for-student') return `Материалы для учеников`;
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
    return page.value === 'beauty-of-gods-world' || page.value === 'easter-egg';
  });

  useRouter().afterEach((to) => {
    page.value = to.name as string;
  });
</script>

<style scoped lang="scss">
  // header {
  //   max-width: 1600px;
  //   margin: 0 auto 50px;
  //   border-bottom: 3px solid var(--accent);

  //   @media (width <= 768px) {
  //     margin-bottom: 30px;
  //   }
  // }
  // .logo {
  //   width: 500px;
  //   margin: 10px auto;
  //   aspect-ratio: 1/1;
  //   & img {
  //     display: block;
  //     width: 100%;
  //   }

  //   @media (width <= 1600px) and (width >= 1200px) {
  //     width: 400px;
  //   }

  //   @media (width <= 1200px) and (width >= 768px) {
  //     width: 300px;
  //   }

  //   @media (width <= 768px) {
  //     width: 200px;
  //   }
  // }
  // h1 {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   min-height: 3em;
  //   margin: 10px auto;
  //   color: var(--accent);
  //   font-size: 2em;
  //   font-family: SPSL-New-Cyrillic, sans-serif !important;
  //   text-align: center;
  //   text-wrap: balance;

  //   @media (width <= 1200px) and (width >= 768px) {
  //     font-size: 1.8em;
  //   }

  //   @media (width <= 768px) {
  //     margin-bottom: 20px;
  //     font-size: 1.5em;
  //   }
  // }
  // nav {
  //   display: flex;
  //   flex-wrap: wrap;
  //   gap: 10px;
  //   justify-content: space-evenly;
  //   margin: 10px auto 20px;
  //   font-weight: 600;
  //   font-size: 1.3em;
  //   text-transform: uppercase;
  //   cursor: pointer;
  //   & a,
  //   div {
  //     display: block;
  //     width: max-content;
  //     padding: 10px;
  //     color: var(--accent);
  //     text-align: center;
  //     text-decoration: none;
  //     border: 3px solid var(--color-white);
  //     cursor: pointer;
  //     &.active {
  //       color: var(--color-white);
  //       background: var(--accent);
  //       border: 3px solid var(--accent);
  //     }
  //     &.halfactive {
  //       color: var(--accent);
  //       background: var(--color-white);
  //     }
  //   }

  //   @media (width <= 1200px) and (width >= 768px) {
  //     font-size: 1.1em;
  //   }
  //   &.second {
  //     font-weight: 500;
  //     transition: 0.2s ease-in-out;
  //   }

  //   @media (width <= 768px) {
  //     flex-direction: column;
  //     gap: 10px;
  //     align-items: center;
  //     margin-bottom: 15px;
  //     font-size: 1em;
  //     & a,
  //     div {
  //       width: auto;
  //       padding: 5px;
  //     }
  //     &.second {
  //       flex-direction: row;
  //       flex-wrap: wrap;
  //       gap: 8px;
  //       justify-content: center;
  //       height: auto;
  //       margin-top: 5px;
  //       margin-bottom: 10px;
  //       font-size: 0.9em;
  //     }
  //   }
  // }
</style>
