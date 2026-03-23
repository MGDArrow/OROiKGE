<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="document-card"
    ref="activeRef"
  >
    <p>
      <slot />
    </p>
    <div class="document-card__download">
      <img :src="`/download.webp`" alt="download" />
    </div>

    <div v-if="size !== null" class="document-card__size">{{ size }}</div>
  </a>
</template>

<script setup lang="ts">
  defineSlots<{
    default: string;
  }>();

  interface Props {
    size?: string | null;
    href: string;
  }

  withDefaults(defineProps<Props>(), {
    size: null,
    icon: 'download',
  });
</script>

<style scoped lang="scss">
  .document-card {
    position: relative;
    display: flex;
    align-items: center;
    width: calc(100% / 2 - 30px);
    padding: 20px 15px;
    color: var(--accent);
    font-weight: 600;
    text-decoration: none;
    border: 4px solid var(--accent);
    cursor: pointer;
    transition: 0.4s ease-in-out;

    @media screen and (width <= 768px) {
      width: 80%;
      padding: 15px 5px;
    }
    & p {
      padding-left: 80px;
    }
    &__download {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 100%;
      background: var(--accent);
      transition: 0.4s ease-in-out;
      & img {
        height: 50%;
      }
    }
    &__size {
      position: absolute;
      top: 0;
      right: 0;
      padding: 4px 8px;
      color: var(--color-white);
      font-weight: 400;
      font-size: 0.8em;
      background: var(--accent);
      border-radius: 0 0 0 10px;
      transition: 0.4s ease-in-out;
    }
    &:hover {
      scale: 1.03;
    }

    // &:hover {
    //   width: calc(100% / 2 - 15px - 8px - 65.5px);
    //   padding: 25px 15px 25px 50px;
    //   transform: scale(1.04);

    //   @media screen and (width <= 1199px) {
    //     width: calc(100% / 2 - 15px - 8px - 30.5px);
    //     padding: 25px 15px;
    //   }

    //   @media screen and (width <= 768px) {
    //     width: unset;
    //     padding: 25px 15px;
    //   }
    // }
  }
</style>
