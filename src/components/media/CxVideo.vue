<template>
  <v-card
    rounded="lg"
    variant="text"
    style="min-height: 230px"
    class="d-flex flex-column bg-transparent"
    @click="handleClick"
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
            v-if="!isPlaylist"
            class="position-absolute right-0 bottom-0 text-body-2 bg-black opacity-60 rounded pb-1 pt-1 pl-1 pr-1 mr-3 mb-3 elevation-2"
            style="z-index: 9999999"
          >
            <b class="opacity-100">{{ formattedDuration }}</b>
          </div>

          <div
            v-if="isPlaylist"
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
          :class="['ma-2', selectedClass]"
          height="45"
          width="45"
          min-width="45"
          min-height="45"
          flat
          tile
          color="transparent"
        >
          <v-img
            :lazy-src="profileImage"
            :src="profileImage"
            alt="Image"
            cover
            class="fill-height"
            rounded="circle"
          />
        </v-card>

        <div class="">
          <div class="text-caption truncate-text text-left">
            <v-tooltip
              :text="title"
              location="bottom"
              :disabled="title.length <= 30"
            >
              <template v-slot:activator="{ props }">
                <span v-bind="props">{{ title }}</span>
              </template>
            </v-tooltip>
          </div>
          <div class="w-100 text-no-wrap overflow-hidden text-left">
            <span 
              class="text-caption font-weight-bold cursor-pointer" 
              @click="navigateToUser"
            >{{ username }}</span>
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

      <div class="">
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

  <v-dialog
    v-model="showVideoDialog"
    max-width="800"
    transition="dialog-bottom-transition"
    class="video-dialog"
  >
    <v-card class="video-card">
      <v-card-text class="pa-0">
        <CxVideoPlayer 
          :video-url="selectedVideoUrl" 
          :title="title"
          @close="showVideoDialog = false"
        />
      </v-card-text>
    </v-card>
  </v-dialog>

  <CxBlockedDialog v-model="showBlockedDialog" />
  <v-dialog
    v-model="showPlaylistDialog"
    max-width="800"
    transition="dialog-bottom-transition"
    class="playlist-dialog"
    :fullscreen="$vuetify.display.mobile"
  >
    <v-card class="playlist-card">
      <v-card-title class="d-flex justify-space-between align-center pa-4">
        <div class="d-flex align-center" style="width: calc(100% - 40px);">
          <v-icon icon="mdi-playlist-play" class="mr-2" />
          <div class="text-h6 text-truncate">{{ title }}</div>
        </div>
        <v-btn
          icon
          variant="text"
          class="close-btn"
          @click="showPlaylistDialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-4">
        <div class="d-flex align-center mb-4">
          <v-avatar size="40" class="mr-3">
            <v-img :src="profileImage" />
          </v-avatar>
          <div>
            <div class="text-subtitle-1 font-weight-bold">{{ username }}</div>
            <div class="text-caption">{{ playlistCount }} videos</div>
          </div>
        </div>
        <v-list>
          <v-list-item
            v-for="(video, index) in playlistVideos"
            :key="index"
            class="mb-2 playlist-item"
            @click="playVideo(video)"
          >
            <template v-slot:prepend>
              <v-avatar
                size="80"
                rounded="lg"
                class="mr-3"
              >
                <v-img :src="video.thumbnail" />
                <div class="position-absolute right-0 bottom-0 text-body-2 bg-black opacity-60 rounded pb-1 pt-1 pl-1 pr-1 mr-1 mb-1">
                  {{ formatDuration(video.duration) }}
                </div>
              </v-avatar>
            </template>
            <v-list-item-title class="text-subtitle-1">
              {{ truncateTitle(video.title) }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ video.views }} views • {{ formatDate(video.uploadDate) }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import CxVideoPlayer from './CxVideoPlayer.vue';
import CxBlockedDialog from './CxBlockedDialog.vue';

const SAMPLE_VIDEOS = [
  'https://www.youtube.com/watch?v=5sklIwA0P-Q',
  'https://www.youtube.com/watch?v=H5i9J_YwHuw',
  'https://www.youtube.com/watch?v=SFQe2IjotLI'
];

export default {
  components: {
    CxVideoPlayer,
    CxBlockedDialog
  },
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
    profileImage: {
      type: String,
      default: "",
    },
    duration: {
      type: Number,
      default: 0,
    },
    userId: {
      type: String,
      default: "",
      required: true
    },
  },
  data() {
    return {
      imageLoaded: false,
      showVideoDialog: false,
      showBlockedDialog: false,
      showPlaylistDialog: false,
      selectedVideoUrl: '',
      playlistVideos: [
        {
          title: 'Sample Video 1',
          thumbnail: 'https://i.ytimg.com/vi/5sklIwA0P-Q/maxresdefault.jpg',
          duration: 180,
          views: '1.2M',
          uploadDate: '2024-03-15',
          url: 'https://www.youtube.com/watch?v=5sklIwA0P-Q'
        },
        {
          title: 'Sample Video 2',
          thumbnail: 'https://i.ytimg.com/vi/H5i9J_YwHuw/maxresdefault.jpg',
          duration: 240,
          views: '856K',
          uploadDate: '2024-03-14',
          url: 'https://www.youtube.com/watch?v=H5i9J_YwHuw'
        },
        {
          title: 'Sample Video 3',
          thumbnail: 'https://i.ytimg.com/vi/SFQe2IjotLI/maxresdefault.jpg',
          duration: 300,
          views: '2.1M',
          uploadDate: '2024-03-13',
          url: 'https://www.youtube.com/watch?v=SFQe2IjotLI'
        }
      ]
    };
  },
  computed: {
    formattedDuration() {
      if (!this.duration) return '0:00';
      const hours = Math.floor(this.duration / 3600);
      const minutes = Math.floor((this.duration % 3600) / 60);
      const seconds = this.duration % 60;
      
      if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      } else {
        return `${minutes}:${String(seconds).padStart(2, '0')}`;
      }
    },   
  },
  methods: {
    loadFinished() {
      this.imageLoaded = true;
    },
    handleClick() {
      if (this.blocked) {
        this.showBlockedDialog = true;
      } else if (this.isPlaylist) {
        this.showPlaylistDialog = true;
      } else {
        this.selectedVideoUrl = SAMPLE_VIDEOS[Math.floor(Math.random() * SAMPLE_VIDEOS.length)];
        this.showVideoDialog = true;
      }
    },
    navigateToUser(e) {
      e.stopPropagation(); // Prevent video click when clicking username
      console.log("CxVideo component props:", {
        username: this.username,
        profileImage: this.profileImage,
        profileBadge: this.profileBadge
      });
      if (this.username) {
        this.$router.push({
          path: `/${this.username}`,
          query: {
            profileImage: this.profileImage,
            profileBadge: this.profileBadge,
            username: this.username
          }
        });
      } else {
        console.warn("No username provided to CxVideo component");
      }
    },
    playVideo(video) {
      this.selectedVideoUrl = video.url;
      this.showPlaylistDialog = false;
      this.showVideoDialog = true;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
    formatDuration(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
    },
    truncateTitle(title) {
      if (title.length > 30) {
        return title.substring(0, 30) + '...';
      }
      return title;
    }
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

.video-dialog {
  border-radius: 8px;
  overflow: hidden;
}

.video-card {
  background: #1a1a1a;
  color: white;
}

.video-card .v-card-title {
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.video-card .v-card-text {
  background: #000;
}

.playlist-dialog {
  border-radius: 8px;
  overflow: hidden;
}

.playlist-card {
  background: #1a1a1a;
  color: white;
}

.playlist-card .v-card-title {
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.playlist-card .v-list-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.playlist-card .v-list-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.position-absolute {
  position: absolute;
}

.right-0 {
  right: 0;
}

.bottom-0 {
  bottom: 0;
}

.playlist-card .v-btn {
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.2s;
}

.playlist-card .v-btn:hover {
  color: rgba(255, 255, 255, 1);
}

.playlist-card .v-list-item-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.playlist-card .close-btn {
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.2s;
}

.playlist-card .close-btn:hover {
  color: rgba(255, 255, 255, 1);
}

.playlist-card .text-h6 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%;
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

/* Mobile specific styles */
@media (max-width: 600px) {
  .playlist-dialog {
    border-radius: 0;
  }

  .playlist-card .v-card-title {
    padding: 12px;
  }

  .playlist-card .v-card-text {
    padding: 12px;
  }

  .playlist-item {
    padding: 8px !important;
  }

  .playlist-item .v-avatar {
    width: 60px !important;
    height: 60px !important;
  }
}
</style>
