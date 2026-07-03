<template>
  <div class="print">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .print {
    font-size: 14pt;
    & * {
      font-family: Georgia, 'Times New Roman', Times, serif !important;
    }
  }
</style>
