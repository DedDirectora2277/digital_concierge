<template>
  <q-page>

    <!-- Состояние загрузки -->
    <div v-if="loading" class="fullscreen row flex-center">
      <q-spinner color="primary" size="3em" />
      <div class="q-ml-md">Загрузка камер...</div>
    </div>

    <!-- Состояние "Нет камер" -->
    <div v-else-if="!cameraStore.cameras.length" class="fullscreen row flex-center text-grey">
      Нет доступных камер для отображения.
    </div>

    <!-- Основной контент - сетка с камерами -->
    <div v-else class="q-pa-md">
      <div class="row q-col-gutter-md">
        <div
          v-for="camera in cameraStore.cameras"
          :key="camera.id"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <camera-card :camera="camera" />
        </div>
      </div>
    </div>

  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CameraCard from 'src/components/CameraCard.vue';
import { useCameraStore } from 'src/stores/camStore.js';

const cameraStore = useCameraStore();
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  try {
    await cameraStore.fetchCameras();
  } catch (error) {
    console.error("Ошибка при загрузке камер на странице:", error);

  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>

</style>
