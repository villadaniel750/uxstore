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
        <CxVideo
          :lazy-src="img.lazySrc"
          :src="img.src"
          :blocked="index%3===1"
          :isPlaylist="index%4===1"
          :playlist-count="index + 1"
          title="One meets his destiny on the road he takes to avoid it destiny on the road he takes to avoid it destiny on the road he takes to avoid it destiny on the road he takes to avoid it"
          username="Shamus"
          uploadDate="2024/10/7"
          :profileBadge="index%3"
          @loadstart="loading[index] = true"
          @load="loading[index] = false"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CxVideo from '@/components/media/CxVideo.vue';

export default {
  components: {
    CxVideo
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