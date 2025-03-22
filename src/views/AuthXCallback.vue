<template>
  <div></div> <!-- No mostramos nada al usuario -->
</template>

<script>
import api from "@/api";
export default {
  methods: {
    // Método que redirige a la URL guardada en 'preLoginUrl'
    redirectToPreLoginUrl() {
      const preLoginUrl = localStorage.getItem("preLoginUrl");
      localStorage.removeItem("preLoginUrl");
      if (preLoginUrl) {
        window.location.href = preLoginUrl;
      } else {
        window.location.href = "/";
      }
    },
  },
  async mounted() {
    const query = new URLSearchParams(window.location.search);
    const error = query.get("error");
    const token = query.get("token");

    if (error) {
      console.warn("Login fallido:", error);
      // Acá podrías guardar en Vuex o mostrar un diálogo en la ruta anterior
      localStorage.setItem("loginError", error);
      this.redirectToPreLoginUrl();
      return;
    }

    if (token) {
      this.$store.commit("setAccessToken", token);
      this.redirectToPreLoginUrl();
      return;
    }

    // Caso inesperado: sin token ni error
    console.warn("Callback recibido sin token ni error.");
    this.redirectToPreLoginUrl();
  },
};
</script>

  