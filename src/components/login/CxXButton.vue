<template>
  <v-btn 
      block 
      rel="noopener noreferrer" 
      variant="outlined" 
      class="mt-3 btn-shadow" 
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
          localStorage.setItem("preLoginUrl", window.location.pathname);
            var hostname = window.location.hostname;
           
            if (hostname === "www.earnlumens.org" || hostname === "earnlumens.org") {
                window.location.href = "https://api.earnlumens.org/oauth2/authorization/x";
            } else {
                window.location.href = "http://localhost.dv:852/oauth2/authorization/x";
            }
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
<style>
.btn-shadow {
  box-shadow: 0px 0px 13px 0px #FFFFFF !important;
}
</style>
