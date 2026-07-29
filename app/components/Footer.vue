<template>
  <footer>
    <div class="footer">
      <div class="footer__column">
        <div class="footer__logo">
          <NuxtImg src="/logo_white.svg" alt="logo" loading="lazy" />
        </div>
        <ClientOnly>
          <div class="footer__name">
            2024 – {{ new Date().getFullYear() }}© ОРОиК ГЕ
          </div>
        </ClientOnly>
      </div>
      <div class="footer__column">
        <div class="footer__menu">
          <a
            class="footer__ge"
            href="https://gorlovka-eparhia.org/"
            target="_blank"
            rel="noopener noreferrer"
            >Сайт Горловской Епархии</a
          >
          <ul>
            <li><NuxtLink to="/">Главная</NuxtLink></li>
            <li>
              Сотрудничество со школами
              <ul>
                <li>
                  <NuxtLink to="/opk-for-teacher"
                    >Материалы для учителей</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink to="/opk-for-student"
                    >Материалы для учеников</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink to="/opk-for-parents"
                    >Информация для родителей</NuxtLink
                  >
                </li>
              </ul>
            </li>
            <li>
              Конкурсы
              <ul>
                <li>
                  <NuxtLink to="/beauty-of-gods-world"
                    >Красота Божьего Мира</NuxtLink
                  >
                </li>
                <li><NuxtLink to="/easter-egg">Пасхальное яйцо</NuxtLink></li>
                <li><NuxtLink to="/summer-of-lord">Лето Господне</NuxtLink></li>
              </ul>
            </li>
            <li><NuxtLink to="/contacts">Контакты</NuxtLink></li>
          </ul>
        </div>

        <a
          class="footer__created"
          href="https://vk.com/mgdarrow"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by <strong>MGDArrow</strong>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  footer {
    padding: 40px 0 20px;
    color: var(--color-white);
    background: var(--accent);
    border-top: 5px solid var(--color-white);
    outline: 10px solid var(--accent);
  }
  .footer {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    max-width: 1600px;
    margin: 0 auto;
    &__column {
      flex: 1;
    }
    &__logo {
      max-width: 400px;
      margin: 10px auto;
    }
    &__name {
      font-size: 1.2em;
      text-align: center;
    }
    &__ge {
      display: block;
      width: 100%;
      margin: 20px auto;
      padding: 15px 10px;
      color: var(--color-white);
      font-weight: 500;
      font-size: 1.2em;
      text-align: center;
      text-transform: uppercase;
      text-decoration: none;
      border: 3px solid var(--color-white);
    }
    &__menu {
      flex: 1;
      margin-bottom: 20px;
    }
    &__created {
      display: block;
      width: 300px;
      margin: 10px auto;
      padding: 20px 10px;
      color: var(--color-white);
      font-size: 1.2em;
      text-align: center;
      text-decoration: none;
      border: 3px solid var(--color-white);
      & strong {
        color: white;
        font-weight: 700;
      }
    }
  }
  ul {
    width: 100%;
    padding-left: 1em;
    & li {
      position: relative;
      font-size: 0.9em;
      line-height: 1.5em;
      text-indent: 2.8em;
      &::before {
        position: absolute;
        width: 0.5em;
        height: 0.5em;
        background: var(--accent);
        transform: translateX(-1em) translateY(80%);
        content: ' ';
      }
    }
    & a {
      color: var(--color-white);
    }
  }

  @media (width <= 768px) {
    .footer {
      flex-direction: column;
      gap: 30px;
      &__logo {
        max-width: 200px;
      }
      &__name {
        font-size: 1em;
      }
      &__menu {
        margin-bottom: 30px;
      }
      &__created {
        width: auto;
        max-width: 280px;
        margin: 0 auto;
        padding: 15px 10px;
        font-size: 1em;
      }
    }
  }

  @media (width <= 768px) {
    ul li {
      padding-left: 10px;
      font-size: 0.85em;
      text-indent: 1.8em;
    }
  }
</style>
