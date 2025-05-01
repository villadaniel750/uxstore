<template>
  <div class="video-player-container">
    <div class="video-player-header">
      <div class="d-flex align-center">
        <span class="text-h6">{{ truncatedTitle }}</span>
      </div>
      <v-btn
        icon
        variant="text"
        class="close-btn"
        @click="$emit('close')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <iframe
      v-if="isYouTubeUrl"
      :src="youtubeEmbedUrl"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      class="youtube-iframe"
    ></iframe>
    <video
      v-else
      ref="videoPlayer"
      class="video-js vjs-big-play-centered"
      controls
      preload="auto"
      :poster="poster"
    >
      <source :src="videoUrl" type="video/mp4" />
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that supports HTML5 video
      </p>
    </video>
    <div class="video-player-footer">
      <div class="d-flex justify-center gap-4">
        <v-btn
          variant="text"
          class="action-btn"
          @click="handleWatchLater"
        >
          <span class="d-none d-sm-flex">Watch Later</span>
          <v-icon class="d-flex d-sm-none">mdi-clock-outline</v-icon>
        </v-btn>
        <v-btn
          variant="text"
          class="action-btn"
          @click="handleShare"
        >
          <span class="d-none d-sm-flex">Share</span>
          <v-icon class="d-flex d-sm-none">mdi-share-variant</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default {
  name: 'CxVideoPlayer',
  props: {
    videoUrl: {
      type: String,
      required: true
    },
    poster: {
      type: String,
      default: ''
    }
  },
  emits: ['close'],
  computed: {
    isYouTubeUrl() {
      return this.videoUrl.includes('youtube.com');
    },
    youtubeEmbedUrl() {
      if (!this.isYouTubeUrl) return '';
      const videoId = this.videoUrl.split('v=')[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=0`;
    }
  },
  methods: {
    handleWatchLater() {
      // Implement watch later functionality
      console.log('Watch later clicked');
    },
    handleShare() {
      // Implement share functionality
      console.log('Share clicked');
    }
  },
  data() {
    return {
      player: null
    };
  },
  mounted() {
    if (!this.isYouTubeUrl) {
      this.player = videojs(this.$refs.videoPlayer, {
        fluid: true,
        aspectRatio: '16:9',
        controls: true,
        autoplay: false,
        preload: 'auto'
      });
    }
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>

<style scoped>
.video-player-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.video-player-header {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  padding: 8px;
}

.video-player-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding: 16px;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
}

.close-btn {
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.2s;
}

.close-btn:hover {
  color: rgba(255, 255, 255, 1);
}

.action-btn {
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.2s;
  min-width: unset;
  padding: 0 8px;
}

.action-btn:hover {
  color: rgba(255, 255, 255, 1);
  transform: translateY(-2px);
}

.gap-4 {
  gap: 16px;
}

.video-js,
.youtube-iframe {
  width: 100%;
  height: 450px;
  border-radius: 8px;
}

.youtube-iframe {
  border: none;
}

/* Mobile specific styles */
@media (max-width: 600px) {
  .video-js,
  .youtube-iframe {
    height: 250px;
  }

  .video-player-footer {
    padding: 8px;
  }

  .action-btn {
    padding: 0 4px;
  }

  .gap-4 {
    gap: 8px;
  }
}
</style> 