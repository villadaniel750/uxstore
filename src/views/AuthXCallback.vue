<template>
  <div></div> <!-- No mostramos nada al usuario -->
</template>

<script>
import api from "@/api";
export default {
  methods: {
    // Método que redirige a la URL guardada en 'pre-login-url'
    redirectToPreLoginUrl() {
      const preLoginUrl = localStorage.getItem("pre-login-url");
      localStorage.removeItem("pre-login-url");
      if (preLoginUrl) {
        window.location.href = preLoginUrl;
      } else {
        window.location.href = "/";
      }
    },
  },
  async mounted() {
    let code = null;
    let error = null;

    try {
      const urlParams = new URLSearchParams(window.location.search);
      code = urlParams.get("code");
      error = urlParams.get("error");
      const returnedState = urlParams.get("state");
      console.log("authorization_code=", code);

      // Recuperamos el state y el code_verifier almacenados
      const storedState = localStorage.getItem("oauth_state");
      const codeVerifier = localStorage.getItem("code_verifier");

      // Validamos el state para prevenir ataques CSRF
      if (returnedState !== storedState) {
        console.error("State mismatch: posible ataque CSRF.");
        this.redirectToPreLoginUrl();
        return;
      }

      // Limpiamos el localStorage eliminando state y code_verifier una vez usados
      localStorage.removeItem("oauth_state");
      localStorage.removeItem("code_verifier");

      if (code) {
        // El usuario autorizó la aplicación en X.com
        console.log("Usuario autorizado, código:", code);
        try {
          // Enviar el authorization code y el code_verifier al backend
          const response = await api.processXLogin(code, codeVerifier);
          console.log("Respuesta del backend:", response.data);
          this.redirectToPreLoginUrl();
          // Aquí podrías manejar la respuesta, guardar tokens, etc.
        } catch (err) {
          console.error("Error al procesar el login con X en el backend:", err);
          this.redirectToPreLoginUrl();
        }
      } else if (error) {
        // El usuario canceló o se produjo un error
        console.log("Autorización cancelada o error:", error);
        // Aquí podrías redirigir a un mensaje de error con Vuex en caso de no autorizar
        this.redirectToPreLoginUrl();
      } else {
        // En caso de que no se encuentren parámetros esperados
        console.log("No se encontraron parámetros de autorización.");
        this.redirectToPreLoginUrl();
      }
    } catch (err) {
      console.error("Error en el callback de X:", err);
      this.redirectToPreLoginUrl();
    }
  },
};
</script>

  