<template>
  <button class="ui-button" :class="{ loading }" :type>
    <UISpinner v-if="loading" />
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
  defineSlots<{
    default: string;
  }>();

  interface Props {
    loading?: boolean;
    type?: 'button' | 'submit';
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'button',
  });
</script>

<style scoped lang="scss">
  .ui-button {
    width: 100%;
    margin: 10px 0;
    padding: 5px 10px;
    color: var(--color-white);
    font-weight: 600;
    font-size: 1.1em;
    text-transform: uppercase;
    background: var(--accent);
    border: 4px solid var(--color-black);
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover,
    &.loading {
      color: var(--accent);
      background: var(--color-wgite);
    }
  }
</style>
