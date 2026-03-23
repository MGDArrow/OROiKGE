<template>
  <div class="wrapper">
    <Header />
    <main>
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
  import type { RouteRecordNameGeneric } from 'vue-router';

  onMounted(() => {
    changeColor(useRoute().name);
  });

  useRouter().afterEach((to) => {
    changeColor(to.name);
  });

  function changeColor(to: RouteRecordNameGeneric) {
    if (to === 'easter-egg')
      document.documentElement.style.setProperty('--accent', 'var(--red)');
    else document.documentElement.style.setProperty('--accent', 'var(--blue)');
  }
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0 auto;
  }
  main {
    flex: 1;
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 20px 40px;
  }
</style>
