<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="text-h6">Камера №{{ camera.id }}</div>
      <div>
        <strong>Здание:</strong> {{ camera.buildingName }}<br>
        <strong>Адрес:</strong> {{ camera.buildingAddress }}
      </div>
      <div v-if="camera">
        <strong>Этаж:</strong> {{ camera.floorNo }}
      </div>
      <div v-if="camera">
        <strong>Комната:</strong> {{ camera.roomNo }}
      </div>

    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Подробнее" @click="openDetails" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  camera: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const openDetails = () => {
  router.push({ name: 'CameraStreamPage', params: { id: props.camera.id } });
};
</script>

<style scoped>
.my-card {
  margin-bottom: 16px;
}
</style>
