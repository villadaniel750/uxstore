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
  
  export default {
    setup() {
      const response = ref(null);
      const error = ref(null);
  
      const fetchData = async () => {
        response.value = null;
        error.value = null;
  
        try {
          const res = await fetch('https://api.earnlumens.org/api/test/all');
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
          response.value = await res.text();
        } catch (err) {
          error.value = `Error fetching API: ${err.message}`;
        }
      };
  
      return { response, error, fetchData };
    }
  };
  </script>