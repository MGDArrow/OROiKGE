<template>
  <div class="spinner"></div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .spinner {
    --size: 1px;

    display: inline-block;
    box-sizing: border-box;
    width: calc(20 * var(--size));
    height: calc(20 * var(--size));
    border: calc(5 * var(--size)) solid var(--accent);
    border-bottom-color: var(--color-white);
    border-radius: 50%;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
