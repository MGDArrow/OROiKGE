<template>
  <footer>
    <div class="footer">
      <div class="footer__column">
        <div class="footer__logo">
          <img src="/logo_white.svg" alt="logo" />
        </div>
        <ClientOnly>
          <div class="footer__name">
            2024 – {{ new Date().getFullYear() }}© ОРОиК ГЕ
          </div>
        </ClientOnly>
      </div>
      <div class="footer__column">
        <!-- <div class="footer__menu">123</div> -->
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
    &__menu {
      flex: 1;
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
        font-weight: 900;
      }
    }
  }
</style>
