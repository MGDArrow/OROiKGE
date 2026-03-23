<template>
  <div
    v-if="visible"
    class="popup-overlay"
    @click.self="close"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div class="popup-container">
      <button class="popup-close" @click="close">×</button>
      <button class="nav-button prev" @click="goPrev">◀</button>
      <button class="nav-button next" @click="goNext">▶</button>
      <img :src="currentSrc" alt="Full size image" class="popup-image" />
      <div class="image-counter" v-if="images.length > 1">
        {{ currentIdx + 1 }} / {{ images.length }}
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted, onUnmounted } from 'vue';

  const props = defineProps({
    visible: Boolean,
    images: {
      type: Array,
      default: () => [],
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
  });

  const emit = defineEmits(['close', 'change']);

  const currentIdx = ref(props.currentIndex);
  const currentSrc = ref(props.images[props.currentIndex] || null);

  watch(
    () => props.currentIndex,
    (val) => {
      currentIdx.value = val;
      currentSrc.value = props.images[val] || null;
    },
  );

  watch(currentIdx, (val) => {
    currentSrc.value = props.images[val] || null;
  });

  const goPrev = () => {
    if (!props.images.length) return;
    const newIdx =
      (currentIdx.value - 1 + props.images.length) % props.images.length;
    currentIdx.value = newIdx;
    emit('change', newIdx);
  };

  const goNext = () => {
    if (!props.images.length) return;
    const newIdx = (currentIdx.value + 1) % props.images.length;
    currentIdx.value = newIdx;
    emit('change', newIdx);
  };

  const close = () => {
    emit('close');
  };

  const onKeydown = (e) => {
    if (!props.visible) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'Escape') {
      close();
    }
  };

  onMounted(() => window.addEventListener('keydown', onKeydown));
  onUnmounted(() => window.removeEventListener('keydown', onKeydown));

  let touchStartX = 0;
  let touchEndX = 0;
  const onTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };
  const onTouchMove = (e) => {
    touchEndX = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (!props.visible) return;
    const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
    touchStartX = 0;
    touchEndX = 0;
  };
</script>

<style scoped lang="scss">
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 90%);
    cursor: pointer;
  }
  .popup-container {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
  }
  .popup-image {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    cursor: default;
  }
  .popup-close {
    position: absolute;
    top: -40px;
    right: -40px;
    color: white;
    font-size: 32px;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.1);
    }

    @media (width <= 768px) {
      top: 10px;
      right: 10px;
      width: 44px;
      height: 44px;
      font-size: 40px;
      line-height: 1;
      text-align: center;
      background: rgb(0 0 0 / 50%);
      border-radius: 50%;
    }
  }
  .nav-button {
    position: absolute;
    top: 50%;
    width: 50px;
    height: 50px;
    color: white;
    font-size: 2rem;
    background: rgb(0 0 0 / 60%);
    border: none;
    border-radius: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
      background: rgb(0 0 0 / 80%);
    }
    &.prev {
      left: -60px;
    }
    &.next {
      right: -60px;
    }

    @media (width <= 768px) {
      width: 40px;
      height: 40px;
      font-size: 1.5rem;
      background: rgb(0 0 0 / 70%);
      &.prev {
        left: 10px;
      }
      &.next {
        right: 10px;
      }
    }
  }
  .image-counter {
    position: absolute;
    bottom: -40px;
    left: 50%;
    padding: 4px 12px;
    color: white;
    font-size: 14px;
    background: rgb(0 0 0 / 60%);
    border-radius: 20px;
    transform: translateX(-50%);
  }
</style>
