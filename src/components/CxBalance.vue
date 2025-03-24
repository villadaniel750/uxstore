<template>
<v-container>
    <div class="ma-10">
        <div>
            <v-bottom-sheet>
                <template v-slot:activator="{ props: activatorProps }">
                    <div class="text-center">
                        <v-btn v-bind="activatorProps" prepend-icon="mdi-wallet" append-icon="mdi-menu-down" variant="outlined" type="submit" color="primary" class="mt-2 mx-auto mb-6" rounded max-width="250" @click="copyTextToClipboard(addr)">
                            <span class="d-inline-block text-truncate" style="max-width: 140px;">
                                {{ formattedAddr }}
                            </span>
                        </v-btn>
                    </div>
                </template>

                <v-card text="" class="px-6 rounded-t-lg pb-3">
                    <div class="d-flex justify-space-between flex-column">
                        <div class="d-flex justify-space-between">

                            <span class="text-h4 text-md-h5 text-lg-h7">Choose Wallet</span>

                            <CxAddWallet />
                        </div>
                        <div class="mt-2 d-flex flex-column align-center text-center">
                            <div v-if="lobstrPublicKeyDebug" class="text-caption text-grey text-h6">
                                <p class="text-h6">Lobstr: {{ lobstrPublicKeyDebug }}</p>
                            </div>
                            <v-btn v-if="lobstrPublicKeyDebug"  class="mt-4" @click="">Manage Wallet</v-btn>
                            <div v-else class="text-caption text-grey text-h6">
                                <p class="text-h6">No Lobstr wallet connected</p>
                            </div>
                        </div>
                    </div>
                </v-card>
            </v-bottom-sheet>
            <div class="d-flex justify-center align-center">

                <img :src="iconPath" width="63" class="mr-3" />

                <div>
                    <h1 class="text-center text-h4 text-md-h3">Stellar </h1>
                    <div class="text-body-2 font-weight-light mt-n1">{{ $t("Common.wallet") }}</div>
                </div>
            </div>
        </div>
        <v-row class="align-center justify-center mt-1">
            <v-col cols="auto"> </v-col>
            <v-col cols="auto" class="px-0 mr-1">
                <div class="vl-parent">
                    <loading v-model:active="isLoading" :can-cancel="false" :loader="'dots'" :color="'#FFAB40'" :background-color="'transparent'" :opacity="1" :on-cancel="onCancel" :is-full-page="fullPage" :z-index=1000 />
                    <h2 class="text-h3 font-weight-bold mt-3 text-transparent" :class="{'mx-6': isLoading, 'mx-0': !isLoading, 'text-orange-accent-2': !isLoading}">
                        <number :from="0" :to="this.saldo" :format="theFormat" :duration="1.5" :delay="0" easing="Power1.easeOut" />
                    </h2>
                </div>
            </v-col>
            <v-col cols="auto" class="text-left px-0 pt-0">
                <h2 v-if="!isLoading" class="text-left text-body-1 font-weight-bold text-orange-accent-2">XLM</h2>
            </v-col>
        </v-row>

    </div>
</v-container>
</template>

f

<script>
import CxAddWallet from "@/components/CxAddWallet.vue";

import api from "@/api";
import Loading from "vue-loading-overlay";
import 'vue-loading-overlay/dist/css/index.css';
import stellarLogo from "@/assets/stellar.svg";
import stellarLogoBlack from "@/assets/stellar-black.svg";
import {
    mapGetters,
    mapMutations
} from "vuex";
export default {
    data: () => ({
        address: "",
        saldo: 0,
        logoUrl: stellarLogo,
        isLoading: false,
        fullPage: false,
    }),
    components: {
        CxAddWallet,
    },
    methods: {
        async requestBalance() { // <-- Declara el método como async
            try {
                const result = await api.getBalance(this.addr); // <-- Usa await aquí
                this.saldo = result.data.balances[0].balance;
                this.isLoading = false;
            } catch (error) {
                console.error(error);
            }
        },
        theFormat(number) {
            const calcDec = Math.pow(10, 2);
            return Math.trunc(number * calcDec) / calcDec;
            //return number.toFixed(2);
        },

    },
    mounted() {
        this.isLoading = true;
        this.intervalId = setInterval(this.requestBalance, 1100);
    },
    unmounted() {
        clearInterval(this.intervalId);
    },
    computed: {
        ...mapGetters([
            'addr', 'isDarkTheme', 'lobstrPublicKey'
        ]),
        lobstrPublicKeyDebug() {
            console.log("current lobstrPublicKey ====>", this.lobstrPublicKey);
            return this.lobstrPublicKey;
        },
        iconPath() {
            return this.isDarkTheme ? stellarLogo : stellarLogoBlack;
        },
        formattedAddr() {
            if (!this.addr || this.addr.length <= 15) return this.addr; // Si es corta, no truncar
            return `${this.addr.substring(0, 6)}...${this.addr.substring(this.addr.length - 6)}`;
        },

    },
    components: {
        Loading,
    },

};
</script>
