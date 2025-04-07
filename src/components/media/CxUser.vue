<template>
  <v-card
    class="cx-user"
    flat
    :class="{ 'is-loading': !profile_image_url }"
  >
    <v-card-item class="pa-0">
      <div class="flex flex-col items-center whitespace-nowrap">
        <v-avatar
          :image="profile_image_url"
          size="120"
          class="mb-2"
        />        
        <div class="text-subtitle-1 text-truncate font-weight-medium text-center">
            {{ username }} 
        </div>            
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

.flex.flex-col.items-center.whitespace-nowrap > * {
  white-space: nowrap;
}
</style>
