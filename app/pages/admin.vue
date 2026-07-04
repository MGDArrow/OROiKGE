<template>
  <div class="admin-page">
    <h2>Административная панель</h2>
    <p>Добро пожаловать, администратор!</p>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
    ssr: false,
  });
</script>

<style scoped lang="scss">
  .admin-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
  }
</style>
