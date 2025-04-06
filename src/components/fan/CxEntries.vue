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
        <CxVideoFan
          :lazy-src="img.lazySrc"
          :src="img.src"
          :blocked="index%3===1"
          :isPlaylist="index%4===1"
          :playlist-count="index + 1"
          title="One meets his destiny on the road he takes to avoid it destiny on the road he takes to avoid it destiny on the road he takes to avoid it destiny on the road he takes to avoid it"
          @loadstart="loading[index] = true"
          @load="loading[index] = false"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CxVideoFan from '@/components/fan/CxVideoFan.vue';

export default {
  components: {
    CxVideoFan
  },
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