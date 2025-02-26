<template>
    <v-btn block rel="noopener noreferrer" variant="outlined" class=" mt-3" size="large">
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
    },
    computed: {
      ...mapGetters([
        'isDarkTheme'
      ]),
      xIconPath() {
        return this.isDarkTheme ? xIcon : xBlackIcon;
      }
    },
};
</script>