<template>
  <!-- <v-container fluid>
  <h1>{{ $t("PxSideMenu.wallet") }}</h1>
</v-container> -->

  <cx-balance></cx-balance>

  <v-card class="fill-height">
    <v-tabs v-model="tab" color="orange-accent-2" align-tabs="center">
      <v-tab value="deposit">{{ $t("Wallet.deposit") }}</v-tab>
      <v-tab value="withdraw">{{ $t("Wallet.withdraw") }}</v-tab>
      <v-tab value="history">{{ $t("Wallet.history") }}</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="deposit">
        <cx-deposit></cx-deposit>
      </v-window-item>

      <v-window-item value="withdraw">
        <cx-withdraw></cx-withdraw>
      </v-window-item>

      <v-window-item value="history">
        <cx-history></cx-history>
      </v-window-item>
    </v-window>
  </v-card>
</template>
  
<script>
import CxBalance from "@/components/CxBalance";
import CxDeposit from "@/components/CxDeposit";
import CxWithdraw from "@/components/CxWithdraw";
import CxHistory from "@/components/CxHistory";
import { mapGetters } from "vuex";
//import CryptoJS from "crypto-js";

export default {
  data: () => ({
    tab: null,
  }),
  components: {
    CxBalance,
    CxDeposit,
    CxWithdraw,
    CxHistory,
  },
  created: function () {
    // if (this.loggedIn) {
    //   var address = CryptoJS.AES.decrypt(
    //     window.localStorage.PUK,
    //     this.color
    //   ).toString(CryptoJS.enc.Utf8);
    //   this.$store.commit('setAddr', address);
    // } else {
    //   this.$router.push("/");
    // }

    // agregado para pruebas
    var address = "GC3FXWO34T3TDTKUHO4JCFGOQEXLRZKKWP2GLKME7PZAKF4YYOIPVOJV";
    this.$store.commit('setAddr', address);
  },
  beforeRouteLeave(to, from, next) {
     this.$store.commit('clearAddr');
     next();
  },
  computed: {
    ...mapGetters([
      'color', 'loggedIn', 'addr'
    ])
  },
};//ss
</script>


