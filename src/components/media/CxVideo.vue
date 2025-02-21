<template>
  <div class="video-container">
    <v-img
      :lazy-src="lazySrc"
      :src="src"
      alt="Image"
      class="mb-2"
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
    <div v-if="showButton" class="overlay"></div>
    <v-btn v-if="showButton" class="block-button text-none" size="small" prepend-icon="mdi-lock">
      {{ $t("CxVideo.bloqued") }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    lazySrc: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    showButton: {
      type: Boolean,
      default: false
    }
  },
};
</script>

<style scoped>
.video-container {
  position: relative;
}

.block-button {
  position: absolute;
  bottom: 15px; 
  left: 30px; 
  z-index: 10; 
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(128, 128, 128, 0.5);
  z-index: 5;
  border-radius: 0.5rem;
}
</style>
