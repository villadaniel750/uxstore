<template>
    <v-text-field
    class="ma-2"
      v-model="search"
      append-inner-icon="mdi-magnify"
      :label="$t('Common.search')" 
      single-line
      hide-details
      variant="outlined"
      density="compact"
    ></v-text-field>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: ''
      };
    }
  };
  </script>
  