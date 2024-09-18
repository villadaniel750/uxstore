<template>
  <v-container class="pa-4">
    <v-row align="center" justify="start" class="text-center">
      <!-- Imagen ajustada con skeleton loading -->
      <v-col cols="12" md="2" class="d-flex justify-center">
        <v-img
          
          :src="logoImage"
          class="rounded-circle"
          max-width="210"
          max-height="210"
          aspect-ratio="1"
          alt="Profile image"
        >
          <!-- Skeleton mientras carga la imagen -->
          <template v-slot:placeholder>
            <v-skeleton-loader
              type="card"

            ></v-skeleton-loader>
          </template>
        </v-img>
      </v-col>

      <!-- Texto ajustado -->
      <v-col cols="12" md="6" class="text-left">
        <h3>@{{ this.sniped }}</h3>
        <h4>{{ this.sniped }}</h4>
        <p>296.9K Seguidores | 323.6K Me gusta</p>
        <v-btn color="black" class="mr-2">Seguir</v-btn>
        <v-btn outlined>Mensaje</v-btn>
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
