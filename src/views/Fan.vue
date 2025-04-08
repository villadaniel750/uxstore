<template>
    <v-container >
        <cx-fan-header :profileBadge="1"></cx-fan-header>
        <cx-tab-body></cx-tab-body>
    </v-container>
  </template>
  
  <script>
  import CxFanHeader from "@/components/fan/CxFanHeader";
  import CxTabBody from "@/components/fan/CxTabBody.vue";
  export default {
    data() {
      return {
        sniped: window.location.pathname.substring(1).toLowerCase(),
      };
    },
  };
  </script>
  
  <style></style>
  