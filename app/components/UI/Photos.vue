<template>
  <div class="image-gallery">
    <!-- Основное изображение -->
    <div class="main-image-container">
      <img
        v-if="currentImage"
        :src="currentImage"
        alt="Main image"
        class="main-image"
        @click="openPopup"
      />
      <div v-else class="placeholder">Нет изображений</div>
    </div>

    <!-- Список превью -->
    <div v-if="images.length" class="thumbnails-container">
      <div class="thumbnails-list">
        <img
          v-for="(img, idx) in images"
          :key="idx"
          :src="img"
          :alt="`Thumbnail ${idx + 1}`"
          class="thumbnail"
          :class="{ active: currentImage === img }"
          @click="setCurrentImage(img)"
        />
      </div>
    </div>

    <!-- Попап с навигацией -->
    <UIPopup
      :visible="popupVisible"
      :images="images"
      :current-index="currentIndex"
      @close="closePopup"
      @change="handlePopupChange"
    />
  </div>
</template>

<script setup>
  const props = defineProps({
    images: {
      type: Array,
      required: true,
      default: () => [],
    },
  });

  const currentImage = ref(props.images[0] || null);
  const currentIndex = ref(0);
  const popupVisible = ref(false);

  // Синхронизация индекса с текущим изображением
  watch(currentImage, (newImage) => {
    const idx = props.images.indexOf(newImage);
    if (idx !== -1) currentIndex.value = idx;
  });

  // Обновление при изменении пропса images
  watch(
    () => props.images,
    (newImages) => {
      if (newImages.length) {
        currentImage.value = newImages[0];
        currentIndex.value = 0;
      } else {
        currentImage.value = null;
        currentIndex.value = 0;
      }
    },
    { immediate: true },
  );

  const setCurrentImage = (img) => {
    const idx = props.images.indexOf(img);
    if (idx !== -1) {
      currentImage.value = img;
      currentIndex.value = idx;
    }
  };

  const nextImage = () => {
    if (!props.images.length) return;
    const nextIdx = (currentIndex.value + 1) % props.images.length;
    currentImage.value = props.images[nextIdx];
    currentIndex.value = nextIdx;
  };

  const prevImage = () => {
    if (!props.images.length) return;
    const prevIdx =
      (currentIndex.value - 1 + props.images.length) % props.images.length;
    currentImage.value = props.images[prevIdx];
    currentIndex.value = prevIdx;
  };

  const openPopup = () => {
    popupVisible.value = true;
  };

  const closePopup = () => {
    popupVisible.value = false;
  };

  const handlePopupChange = (newIndex) => {
    currentImage.value = props.images[newIndex];
    currentIndex.value = newIndex;
  };
</script>

<style scoped lang="scss">
  .image-gallery {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin: 20px auto;
    font-family: sans-serif;
  }

  /* Основное изображение */
  .main-image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 300px;
    margin-bottom: 20px;
  }
  .main-image {
    max-width: 100%;
    max-height: 600px;
    object-fit: contain;
    border: 4px solid var(--accent);
    cursor: pointer;
  }
  .placeholder {
    padding: 20px;
    color: var(--accent);
    font-size: 1.2rem;
  }

  /* Контейнер с превью (горизонтальный скролл) */
  .thumbnails-container {
    width: 100%;
    padding-bottom: 10px;
    overflow: auto hidden;
    white-space: nowrap;
    scrollbar-width: thin;
  }
  .thumbnails-list {
    display: inline-flex;
    gap: 12px;
    padding: 8px 4px;
  }
  .thumbnail {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 4px solid transparent;
    cursor: pointer;
    transition:
      transform 0.2s,
      border 0.2s;
    &:hover {
      transform: scale(1.03);
    }
    &.active {
      border-color: var(--accent);
    }
  }
</style>
