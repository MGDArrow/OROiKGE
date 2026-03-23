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

<style lang="scss">
  .documents {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    margin: 0 auto;
    padding: 1em 3em;

    @media screen and (width <= 1599px) {
      width: 1100px;
      font-size: 0.8em;
    }

    @media screen and (width <= 1199px) {
      width: 750px;
    }

    @media screen and (width <= 768px) {
      flex-direction: column;
      gap: 20px;
      width: calc(98vw - 40px);
    }
  }
</style>
