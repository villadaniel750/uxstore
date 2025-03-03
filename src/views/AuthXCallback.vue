<template>
    <div></div> <!-- 🔹 No mostramos nada al usuario -->
  </template>
  
  <script>
  export default {
    async mounted() {
      const urlParams = new URLSearchParams(window.location.search);
      try{
        const code = urlParams.get("code");
        console.log("authorization_code="+code)
      }catch (error) {
          console.error("Error en el login con X:", error);
          window.location.href = "/login"; // 🔹 Redirigir en caso de fallo
        }
      

      

      if (code) {
        // El usuario autorizó la aplicación en X.com
        console.log("Usuario autorizado, código:", code);
        // Aquí se podría proceder a enviar el authorization code al backend para continuar con el flujo
      } else if (error) {
        // El usuario canceló la autorización o se produjo un error
        console.log("Autorización cancelada o error:", error);
        // Aquí se podría notificar al usuario o redirigir a una ruta de error
      } else {
        // En caso de que no se encuentren parámetros esperados
        console.log("No se encontraron parámetros de autorización.");
      }

  
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
  