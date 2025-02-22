<template>
  <v-btn @click="loginWithLobstr" block rel="noopener noreferrer" variant="tonal"
      style="border-color: #4fa2bc; color: #4fa2bc;" class="text-capitalize mt-3" size="large">
      <img src="@/assets/lobstr.svg" alt="Lobstr" style="height: 24px; width: 24px; margin-right: 8px;" />
      LOBSTR
  </v-btn>
</template>

<script>
import { isConnected, getPublicKey, signTransaction } from "@lobstrco/signer-extension-api";
import api from "@/api";

export default {
  methods: {
      async loginWithLobstr() {
          try {
              // Verificar si el usuario tiene LOBSTR instalado y activo
              const connected = await isConnected();
              if (!connected) {
                  alert("LOBSTR no está instalado o habilitado.");
                  return;
              }

              // Obtener la clave pública del usuario
              const publicKey = await getPublicKey();
              if (!publicKey) {
                  alert("No se pudo obtener la clave pública de LOBSTR.");
                  return;
              }

              console.log("Clave pública obtenida:", publicKey);

              // Obtener el desafío SEP-10 desde el backend
              const challengeXdr = await api.requestSep10Challenge(publicKey);
              console.log("Desafío recibido:", challengeXdr);

              // Firmar la transacción con LOBSTR
              const signedXdr = await signTransaction(challengeXdr);
              console.log("Transacción firmada:", signedXdr);

              // Enviar la transacción firmada al backend para validación
              const authResponse = await api.submitSignedTransaction(signedXdr);
              console.log("Autenticación exitosa, token recibido:", authResponse.token);

              // Guardar sesión si todo es exitoso
              api.setUserLogged(authResponse.token);
              alert("Autenticado correctamente con LOBSTR");

          } catch (error) {
              console.error("Error durante la autenticación con LOBSTR:", error);
              alert("Error en la autenticación con LOBSTR.");
          }
      }
  }
};
</script>
