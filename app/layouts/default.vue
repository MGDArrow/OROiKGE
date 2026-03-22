<template>
  <div class="wrapper">
    <Header />
    <main>
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0 auto;
  }
  main {
    flex: 1;
    padding: 40px 0;
  }
</style>
