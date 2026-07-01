<template>
  <div class="popup">
    <div class="popup__back" @click="emit('closePopup')"></div>
    <div class="popup__body">
      <div class="popup__close" @click="emit('closePopup')">x</div>

      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  defineSlots<{
    default: string;
  }>();

  const emit = defineEmits<{
    closePopup: [];
  }>();
</script>

<style scoped lang="scss">
  .popup {
    &__back {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 998;
      width: 100vw;
      height: 100dvh;
      background: black;
      opacity: 0.7;
    }
    &__body {
      position: fixed;
      scrollbar-width: thin;
      top: 50%;
      left: 50%;
      z-index: 999;
      width: 800px;
      max-height: 80dvh;
      padding: 10px 20px;
      overflow-y: auto;
      background: var(--color-white);
      border: 4px solid var(--accent);
      transform: translate(-50%, -50%);

      @media screen and (width <= 768px) {
        width: 95%;
        min-width: 300px;
        max-height: 90dvh;
        padding: 5px 10px;
      }
    }
    &__close {
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
    }
  }
</style>
