<template>
  <div>
    <UISwitch :buttons v-model="button" />
    <WidgetsBeauty2026 v-if="button === '2026'" />
    <WidgetsBeauty2025 v-else />
  </div>
</template>

<script setup lang="ts">
  const button = ref('2026');
  const buttons = ['2026', '2025'];
</script>

<style scoped lang="scss"></style>
