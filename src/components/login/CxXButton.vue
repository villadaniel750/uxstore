<template>
  <v-btn 
      block 
      rel="noopener noreferrer" 
      variant="outlined" 
      class="mt-3" 
      size="large" 
      @click="loginWithX"
  >
      <img :src="xIconPath" alt="Twitter" style="height: 24px; width: 24px; margin-right: 8px;"/>
      {{ $t("CxLoginDialog.loginWithX") }}
  </v-btn>
</template>

<script>
import { mapGetters } from "vuex";
import xIcon from "@/assets/twitterx.svg";
import xBlackIcon from "@/assets/twitterx-black.svg";

export default {
  methods: {
      loginWithX() {
          const clientId = "WHdUand1aHozTlZlNXEyMEt6NF86MTpjaQ"; // ⚠️ Reemplaza con tu client_id real
          const redirectUri = "https://earnlumens.org/auth/x/callback";
          const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=users.read`;

          window.location.href = authUrl; // 🔹 Redirige en la misma ventana
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