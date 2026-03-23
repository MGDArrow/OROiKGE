<template>
  <ul v-if="type === 'ul'">
    <slot />
  </ul>
  <ol v-else :start>
    <slot />
  </ol>
</template>

<script setup lang="ts">
  defineSlots<{
    default: string;
  }>();

  interface Props {
    type?: 'ul' | 'ol';
    start?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'ul',
    start: 1,
  });
</script>

<style lang="scss">
  ul {
    width: 100%;
    & li {
      position: relative;
      font-size: 0.9em;
      line-height: 1.5em;
      text-indent: 2.8em;
      &::before {
        position: absolute;
        width: 0.5em;
        height: 0.5em;
        background: var(--accent);
        transform: translateX(-1em) translateY(80%);
        content: ' ';
      }
    }
  }
  ol {
    width: 100%;
    padding-left: 2.8em;
    list-style-type: decimal;
    & li {
      position: relative;
      font-size: 0.9em;
      line-height: 1.5em;
    }
  }
</style>
