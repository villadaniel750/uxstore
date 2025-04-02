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
        <template v-if="loading[index]">
          <v-skeleton-loader
            height="240"
            :type="`card-avatar, list-item-avatar-two-line`"
            class="mx-auto"
            >
              <template v-slot:default>
                <v-card-text>
                  <v-skeleton-loader type="image, list-item-avatar-two-line"></v-skeleton-loader>
                </v-card-text>
              </template>
            </v-skeleton-loader>
        </template>
        <template v-else>
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
          />
        </template>
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
      images: Array.from({ length: 18 }, (_, i) => {
        const index = i + 1;
        return {
          lazySrc: `https://picsum.photos/10/6?image=${index * 5 + 10}`,
          src: `https://picsum.photos/500/300?image=${index * 5 + 10}`
        };
      }),
      loading: Array(18).fill(true)
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = this.loading.map(() => false);
    }, 1000);
  }
};
</script>

<style scoped>
.v-skeleton-loader {
  border-radius: 6px;
  width: 290px;
}

.v-skeleton-loader ::v-deep .v-skeleton-loader__image {
  height: 165px;
  border-radius: 6px;
}

/* Dark mode specific styling */
:deep(.v-theme--dark) .v-skeleton-loader {
  background: rgb(18, 18, 18) !important;
}

.v-skeleton-loader ::v-deep .v-skeleton-loader__avatar {
  width: 24px;
  height: 24px;
  margin-right: 2px;
}

.v-skeleton-loader ::v-deep .v-skeleton-loader__text {
  margin-top: 6px;
}

.v-skeleton-loader ::v-deep .v-skeleton-loader__list-item-avatar-two-line {
  padding: 2px;
}
</style>