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

// 🔹 Genera un `code_challenge` para PKCE (simplificado)
function generateCodeChallenge() {
    const codeVerifier = btoa(Math.random().toString(36).substring(2, 15)); // 🔹 String aleatorio
    return btoa(codeVerifier).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

export default {
  methods: {
      loginWithX() {
          const clientId = "WHdUand1aHozTlZlNXEyMEt6NF86MTpjaQ";
          const redirectUri = "https://earnlumens.org/auth/x/callback";
          const codeChallenge = generateCodeChallenge();
          const state = Math.random().toString(36).substring(2, 15); // 🔹 Random CSRF protection

          const authUrl = `https://twitter.com/i/oauth2/authorize
              ?response_type=code
              &client_id=${clientId}
              &redirect_uri=${encodeURIComponent(redirectUri)}
              &scope=users.read
              &state=${state}
              &code_challenge=${codeChallenge}
              &code_challenge_method=S256
              &prompt=consent`;

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
