<template>
  <div class="stream-container q-pa-sm bg-grey-3 rounded-borders">
    <img
      v-if="currentSrc"
      :src="currentSrc"
      class="received-image"
      @load="onLoad"
      alt="Трансляция не загружена"/>
    <q-banner v-else inline-actions class="bg-grey-4 text-center rounded-borders">
      Трансляция не активна или не удалось загрузить.
    </q-banner>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  src: {
    type: String,
    default: null,
  },
});

const currentSrc = ref(null);
const bufferImg = new Image();

watch(() => props.src, (newSrc) => {
  if (!newSrc) {
    currentSrc.value = null;
    return;
  }

  // Предзагрузка
  bufferImg.onload = () => {
    currentSrc.value = newSrc;
  };
  bufferImg.src = newSrc;
});
</script>

<style scoped>
.stream-container {
  width: 100%;
  height: auto;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.received-image {
  max-width: 100%;
  max-height: 70vh;
  display: block;
  margin: auto;
}
</style>
