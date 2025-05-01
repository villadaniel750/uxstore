<template>
  <v-container>
    <v-card class="pa-5" elevation="2">
      <v-card-title>Test API</v-card-title>
      <v-card-text>
        <v-btn @click="fetchData" color="primary">Fetch API</v-btn>
        <v-btn @click="readFromWorker" color="secondary" class="ml-2">Read from WebWorker</v-btn>
        <v-btn @click="clearWorkerToken" color="error" class="ml-2">Clear Token</v-btn>

        <p v-if="response">Response: {{ response }}</p>
        <p v-if="workerToken">Worker Token: {{ workerToken }}</p>
        <p v-if="error" class="text-red">{{ error }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import api from "@/api";
import jwtWorker from '@/webworker/jwtWorkerClient.js';

export default {
  setup() {
    const response = ref(null);
    const workerToken = ref(null);
    const error = ref(null);

    const fetchData = async () => {
      response.value = null;
      error.value = null;

      try {
        const accessToken = await api.refreshAccessToken();
        response.value = accessToken;

        // Guarda el token en el Web Worker
        jwtWorker.setToken(accessToken);
      } catch (err) {
        error.value = `Error fetching API: ${err.message}`;
      }
    };

    const readFromWorker = async () => {
      try {
        workerToken.value = await jwtWorker.getToken();
      } catch (err) {
        error.value = `Error reading from worker: ${err.message}`;
      }
    };

    const clearWorkerToken = () => {
      jwtWorker.clearToken();
      workerToken.value = null;
    };

    return {
      response,
      workerToken,
      error,
      fetchData,
      readFromWorker,
      clearWorkerToken
    };
  }
};
</script>

