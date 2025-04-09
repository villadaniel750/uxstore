<template>
  <v-card
    rounded="lg"
    variant="text"
    style="min-height: 230px"
    class="d-flex flex-column bg-transparent"
  >
    <div class="flex-grow-1 relative">
      <template v-if="loading">
        <v-skeleton-loader
          style="height: 230px"
          :type="`card-avatar, list-item-avatar-two-line`"
          class="mx-auto"
        >
          <template v-slot:default>
            <v-card-text class="pa-0">
              <v-skeleton-loader
                type="image, list-item-avatar-two-line"
              ></v-skeleton-loader>
            </v-card-text>
          </template>
        </v-skeleton-loader>
      </template>
      <template v-else>
        <div class="position-relative">
          <v-overlay
            :model-value="blocked"
            class="align-end pb-3 pl-3 rounded-lg"
            style="z-index: 1"
            scrim="grey-darken-1"
            opacity="0.6"
            persistent
            contained
          >
          </v-overlay>
          <v-img
            :lazy-src="lazySrc"
            :src="src"
            alt="Image"
            aspect-ratio="16/9"
            rounded="lg"
            :class="{ 'opacity-60': blocked }"
            @loadstart="$emit('loadstart')"
            @load="loadFinished"
          >
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="primary" />
              </v-row>
            </template>
          </v-img>
        </div>
        <div class="position-relative">
          <v-btn
            v-if="blocked"
            class="text-none position-absolute left-0 bottom-0 ml-3 mb-3"
            style="z-index: 2"
            size="small"
            prepend-icon="mdi-lock"
          >
            {{ $t("CxVideo.bloqued") }}
          </v-btn>
          <div
            v-if="isPlaylist"
            class="position-absolute right-0 bottom-0 text-body-2 bg-black opacity-60 rounded pb-1 pt-1 pl-1 pr-1 mr-3 mb-3 elevation-2"
            style="z-index: 9999999"
          >
            <b class="opacity-100">13:02</b>
          </div>

          <div
            v-if="!isPlaylist && playlistCount % 3 === 0"
            class="d-flex align-center position-absolute right-0 bottom-0 text-body-2 opacity-60 bg-black rounded pb-1 pt-1 pl-1 pr-1 mr-3 mb-3 elevation-3"
            style="z-index: 9999999"
          >
            <v-icon
              icon="mdi-playlist-play"
              class="opacity-100"
              size="small"
            ></v-icon>
            <b class="opacity-100">{{ playlistCount }}</b>
          </div>
        </div>
      </template>
    </div>
    <div v-if="imageLoaded" class="d-flex justify-space-between">
      <div class="d-flex align-center">
        <v-card
          :class="['ma-4', selectedClass]"
          height="45"
          width="45"
          min-width="45"
          min-height="45"
          flat
          tile
          color="transparent"
        >
          <v-img
            lazy-src="https://randomuser.me/api/portraits/men/22.jpg"
            src="https://randomuser.me/api/portraits/men/22.jpg"
            alt="Image"
            cover
            class="fill-height"
            rounded="circle"
          />
        </v-card>

        <div class="">
          <div class="text-caption truncate-text text-left">
            {{ title }}
          </div>
          <div class="w-100 text-no-wrap overflow-hidden text-left">
            <span class="text-caption font-weight-bold">{{ username }}</span>
            <v-img
              v-if="profileBadge === 1"
              class="d-inline-block ml-1"
              style="vertical-align: middle"
              height="14"
              width="14"
              src="/src/assets/blue-verified-badge.svg"
            ></v-img>
            <v-img
              v-if="profileBadge === 2"
              class="d-inline-block ml-1"
              style="vertical-align: middle"
              height="14"
              width="14"
              src="/src/assets/yellow-verified-badge.svg"
            ></v-img>
            <span class="text-caption ml-1">{{ " • " + uploadDate }}</span>
          </div>
        </div>
      </div>

      <div class="pt-4">
        <v-menu>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              variant="text"
              prepend-icon="mdi-dots-vertical"
              width="10"
              size="x-small"
              v-bind="activatorProps"
            ></v-btn>
          </template>

          <v-list>
            <v-list-item @click="onClick">
              <v-list-item-title>Add to favorite</v-list-item-title>
            </v-list-item>

            <v-list-item @click="onClick">
              <v-list-item-title>Share</v-list-item-title>
            </v-list-item>

            <v-list-item @click="onClick">
              <v-list-item-title>Follow</v-list-item-title>
            </v-list-item>

            <v-list-item @click="onClick">
              <v-list-item-title>Contact</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
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
      default: false,
    },
    playlistCount: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      default: "",
    },
    uploadDate: {
      type: String,
      default: "",
    },
    profileBadge: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      imageLoaded: false, // Define variable
    };
  },
  methods: {
    loadFinished() {
      this.imageLoaded = true;
    },
  },
};
</script>

<style scoped>
.truncate-text {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limits the text to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal; /* Allows text to wrap */
}
.v-skeleton-loader {
  border-radius: 10px;
}

.v-skeleton-loader ::v-deep .v-skeleton-loader__image {
  height: 146px;
  border-radius: 10px;
}
</style>
