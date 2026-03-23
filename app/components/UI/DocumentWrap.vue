<template>
  <section class="documents" id="docs">
    <slot />
  </section>
</template>

<script setup lang="ts">
  defineSlots<{
    default: string;
  }>();
</script>

<style scoped lang="scss">
  .documents {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    width: 100%;
    margin: 0 auto;
    padding: 1em 2em;

    /* 1200px–768px */
    @media (width <= 1200px) and (width >= 768px) {
      gap: 20px;
      padding: 1em 1.5em;
    }

    /* до 768px */
    @media (width <= 768px) {
      flex-direction: column;
      gap: 20px;
      padding: 1em;
    }
  }
</style>
