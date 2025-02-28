<template>
  <v-card rounded="lg">
    <v-img
      :lazy-src="lazySrc"
      :src="src"
      alt="Image"
      aspect-ratio="16/9"
      rounded="lg"
      @loadstart="$emit('loadstart')"
      @load="$emit('load')"
    >
      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="primary" />
        </v-row>
      </template>
    </v-img>

    <v-overlay
      :model-value="blocked"
      class="align-end pb-3 pl-3"
      scrim="grey-darken-1"
      opacity="0.6"
      persistent
      contained
    >
      <v-btn class="text-none" size="small" prepend-icon="mdi-lock">
        {{ $t("CxVideo.bloqued") }}
      </v-btn>
    </v-overlay>

    <div 
        v-if="isPlaylist"
        class="position-absolute right-0 bottom-0 text-body-2 bg-grey-darken-1 rounded pb-1 pt-1 pl-1 pr-1 mr-3 mb-3 elevation-2"
    >
        <b>13:02</b>
    </div>

    <div 
        v-if="!isPlaylist && playlistCount%3===0"
        class="position-absolute right-0 bottom-0 bg-grey-darken-2 rounded-lg pb-1 pt-1 pl-2 pr-2 mr-3 mb-3 elevation-3"
    >
        <v-icon icon="mdi-playlist-play" class="mr-1" size="large"></v-icon>
        <b>{{ playlistCount }}</b>
    </div>

  </v-card>
</template>

<script>
export default {
  props: {
    lazySrc: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    isPlaylist: {
        type: Boolean,
        default: false
    },
    playlistCount: {
        type: Number,
        default: 0
    }
  },
};
</script>

<style scoped></style>
