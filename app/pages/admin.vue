<template>
  <div class="admin">
    <h2 class="admin__title">Административная панель</h2>
    <UISwitch :buttons v-model="button" />
    <WidgetsAdminBeauty2026 v-if="button === '2026'" />
  </div>
</template>
<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
    ssr: false,
  });

  const button = ref('2026');
  const buttons = ['2026'];
</script>

<style scoped lang="scss"></style>
