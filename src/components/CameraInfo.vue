<template>
  <q-card flat bordered class="camera-info-card">
    <q-card-section>
      <div class="text-h6 q-mb-sm">Информация о камере</div>

      <div v-if="camera">
        <p class="q-mb-xs"><strong>ID:</strong> {{ camera.id }}</p>
        <p class="q-mb-xs">
          <strong>Здание:</strong> {{ camera.buildingName }}<br>
          <span class="text-caption text-grey-7">Адрес: {{ camera.buildingAddress }}</span>
        </p>
        <p v-if="camera" class="q-mb-xs">
          <strong>Этаж:</strong> {{ camera.floorNo }}
        </p>
        <p v-if="camera" class="q-mb-xs">
          <strong>Комната:</strong> {{ camera.roomNo }}
        </p>
      </div>
      <div v-else>
        <q-skeleton type="text" width="50%" />
        <q-skeleton type="text" />
        <q-skeleton type="text" width="70%" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  camera: {
    type: Object,
    default: null,
  },
});
</script>

<style scoped>

p {
  margin-bottom: 8px;
}
</style>
