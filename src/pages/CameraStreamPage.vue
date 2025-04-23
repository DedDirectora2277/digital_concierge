<template>
  <q-page class="q-pa-md">

    <!-- Кнопка Назад и Заголовок -->
    <div class="row items-center q-mb-md">
      <q-btn
        flat
        round
        dense
        color="primary"
        icon="arrow_back"
        aria-label="На главную"
        to="/"
        class="q-mr-sm"
      />
      <div class="text-h5">Трансляция с камеры {{ route.params.id }}</div>
    </div>

    <!-- Блок управления подключением -->
    <div class="row justify-center q-mb-lg">
      <div class="column items-center q-gutter-y-sm" style="max-width: 400px;">
        <q-btn
          :color="connected ? 'negative' : 'primary'"
        :icon="connected ? 'link_off' : 'link'"
        :label="buttonLabel"
        :loading="connecting"
        @click="toggleConnection"
        rounded
        padding="sm lg"
        >
        <template v-slot:loading>
          <q-spinner-hourglass class="on-left" />
          {{ connectingLabel }}
        </template>
        </q-btn>

        <q-banner v-if="error" dense inline-actions class="bg-negative text-white rounded-borders" style="width: 100%;">
          <template v-slot:avatar>
            <q-icon name="error" color="white" />
          </template>
          Ошибка подключения. Попробуйте снова.
          <!-- {{ error }} // Можно раскомментировать для отладки -->
        </q-banner>
      </div>
    </div>

    <!-- Сетка для Трансляции и Информации -->
    <div class="row q-col-gutter-lg">

      <!-- Колонка с трансляцией -->
      <div class="col-12 col-md-8">
        <CameraStream :src="imageData" />
      </div>

      <!-- Колонка с информацией -->
      <div class="col-12 col-md-4">
        <CameraInfo :camera="selectedCamera" />
      </div>

    </div>

  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCameraStore } from 'src/stores/camStore.js';
import { useWebSocket } from 'src/composables/useWebSocket.js';
import CameraInfo from 'components/CameraInfo.vue';
import CameraStream from 'components/CameraStream.vue';

const route = useRoute();
const cameraStore = useCameraStore();
const selectedCamera = ref(null);

const WS_URL = import.meta.env.VITE_WEBSOCKET_URL;

// --- WebSocket Logic ---
const {
  connect,
  disconnect,
  connected,
  connecting,
  error,
  imageData,
} = useWebSocket(WS_URL);

const buttonLabel = computed(() =>
  connected.value ? 'Отключиться' : 'Подключиться к трансляции'
);
const connectingLabel = computed(() =>
  connected.value ? 'Отключение...' : 'Подключение...'
);

const toggleConnection = () => {
  if (connected.value) {
    disconnect();
  } else {
    connect();
  }
};
// --- End WebSocket Logic ---

onMounted(async () => {
  const id = +route.params.id;
  cameraStore.fetchCameraById(id).then(camera => {
    selectedCamera.value = camera;
  }).catch(err => {
    console.error("Ошибка загрузки данных камеры:", err);
  });

});

import { onBeforeUnmount } from 'vue';
onBeforeUnmount(() => {
  if (connected.value) {
    disconnect();
  }
});

</script>

<style scoped>
</style>
