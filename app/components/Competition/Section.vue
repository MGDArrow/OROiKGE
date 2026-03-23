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
    margin-bottom: 40px;

    @media (width <= 768px) {
      margin-bottom: 30px;
    }
  }
</style>
