<template>
  <div class="menu" :class="{ shadow: isTop }" ref="menu">
    <span>Оглавление страницы:</span>
    <a
      :href="`#${point.id}`"
      v-for="point in menu"
      :key="point.id"
      @click="isOpen && (isOpen = false)"
      :class="{ first: point.lvl === 1, second: point.lvl === 2 }"
      >— {{ point.name }}</a
    >
  </div>
  <div class="menu__popup" :class="{ top: isTop, open: isOpen }">
    <div v-if="isTop" @click="isOpen = !isOpen">
      <NuxtImg src="/menu.svg" :class="{ open: isOpen }" />
    </div>
    <div v-if="!isTop || isOpen">
      <span>Оглавление страницы:</span>
      <a
        :href="`#${point.id}`"
        v-for="point in menu"
        :key="point.id"
        @click="isOpen && (isOpen = false)"
        :class="{ first: point.lvl === 1, second: point.lvl === 2 }"
        >— {{ point.name }}</a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    menu: { name: string; id: string; lvl: number }[];
  }

  const props = defineProps<Props>();

  const menuTemplate = useTemplateRef('menu');
  const stickyPoint = ref(undefined);

  const onScroll = () => {
    if (!stickyPoint.value) return;
    isTop.value = window.pageYOffset >= stickyPoint.value;
  };
  const isTop = ref(false);
  const isOpen = ref(false);

  onMounted(() => {
    stickyPoint.value =
      menuTemplate.value?.offsetTop + menuTemplate.value?.offsetHeight;
    isTop.value =
      window.pageYOffset >=
      menuTemplate.value?.offsetTop + menuTemplate.value?.offsetHeight;
    window.addEventListener('scroll', onScroll);
  });
</script>

<style scoped lang="scss">
  .menu {
    // width: max-content;
    max-width: 100%;
    margin: 0 auto;
    padding: 20px;
    border: 3px solid var(--accent);
    opacity: 1;
    transition: 0.5s ease-in-out;
    &.shadow {
      opacity: 0;
    }
    &__popup {
      position: absolute;
      top: -100%;
      width: 100%;
      height: max-content;
      padding: 20px;
      overflow: hidden;
      background: var(--color-white);
      border: 3px solid transparent;
      transition: 0.2s ease-in-out;
      interpolate-size: allow-keywords;
      &.top {
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 2;
        width: 50px;
        height: 50px;
        padding: 5px;
        border: 3px solid var(--accent);
        cursor: pointer;
        interpolate-size: allow-keywords;
        &.open {
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100vw;
          height: 100dvh;
          padding: 30px;
          overflow-y: auto;
          transition: 0.3s ease-in-out;

          @media (width > 768px) {
            top: 20px;
            left: 20px;
            width: max-content;
            max-width: calc(70vw);
            height: calc(100dvh - 40px);
          }

          @media (width > 1200px) {
            max-width: 40vw;
          }
        }
      }
    }
  }
  img {
    position: relative;
    top: 0;
    left: 0;
    width: 35px;
    &.open {
      position: fixed;
      top: 28px;
      left: 28px;
    }
  }
  a {
    display: block;
    color: var(--accent);
    line-height: 1.2em;
    text-decoration: none;
    &.first {
      font-weight: 600;
      text-transform: uppercase;
      text-indent: 0.2em;
    }
    &.second {
      margin-left: 1em;
      text-indent: 0.5em;
    }

    @media (width <= 768px) {
      font-size: 0.7em;
    }
  }
  span {
    display: block;
    margin-bottom: 0.5em;
    color: var(--accent);
    font-weight: 600;
    font-size: 1.2em;
    text-align: center;
    text-transform: uppercase;
  }
</style>
