<template>
  <v-btn 
      block 
      rel="noopener noreferrer" 
      variant="outlined" 
      class="mt-3" 
      size="large" 
      @click="redirectToXLogin"
  >
      <img :src="xIconPath" alt="Twitter" style="height: 24px; width: 24px; margin-right: 8px;"/>
      {{ $t("Common.login") }}
  </v-btn>
</template>

<script>
import { mapGetters } from "vuex";
import xIcon from "@/assets/twitterx.svg";
import xBlackIcon from "@/assets/twitterx-black.svg";

export default {
  methods: {
      redirectToXLogin() {
          localStorage.setItem("pre-login-url", window.location.pathname);
          window.location.href = "https://api.earnlumens.org/auth/x/oauth2/authorization/twitter";
      }
  },
  computed: {
      ...mapGetters(['isDarkTheme']),
      xIconPath() {
          return this.isDarkTheme ? xIcon : xBlackIcon;
      }
  }
};
</script>
