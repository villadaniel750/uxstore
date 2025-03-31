<template>
  <v-container class="pa-4">
    <v-row align="center" justify="start" class="text-center">
      <!-- Imagen ajustada con skeleton loading -->
      <v-col cols="12" md="2" class="d-flex justify-center">
     <div
     class="rounded-circle bg-grey-lighten-1"
     style="width: 140px; height: 140px;"
     >

     </div>
      </v-col>

      <!-- Texto ajustado -->
      <v-col cols="12" md="6" class="text-left">
        <h3>@{{ this.sniped }}</h3>
  
      
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      logoImage: "https://picsum.photos/210/210", // URL de imagen simulada
      sniped: window.location.pathname.substring(1).toLowerCase(),
    };
  },
};
</script>
