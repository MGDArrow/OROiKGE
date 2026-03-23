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

  @media (width <= 768px) {
    ul li {
      padding-left: 10px;
      font-size: 0.85em;
      text-indent: 1.8em;
    }
    ol {
      padding-left: 1.8em;
      li {
        font-size: 0.85em;
      }
    }
  }
</style>
