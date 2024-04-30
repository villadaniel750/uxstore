<template>
    <v-container class="fill-height">
        <h1>@{{ this.sniped }} FAN PAGE</h1>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sniped: window.location.pathname.substring(1).toLowerCase(),
      };
    },
  };//ss
  </script>
  
  <style></style>
  