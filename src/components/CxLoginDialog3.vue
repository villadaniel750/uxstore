<template>
  <v-dialog v-model="dialog" width="640" scrollable>
    <template v-slot:activator="{ props }">
      <v-btn 
        v-if="mobileView"
        v-bind="props"
        class="ma-2"
        icon="mdi-login"
        variant="outlined"
        type="submit"
        color="primary"
        
        size="small">
      </v-btn>

      <v-btn 
        v-else
        v-bind="props"
        class="ma-2"
        prepend-icon="mdi-login"
        variant="outlined"
        type="submit"
        color="primary"
        >
        {{ $t("Common.login") }}
      </v-btn>

    
    </template>
    <div>
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="640"
        rounded="lg"
      >

      <v-card-title class="text-h6 text-md-h5 text-lg-h4">{{ $t("Common.login") }}</v-card-title>

      <v-btn @click="isLobstrConnected" block  rel="noopener noreferrer"  variant="tonal" style="border-color: #4fa2bc; color: #4fa2bc;" class="text-capitalize mt-3" size="large">
            <img src="@/assets/lobstr.svg" alt="Twitter" style="height: 24px; width: 24px; margin-right: 8px;"/>
            LOBSTR
          </v-btn>
        
      <v-btn @click="underDevelopment" block  rel="noopener noreferrer"  variant="tonal" style="border-color: #6969F2; color: #6969F2;" class="text-capitalize mt-3" size="large">
            <img src="@/assets/freighter.svg" alt="Twitter" style="height: 24px; width: 24px; margin-right: 8px;"/>
            Freighter
          </v-btn>

      <v-btn @click="underDevelopment" block  rel="noopener noreferrer"  variant="tonal" style="border-color: #0691b7; color: #0691b7;" class="text-capitalize mt-3" size="large">
            <img src="@/assets/albedo.svg" alt="Twitter" style="height: 24px; width: 24px; margin-right: 8px;"/>
            Albedo
          </v-btn>
          
      <v-btn @click="underDevelopment" block  rel="noopener noreferrer"  variant="tonal" style="border-color: #B8BAC4; color: #B8BAC4;" class="text-capitalize mt-3" size="large">
            <img src="@/assets/rabet.svg" alt="Twitter" style="height: 24px; width: 24px; margin-right: 8px;"/>
            Rabet
          </v-btn>

      <v-btn @click="underDevelopment" block  rel="noopener noreferrer"  variant="tonal" style="border-color: #C19CFC; color: #C19CFC;" class="text-capitalize mt-3" size="large">
            <img src="@/assets/xbull.svg" alt="Twitter" style="height: 24px; width: 24px; margin-right: 8px;"/>
            xBull
          </v-btn>
          
      <v-btn @click="underDevelopment" block  rel="noopener noreferrer"  variant="tonal" style="border-color: #3B99FC; color: #3B99FC;" class="text-capitalize mt-3" size="large">
            <img src="@/assets/walletConnect.svg" alt="Twitter" style="height: 24px; width: 24px; margin-right: 8px;"/>
            WalletConnect
          </v-btn>

          <v-divider
            class="border-opacity-50 my-5"
            
          ></v-divider>


        

        <div class="text-subtitle-1 text-medium-emphasis">{{ $t("Common.email") }}</div>

        <v-text-field
          density="compact"
          :placeholder="$t('Common.emailAddress')"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          :disabled="isLoading"
          required
          v-model="email"
          :rules="emailRules"
          @keydown.enter="handleEnterPress"
          type="email"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          {{ $t("Common.password") }}
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          :placeholder="$t('Common.enterYourPassword')"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          :disabled="isLoading"
          required
          v-model="password"
          @click:append-inner="visible = !visible"
          :rules="passwordRules"
          @keydown.enter="handleEnterPress"
        ></v-text-field>

        <v-btn
          :loading="isLoading"
          block
          class="mb-8 mt-4"
          color="primary"
          size="large"
          variant="outlined"
          @click="login" 
          :disabled="!isValid || isLoading"
        >
          {{ $t("Common.login") }}
        </v-btn>

        <v-alert type="error" v-if="loginError" variant="tonal" >
          {{ $t("Common.invalidLogin") }} 
        </v-alert>

        <v-card-text class="text-center">
          <p class="text-disabled text-caption">Dev purpose | user: sat@gmx.com | pass: trustline</p>
        </v-card-text>
      </v-card>
    </div>

  </v-dialog>
</template>
  
<script>
import { mapGetters } from "vuex";
// import CryptoJS from "crypto-js";
import api from "@/api";
import { isConnected, getPublicKey } from "@lobstrco/signer-extension-api";

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
    async isLobstrConnected(){
        if (await isConnected()) {
         alert(this.retrievePublicKey());
        }else{
          alert("User has not LOBSTR extension installed!");
        }
        
      },
      async retrievePublicKey() {
      let publicKey = "";
      let error = "";

      try {
        publicKey = await getPublicKey();
      } catch (e) {
        error = e;
      }

      if (error) {
        return error;
      }

      return publicKey;
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
