<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(image, index) in images"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <v-img
          :src="image"
          alt="Image"
          class="mb-2"
          aspect-ratio="16/9"
          rounded="lg"
          @loadstart="loading[index] = true"
          @load="loading[index] = false"
        >
          <template #placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
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
      images: [
        `https://picsum.photos/1280/720?random=${Math.random()}`,
        `https://picsum.photos/1280/720?random=${Math.random()}`,
        `https://picsum.photos/1280/720?random=${Math.random()}`,
        `https://picsum.photos/1280/720?random=${Math.random()}`,
        `https://picsum.photos/1280/720?random=${Math.random()}`,
        `https://picsum.photos/1280/720?random=${Math.random()}`,
        `https://picsum.photos/1280/720?random=${Math.random()}`,
        `https://picsum.photos/1280/720?random=${Math.random()}`,
        `https://picsum.photos/1280/720?random=${Math.random()}`,
        `https://picsum.photos/1280/720?random=${Math.random()}`,
        `https://picsum.photos/1280/720?random=${Math.random()}`,
        `https://picsum.photos/1280/720?random=${Math.random()}`,
      ],
      loading: [], // Estado de carga de las imágenes
    };
  },
};
</script>

<style scoped>
.mb-3 {
  margin-bottom: 1.5rem;
}
</style>
