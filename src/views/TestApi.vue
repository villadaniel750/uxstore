<template>
  <v-container>
    <v-card class="pa-5" elevation="2">
      <v-card-title>Test API</v-card-title>
      <v-card-text>
        <v-btn @click="fetchData" color="primary">Fetch API</v-btn>
        <p v-if="response">Response: {{ response }}</p>
        <p v-if="error" class="text-red">{{ error }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import api from "@/api";

export default {
  setup() {
    const response = ref(null);
    const error = ref(null);

    const fetchData = async () => {
      response.value = null;
      error.value = null;

      try {
        const accessToken = await api.refreshAccessToken();
        response.value = accessToken;
      } catch (err) {
        error.value = `Error fetching API: ${err.message}`;
      }
    };

    return { response, error, fetchData };
  }
};
</script>