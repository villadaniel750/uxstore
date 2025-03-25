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
      try {
        const res = await api.createSession(token);
        const accessToken = res.data.accessToken;
        this.$store.commit("setAccessToken", accessToken);

        // Decodificar el JWT sin validarlo (solo lectura del payload)
        const payloadBase64 = accessToken.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));

        const username = decodedPayload.username;
        const profileImageUrl = decodedPayload.profile_image_url;

        localStorage.setItem("username", username);
        localStorage.setItem("profile_image_url", profileImageUrl);
        localStorage.setItem("loggedIn", "true");
      } catch (err) {
        console.error("Error al crear sesión:", err);
        localStorage.setItem("Session-Error", "No se pudo crear sesión");
      } finally {
        this.redirectToPreLoginUrl();
      }
    }




    // Caso inesperado: sin token ni error
    console.warn("Callback recibido sin token ni error.");
    this.redirectToPreLoginUrl();
  },
};
</script>

  