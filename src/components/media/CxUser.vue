<template>
  <v-card
    class="cx-user"
    flat
    :class="{ 'is-loading': !profile_image_url }"
  >
    <v-card-item class="pa-0">
      <div class="d-flex flex-column align-center">
        <v-avatar
          v-if="profile_image_url"
          :image="profile_image_url"
          size="120"
          class="mb-2"
        />
        <v-skeleton-loader
          v-else
          type="avatar"
          width="120"
          height="120"
          class="mb-2"
        />
        
        <div v-if="username" class="text-subtitle-1 font-weight-medium text-center">
          {{ username }}
        </div>
        <v-skeleton-loader
          v-else
          type="text"
          width="80"
          class="mt-1"
        />
      </div>
    </v-card-item>
  </v-card>
</template>

<script>
export default {
  name: 'CxUser',
  props: {
    profile_image_url: {
      type: String,
      default: null
    },
    username: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>
.cx-user {
  width: 120px;
  background: transparent !important;
}

.cx-user :deep(.v-skeleton-loader__avatar) {
  border-radius: 50%;
}

.cx-user :deep(.v-skeleton-loader__text) {
  border-radius: 4px;
}
</style>
