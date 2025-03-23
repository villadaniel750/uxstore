<template>
    <v-dialog v-model="dialog" width="640" scrollable>
      <template v-slot:activator="{ props }">
        <!-- <v-btn 
          v-if="mobileView"
          v-bind="props"
          class="ma-2"
          icon="mdi-login"
          variant="outlined"
          type="submit"
          color="primary"
          
          size="small">
        </v-btn> -->
  
        <v-btn 
          v-bind="props"
          type="submit"
          class="text-blue"
          >
          {{ $t("Common.addWallet") }}
        </v-btn>
  
      
      </template>
      <div>
        <v-card
          class="mx-auto pa-12 pb-8"
          elevation="8"
          max-width="640"
          rounded="lg"
        >
  
        <v-card-title class="text-h6 text-md-h5 text-lg-h4">{{ $t("Common.addWallet") }}</v-card-title>
  
  
        <!-- <cx-rabet-button></cx-rabet-button> -->
        
        <cx-lobstr-button></cx-lobstr-button>
  
        <!-- <cx-albedo-button></cx-albedo-button> -->
  
        <!-- <v-btn disabled @click="underDevelopment" block  rel="noopener noreferrer"  variant="tonal" style="border-color: #3B99FC; color: #3B99FC;" class="text-capitalize mt-3" size="large">
              <img src="@/assets/wallet-connect.svg" alt="Twitter" style="height: 24px; width: 24px; margin-right: 8px;"/>
              WalletConnect
            </v-btn> -->
          
        <!-- <cx-freighter-button></cx-freighter-button> -->
            
            <v-divider
              class="border-opacity-50 my-5"
              
            ></v-divider>
  
  
          
  
  
          
  
         
         
  
          <v-alert type="error" v-if="loginError" variant="tonal" >
            {{ $t("Common.invalidLogin") }} 
          </v-alert>
  
          
        </v-card>
      </div>
  
    </v-dialog>
  </template>
    
  <script>
  import { mapGetters } from "vuex";
  // import CryptoJS from "crypto-js";
  import api from "@/api";
  import CxXButton from "./login/CxXButton.vue";
  import CxAlbedoButton from './login/CxAlbedoButton.vue';
  import CxLobstrButton from './login/CxLobstrButton.vue';
  import CxRabetButton from "./login/CxRabetButton.vue";
  import CxFreighterButton from "./login/CxFreighterButton.vue";
  // Función independiente3
  function validateEmail(email) {
    let wep = email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return !!wep;
  }
  
  export default {
    data() {
        return {
        dialog: false,
        email: '',
        password: '',
        emailRules: [
          v => !!v || this.$t('CxLoginDialog.emailRequired'),
          v => validateEmail(v) || this.$t('CxLoginDialog.emailMostBeValid') // Uso de la función independiente
        ],
        passwordRules: [
          v => !!v || this.$t('CxLoginDialog.passwordRequired'),
          v => (v && v.length >= 8) || this.$t('CxLoginDialog.passwordMinLength')
        ],
        visible: false,
        isLoading: false,
        loginError: false,
        };
    },
    components: {
      CxAlbedoButton, CxLobstrButton, CxRabetButton, CxFreighterButton, CxXButton
      },
    methods: {
      async login() {
        this.loginError = false;
        if (this.isValid) {
          this.isLoading = true;
          try {         
            const result = await api.authenticate(this.email, this.password);
            console.log(result.status);
            console.log(result.data);
  
            if (result.status === 200) {
              this.$store.commit("setLoggedInTrue");
  
              //   window.localStorage.PUK = CryptoJS.AES.encrypt(
              //   result.data.xlmAddress,
              //   this.color
              // ).toString();
              
              // var encToken = CryptoJS.AES.encrypt(
              //   result.data.accessToken,
              //   result.data.xlmAddress
              // ).toString();
              // api.setUserLogged(encToken);
            }
            
            
          } catch (error) {
            this.loginError = true;
            if (error.response) {
              console.log("Error");
              console.log(error.response.status);
              console.log(error.response.headers);
              this.loginError = true;
            }
          } finally {
            this.isLoading = false;
          }
        }
      },
      handleEnterPress() {
      if (this.isValid && !this.isLoading) {
        this.login();
      }
      },
    showDialog() {
      this.dialog = true;
    }
    },
    computed: {
      ...mapGetters([
        'windowWidth', 'mobileView', 'color'
      ]),
      isValid() {
        return (
          this.emailRules.every(rule => rule(this.email) === true) &&
          this.passwordRules.every(rule => rule(this.password) === true)
        );
      }
    },
  }
  </script>
  