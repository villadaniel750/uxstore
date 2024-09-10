<template>
    <v-container >
        <cx-fan-header></cx-fan-header>
    </v-container>
  </template>
  
  <script>
  import CxFanHeader from "@/components/fan/CxFanHeader";
  export default {
    data() {
      return {
        sniped: window.location.pathname.substring(1).toLowerCase(),
      };
    },
  };
  </script>
  
  <style></style>
  