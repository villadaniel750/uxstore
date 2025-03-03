<template>
    <div></div> <!-- 🔹 No mostramos nada al usuario -->
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
        console.log("authorization_code=", code);
      } catch (err) {
        console.error("Error en el login con X:", err);
        // Redirigir en caso de fallo
        this.redirectToPreLoginUrl();
        return;
      }

      if (code) {
        // El usuario autorizó la aplicación en X.com
        console.log("Usuario autorizado, código:", code);
        try {
          // Enviar el authorization code al backend
          const response = await api.processXLogin(code);
          console.log("Respuesta del backend:", response.data);
          this.redirectToPreLoginUrl();
          // Aquí podrías manejar la respuesta, guardar tokens, etc.
        } catch (err) {
          console.error("Error al procesar el login con X en el backend:", err);
          this.redirectToPreLoginUrl();
        }
        // Aquí podrías enviar el authorization code al backend
      } else if (error) {
        // El usuario canceló o se produjo un error
        console.log("Autorización cancelada o error:", error);
        // Aquí podrías redirigir a un mensaje de error con Vuex en caso de no autorizar da error = access_denied, ver que mas puede venir en la API de X
        this.redirectToPreLoginUrl();
      } else {
        // En caso de que no se encuentren parámetros esperados
        console.log("No se encontraron parámetros de autorización.");
        this.redirectToPreLoginUrl();
      }




      /* if (code) {
        try {
          // 🔹 Enviar el código al backend para obtener el access_token
          const response = await fetch("https://api.earnlumens.org/auth/x/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
          });
  
          const data = await response.json();
          if (data.access_token) {
            // 🔹 Obtener la información del usuario
            const userResponse = await fetch("https://api.earnlumens.org/auth/x/user", {
              method: "GET",
              headers: { "Authorization": `Bearer ${data.access_token}` }
            });
  
            const userData = await userResponse.json();
  
            if (userData.id) {
              localStorage.setItem("jwt_token", data.access_token); // 🔹 Guardar sesión
              localStorage.setItem("user_data", JSON.stringify(userData)); // 🔹 Guardar datos del usuario
              window.location.href = "/"; // 🔹 Redirigir al home ya logueado
            } else {
              window.location.href = "/login"; // 🔹 En caso de error, volver al login
            }
          } else {
            window.location.href = "/login"; // 🔹 En caso de error, volver al login
          }
        } catch (error) {
          console.error("Error en el login con X:", error);
          window.location.href = "/login"; // 🔹 Redirigir en caso de fallo
        }
      } else {
        window.location.href = "/login"; // 🔹 Si no hay code, volver al login
      } */





    },
  };
  </script>
  