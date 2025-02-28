<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="(img, index) in images"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <v-img
          :lazy-src="img.lazySrc"
          :src="img.src"
          alt="Image"
          class="mb-2"
          aspect-ratio="16/9"
          rounded="lg"
          @loadstart="loading[index] = true"
          @load="loading[index] = false"
        >
          <template #placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="primary" />
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      // Array de imágenes, que luego puedes reemplazar con la respuesta de tu webservice.
      images: Array.from({ length: 18 }, (_, i) => {
        const index = i + 1;
        return {
          lazySrc: `https://picsum.photos/10/6?image=${index * 5 + 10}`,
          src: `https://picsum.photos/500/300?image=${index * 5 + 10}`
        };
      }),
      loading: Array(18).fill(false) // loading state for each image
    };
  }
};
</script>