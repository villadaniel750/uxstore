<template>
  <v-container>
    <cx-fan-header 
      :profileBadge="profileBadge"
      :username="username"
      :profileImage="profileImage"
      :followers="followers"
      :likes="likes"
    ></cx-fan-header>
    <cx-tab-body></cx-tab-body>
  </v-container>
</template>

<script>
import CxFanHeader from "@/components/fan/CxFanHeader";
import CxTabBody from "@/components/fan/CxTabBody.vue";

export default {
  name: "UserProfile",
  components: {
    CxFanHeader,
    CxTabBody,
  },
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      profileBadge: Number(this.$route.query.profileBadge) || 0,
      profileImage: this.$route.query.profileImage || '',
      followers: 0, // You can update this with actual data
      likes: 0, // You can update this with actual data
    };
  },
  watch: {
    '$route.query': {
      handler(newQuery) {
        this.profileImage = newQuery.profileImage || '';
        this.profileBadge = Number(newQuery.profileBadge) || 0;
      },
      immediate: true
    }
  }
};
</script>

<style></style> 