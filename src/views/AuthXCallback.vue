<template>
  <div></div> <!-- No mostramos nada al usuario -->
</template>

<script>
import api from "@/api";

export default {
  methods: {
    redirectToPreLoginUrl() {
      console.log("Redirigiendo a la URL previa al login");
      const preLoginUrl = localStorage.getItem("preLoginUrl");
      localStorage.removeItem("preLoginUrl");

      if (preLoginUrl) {
        console.log("Redirigiendo a:", preLoginUrl);
        this.$router.push(preLoginUrl);
      } else {
        console.log("Redirigiendo a la página principal");
        this.$router.push("/");
      }
    },
  },
  async mounted() {
    const query = new URLSearchParams(window.location.search);
    const error = query.get("error");
    const token = query.get("UUID");

    if (error) {
      console.warn("Login fallido:", error);
      this.$store.commit("setLoginError", error);
      this.redirectToPreLoginUrl();
      return; // 👈 Evita redirecciones múltiples
    }


    if (token) {
      try {
        const res = await api.createSession(token);
        // Guardar el token en webworker directamente en createSession
        const accessToken = res.data.accessToken;
        

        // Decodificar el JWT (solo payload, sin validar)
        const payloadBase64 = accessToken.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));

        const username = decodedPayload.username;
        const profileImageUrl = decodedPayload.profile_image_url;
        const followersCount = decodedPayload.followers_count;

        localStorage.setItem("username", username);
        localStorage.setItem("profile_image_url", profileImageUrl);
        localStorage.setItem("followers_count", followersCount);
        localStorage.setItem("loggedIn", "true");
      } catch (err) {
        console.error("Error al crear sesión:", err);
        localStorage.setItem("Session-Error", "No se pudo crear sesión");
      } finally {
        this.redirectToPreLoginUrl();
        return; // 👈 Evita que siga ejecutando el bloque final
      }
    }

    // Solo se ejecuta si no hay ni token ni error
    console.warn("Callback recibido sin token ni error.");
    this.redirectToPreLoginUrl();
  },
};
</script>
