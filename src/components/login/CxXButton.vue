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
  
  // Función para codificar en base64 URL-safe
  function base64UrlEncode(array) {
    let str = '';
    array.forEach(byte => {
      str += String.fromCharCode(byte);
    });
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  
  // Genera un code_verifier seguro (43-128 caracteres)
  function generateCodeVerifier() {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return base64UrlEncode(array);
  }
  
  // Calcula el code_challenge usando SHA-256 sobre el code_verifier
  async function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(digest));
    const hashStr = hashArray.map(byte => String.fromCharCode(byte)).join('');
    return btoa(hashStr).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  
  export default {
    methods: {
      async loginWithX() {
        localStorage.setItem("pre-login-url", window.location.pathname);
        const clientId = "WHdUand1aHozTlZlNXEyMEt6NF86MTpjaQ";
        const redirectUri = "https://earnlumens.org/auth/x/callback";
  
        // Genera y almacena el code_verifier
        const codeVerifier = generateCodeVerifier();
        localStorage.setItem("code_verifier", codeVerifier);
        // Calcula el code_challenge a partir del code_verifier
        const codeChallenge = await generateCodeChallenge(codeVerifier);
        const state = Math.random().toString(36).substring(2, 15); // Protección CSRF
        // Guarda el state para validarlo en el callback
        localStorage.setItem("oauth_state", state);
  
        // Construcción segura de la URL con todos los parámetros requeridos
        const params = new URLSearchParams({
          response_type: "code",
          client_id: clientId,
          redirect_uri: redirectUri,
          scope: "users.read",
          state: state,
          code_challenge: codeChallenge,
          code_challenge_method: "S256",
          prompt: "consent"
        });
  
        const authUrl = `https://twitter.com/i/oauth2/authorize?${params.toString()}`;
        window.location.href = authUrl; 
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
  