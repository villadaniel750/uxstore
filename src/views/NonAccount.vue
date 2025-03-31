<template>
    <v-container >
        <cx-no-account-header></cx-no-account-header>
        <cx-no-account-body></cx-no-account-body>
    </v-container>
  </template>
  
  <script>
  import CxNoAccountHeader from "@/components/no-account/CxNoAccountHeader";
  import CxNoAccountBody from "@/components/no-account/CxNoAccountBody";
  export default {
    data() {
      return {
        sniped: window.location.pathname.substring(1).toLowerCase(),
      };
    },
  };
  </script>
  
  <style></style>
  