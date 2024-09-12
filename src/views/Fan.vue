<template>
    <v-container >
        <cx-fan-header></cx-fan-header>
        <v-card class="fill-height">
    <v-tabs v-model="tab" color="orange-accent-2" align-tabs="left">
      <v-tab value="deposit">Entries</v-tab>
      <v-tab value="withdraw">Posts</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="deposit">
        <h3>Entries</h3>
      </v-window-item>

      <v-window-item value="withdraw">
        <h3>Posts</h3>
      </v-window-item>
    </v-window>
  </v-card>
    </v-container>
  </template>
  
  <script>
  import CxFanHeader from "@/components/fan/CxFanHeader";
  export default {
    data() {
      return {
        sniped: window.location.pathname.substring(1).toLowerCase(),
        tab: null,
      };
    },
  };
  </script>
  
  <style></style>
  