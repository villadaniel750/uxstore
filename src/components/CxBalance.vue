<template>
<v-container>
    <div class="ma-10">
        <div>
            <!-- When no wallet is connected, show direct CxAddWallet button -->
            <div v-if="!lobstrPublicKey && !freighterPublicKey" class="text-center">
                <v-btn 
                    prepend-icon="mdi-wallet" 
                    variant="outlined" 
                    type="submit" 
                    color="primary" 
                    class="mt-2 mx-auto mb-6" 
                    rounded 
                    max-width="250"
                    @click="openConnectWallet"
                >
                    <span class="d-inline-block text-truncate" style="max-width: 140px;">
                        Connect Wallet
                    </span>
                </v-btn>
            </div>

            <!-- When wallet is connected, show bottom sheet -->
            <v-bottom-sheet v-else>
                <template v-slot:activator="{ props: activatorProps }">
                    <div class="text-center">
                        <v-btn v-bind="activatorProps" prepend-icon="mdi-wallet" append-icon="mdi-menu-down" variant="outlined" type="submit" color="primary" class="mt-2 mx-auto mb-6" rounded max-width="250">
                            <span class="d-inline-block text-truncate" style="max-width: 140px;">
                                {{ formattedAddr }}
                            </span>
                        </v-btn>
                    </div>
                </template>

                <v-card text="" class="px-6 rounded-t-lg pb-3">
                    <div class="d-flex justify-space-between flex-column">
                        <div class="d-flex justify-space-between align-center">
                            <span class="text-h4 text-md-h5 text-lg-h7">Connected Wallets</span>
                            <v-btn 
                                @click="openConnectWallet"
                                class="text-blue-accent-2"
                            >
                                Add Wallet
                            </v-btn>
                        </div>
                        <div class="mt-2">
                            <v-list>
                                <v-list-item
                                    v-for="(wallet, index) in connectedWallets"
                                    :key="index"
                                    :title="wallet.name"
                                    :subtitle="formatAddress(wallet.address)"
                                >
                                    <template v-slot:prepend>
                                        <v-avatar color="grey-lighten-1">
                                            <v-icon>mdi-wallet</v-icon>
                                        </v-avatar>
                                    </template>
                                    <template v-slot:append>
                                        <v-btn
                                            variant="text"
                                            color="grey"
                                            @click="manageWallet(wallet)"
                                        >
                                            <v-icon class="mr-2">mdi-dots-vertical</v-icon>
                                            Manage Wallet
                                        </v-btn>
                                    </template>
                                </v-list-item>
                            </v-list>
                        </div>
                    </div>
                </v-card>
            </v-bottom-sheet>

            <!-- Standalone CxAddWallet component for both cases -->
            <CxAddWallet ref="addWalletDialog" />
            
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
        async requestBalance() {
            try {
                // Check for either Lobstr or Freighter wallet
                const walletAddress = this.lobstrPublicKey || this.freighterPublicKey;
                if (walletAddress) {
                    const result = await api.getBalance(walletAddress);
                    console.log("result", result);
                    this.saldo = result.data.balances[0].balance;
                    this.isLoading = false;
                }
            } catch (error) {
                console.error(error);
                this.isLoading = true;
            }
        },
        theFormat(number) {
            const calcDec = Math.pow(10, 2);
            return Math.trunc(number * calcDec) / calcDec;
            //return number.toFixed(2);
        },
        openConnectWallet() {
            this.$refs.addWalletDialog.showDialog();

            // if (!this.lobstrPublicKey) {
            //     // If no wallet connected, open the dialog directly
            //     this.$refs.addWalletDialog.showDialog();
            // }
        },
        formatAddress(address) {
            if (!address || address.length <= 15) return address;
            return `${address.substring(0, 6)}...${address.substring(address.length - 6)}`;
        },
        manageWallet(wallet) {
            // Implement wallet management functionality
            console.log('Managing wallet:', wallet);
        }
    },
    mounted() {
        // Start with loading state when no wallet is connected
        this.isLoading = true;
    },
    watch: {
        lobstrPublicKey: {
            immediate: true,
            handler(newValue) {
                if (newValue) {
                    // When Lobstr wallet is connected
                    this.requestBalance(); // Initial balance request
                    this.intervalId = setInterval(this.requestBalance, 1100);
                } else if (!this.freighterPublicKey) {
                    // Only clear interval if no Freighter wallet is connected
                    if (this.intervalId) {
                        clearInterval(this.intervalId);
                    }
                    this.saldo = 0;
                    this.isLoading = true;
                }
            }
        },
        freighterPublicKey: {
            immediate: true,
            handler(newValue) {
                if (newValue) {
                    // When Freighter wallet is connected
                    this.requestBalance(); // Initial balance request
                    this.intervalId = setInterval(this.requestBalance, 1100);
                } else if (!this.lobstrPublicKey) {
                    // Only clear interval if no Lobstr wallet is connected
                    if (this.intervalId) {
                        clearInterval(this.intervalId);
                    }
                    this.saldo = 0;
                    this.isLoading = true;
                }
            }
        }
    },
    unmounted() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    },
    computed: {
        ...mapGetters([
            'addr', 'isDarkTheme', 'lobstrPublicKey', 'freighterPublicKey'
        ]),
        lobstrPublicKeyDebug() {
            return this.lobstrPublicKey;
        },
        iconPath() {
            return this.isDarkTheme ? stellarLogo : stellarLogoBlack;
        },
        formattedAddr() {
            if (!this.addr || this.addr.length <= 15) return this.addr;
            return `${this.addr.substring(0, 6)}...${this.addr.substring(this.addr.length - 6)}`;
        },
        connectedWallets() {
            const wallets = [];
            if (this.lobstrPublicKey) {
                wallets.push({
                    name: 'Lobstr',
                    address: this.lobstrPublicKey,
                    type: 'lobstr'
                });
            }
            if (this.freighterPublicKey) {
                wallets.push({
                    name: 'Freighter',
                    address: this.freighterPublicKey,
                    type: 'freighter'
                });
            }
            return wallets;
        }
    },
    components: {
        Loading,
    },

};
</script>
