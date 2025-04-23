import { defineStore } from 'pinia'

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useCameraStore = defineStore('camera', {
  state: () => ({
    cameras: [],
  }),
  getters: {
    cameraCount: (state) => state.cameras.length,
    getCameraById: (state) => (id) => state.cameras.find(cam => cam.id === id),
  },
  actions: {
    async fetchCameras() {
      try {
        const response = await axios.get(`${API_URL}/cameras`);
        this.cameras = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке данных камер:', error);
      }
    },
    async fetchCameraById(id) {
      let camera = this.getCameraById(id);
      if (!camera) {
        try {
          const response = await axios.get(`${API_URL}/cameras/${id}`);
          camera = response.data;
          // Опционально можно добавить полученную камеру в массив, чтобы не запрашивать её повторно
          this.cameras.push(camera);
        } catch (error) {
          console.error('Ошибка при загрузке данных камеры:', error);
        }
      }
      return camera;
    },
  },
});
