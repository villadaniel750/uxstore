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
      contained
    >
      <v-btn class="text-none" size="small" prepend-icon="mdi-lock">
        {{ $t("CxVideo.bloqued") }}
      </v-btn>
    </v-overlay>
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
  },
};
</script>

<style scoped></style>
