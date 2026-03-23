<template>
  <section>
    <slot />
  </section>
</template>

<script setup lang="ts">
  defineSlots<{
    default: string;
  }>();
</script>

<style scoped lang="scss">
  section {
    width: 100%;
  }
</style>
