<template>
  <header>
    <a class="logo">
      <img src="/logo.svg" alt="logo" />
    </a>
    <h1>Отдел Религиозного Образования и Катехизации Горловской Епархии</h1>

    <nav>
      <a>Главная</a>
      <a>Основы Православной Культуры</a>
      <a>Конкурсы</a>
      <!-- <a>Красота Божьего Мира</a>
      <a>Пасхальное яйцо</a> -->
      <a>Контакты</a>
    </nav>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  header {
    max-width: 1600px;
    margin: 0 auto;
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
  }
  nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: 10px auto 50px;
    color: var(--accent);
    font-weight: 600;
    font-size: 1.3em;
    text-transform: uppercase;
    & a {
      display: block;
      width: max-content;
      margin: 0 10px;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
    }
  }
</style>
