<template>
  <q-header elevated>
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title @click="goHome" class="cursor-pointer app-title">
        Цифровой кампус
      </q-toolbar-title>


<!--      {/* Например: <q-btn flat round dense icon="menu" /> */}-->

    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goHome() {
  router.push({ path: '/' });
}
</script>

<style scoped>

.cursor-pointer {
  cursor: pointer;
}
</style>
