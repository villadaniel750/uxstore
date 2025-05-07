code


<template>
  <div class="video-player-container">
    <div class="video-player-header">
      <div class="d-flex align-center">
        <span class="text-h6">{{ title }}</span>
      </div>
      <v-btn
        icon
        variant="text"
        class="close-btn"
        no-tooltip
        @click="$emit('close')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <div class="video-wrapper">
      <div v-if="isLoading" class="loading-overlay">
        <v-progress-circular
          indeterminate
          :size="50"
          color="primary"
        ></v-progress-circular>
      </div>
      <video
        ref="videoPlayer"
        class="video-js vjs-big-play-centered"
        controls
        preload="auto"
        :poster="poster"
        @canplay="handleVideoLoad"
        @loadeddata="handleVideoLoad"
      >
        <source :src="videoUrl" type="video/mp4" />
        <p class="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that supports HTML5 video
        </p>
      </video>
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
  data() {
    return {
      player: null,
      isLoading: true
    };
  },
  methods: {
    handleVideoLoad() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    }
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, {
      fluid: true,
      aspectRatio: '16:9',
      controls: true,
      autoplay: true,
      preload: 'auto',
      muted: true
    });
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
  overflow: hidden;
}

.video-wrapper {
  position: relative;
  background: #000;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
}

.video-wrapper video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
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
  .video-player-container {
    max-width: 100%;
  }
  
  .video-wrapper {
    padding-bottom: 56.25%; /* Maintain 16:9 aspect ratio on mobile */
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