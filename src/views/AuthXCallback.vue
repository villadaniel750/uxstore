<template>
    <div></div> <!-- 🔹 No mostramos nada al usuario -->
  </template>
  
  <script>
  export default {
    async mounted() {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      //borrar este bloque
      console.log("code="+code);
      localStorage.setItem("code", code);
      //borrar este bloque
  
      if (code) {
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
      }
    },
  };
  </script>
  