<template>
  <div class="switch">
    <div
      class="switch__point"
      v-for="button in buttons"
      :key="button"
      @click="modelValue = button"
      :class="{ active: button === modelValue }"
    >
      {{ button }}
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    buttons: string[];
  }

  const modelValue = defineModel<string>({ required: true });

  const props = defineProps<Props>();
</script>

<style scoped lang="scss">
  .switch {
    display: flex;
    gap: 20px;
    width: 100%;
    margin: 20px 0;
    & div {
      flex: 1;
      padding: 10px;
      font-weight: 600;
      font-size: 1.5em;
      text-align: center;
      border: 4px solid var(--accent);
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &.active {
        color: var(--color-white);
        background: var(--accent);
      }
    }
  }
</style>
