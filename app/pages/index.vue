<template>
  <div class="mainpage">
    <h2>Об отделе</h2>
    <p>
      В структуре каждой епархии Русской Православной Церкви существуют
      епархиальные отделы, призванные координировать церковную деятельность в
      различных направлениях. Одним из ключевых является Епархиальный отдел
      религиозного образования и катехизации (ЕОРОиК).
    </p>
    <p>
      Это структурное подразделение, действующее под непосредственным
      руководством правящего архиерея, призвано быть связующим звеном между
      церковным образованием, государственными образовательными стандартами и
      запросами общества. Его работа направлена на духовно-нравственное
      становление личности, воцерковление новоначальных и профессиональную
      подготовку педагогов.
    </p>

    <div class="menu">
      <NuxtLink to="/beauty-of-gods-world" class="menu__item">
        <img src="/logo_beauty.svg" alt="logo" />
        <span>Красота Божьего Мира XXI</span>
      </NuxtLink>
      <NuxtLink to="/easter-egg" class="menu__item">
        <img src="/logo_egg.svg" alt="logo" />
        <span>Пасхальное яйцо 2026</span>
      </NuxtLink>
    </div>

    <div class="wait">
      Сайт находится в разработке, поэтому многие разделы ещё не доступны
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .wait {
    padding: 40px 20px;
    font-size: 1.5em;
    text-align: center;
    text-wrap: balance;
    border: 8px solid var(--accent);
  }
  .menu {
    display: flex;
    gap: 20px;
    width: 80%;
    margin: 20px auto;
    &__item {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding: 1em 3em;
      color: var(--accent);
      font-weight: 600;
      font-size: 1.2em;
      text-align: center;
      text-decoration: none;
      text-wrap: balance;
      border: 1em solid var(--accent);
      cursor: pointer;
      & * {
        display: block;
        width: 100%;
      }
      &:nth-child(2) {
        --accent: var(--red);
      }
    }

    @media (width <= 1200px) {
      flex-wrap: wrap;
      width: 100%;
      &__item {
        border: 0.5em solid var(--accent);
      }
    }
  }
</style>
