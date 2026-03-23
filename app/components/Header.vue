<template>
  <header>
    <a class="logo">
      <img v-if="page === 'index'" src="/logo.svg" alt="logo" />
      <img v-else src="/logo_egg.svg" alt="logo" />
    </a>
    <h1 v-if="page === 'index'">
      Отдел Религиозного Образования и Катехизации Горловской Епархии
    </h1>
    <h1 v-else>
      Епархиальный этап международного конкурса-фестиваля
      декоративно-прикладного творчества «Пасхальное яйцо»
    </h1>

    <nav>
      <NuxtLink to="/" @click="setSecondMenu('')">Главная</NuxtLink>
      <div @click="setSecondMenu('OPK')">Сотрудничество со школами</div>
      <div @click="setSecondMenu('Competition')">Конкурсы</div>
      <a>Контакты</a>
    </nav>
    <nav class="second">
      <template v-if="secondMenu === 'OPK'">
        <a>Материалы для учителей</a>
        <a>Материалы для учеников</a>
        <a>Информация для родителей</a>
      </template>
      <template v-if="secondMenu === 'Competition'">
        <a>Красота Божьего Мира</a>
        <NuxtLink to="/easter-egg">Пасхальное яйцо</NuxtLink>
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

  useRouter().afterEach((to) => {
    page.value = to.name as string;
  });
</script>

<style scoped lang="scss">
  header {
    max-width: 1600px;
    margin: 0 auto 50px;
    border-bottom: 3px solid var(--accent);
  }
  .logo {
    & img {
      display: block;
      width: 500px;
      margin: 10px auto;
    }
  }
  h1 {
    margin: 10px auto 40px;
    color: var(--accent);
    font-size: 2em;
    font-family: SPSL-New-Cyrillic, sans-serif !important;
    text-align: center;
    text-wrap: balance;
  }
  nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: 10px auto 20px;
    font-weight: 600;
    font-size: 1.3em;
    text-transform: uppercase;
    cursor: pointer;
    & a,
    div {
      display: block;
      width: max-content;
      margin: 0 10px;
      color: var(--accent);
      text-align: center;
      text-decoration: none;
      cursor: pointer;
    }
    &.second {
      height: 30px;
      font-weight: 500;
    }
  }
</style>
