// src/layouts/MainLayout.vue
<template>
  <q-layout view="lHh Lpr lFf">

    <app-header />


    <!-- Простой футер для копирайта -->
    <q-footer elevated>
      <q-toolbar class="bg-primary text-white" style="min-height: 40px;">
        <q-toolbar-title class="text-center text-caption">
          © {{ new Date().getFullYear() }} Цифровой консьерж
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <!-- Контейнер для страниц -->
    <q-page-container class="app-page-container">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import AppHeader from 'components/AppHeader.vue';

</script>

<style lang="scss">

//$primary: #4CAF50; // Пример зеленого цвета (Material Green 500)
// $primary: #1E8E3E; // Более темный зеленый


.app-page-container {
  background-color: #f5f5f5;
  min-height: calc(100vh - 50px - 40px);
}

.q-page {
  padding: 16px;
}

</style>
