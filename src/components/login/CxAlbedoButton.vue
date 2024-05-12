<template>
    <v-btn @click="requestSignature" block rel="noopener noreferrer" variant="tonal"
        style="border-color: #0691b7; color: #0691b7;" class="text-capitalize mt-3" size="large">
        <img src="@/assets/albedo.svg" alt="Twitter" style="height: 24px; width: 24px; margin-right: 8px;" />
        Albedo
    </v-btn>
</template>

<script>
import albedo from '@albedo-link/intent'
export default {
    methods: {
        async requestSignature() {
            const messageToSign = "Allow earnlumens.com to view your wallet address, balance and request approval for transactions";  // Asegúrate de que esto es dinámico y seguro
            try {
                const response = await albedo.signMessage({
                    message: messageToSign
                });

                const { pubkey, signed_message, message_signature } = response;
                console.log(pubkey, signed_message, message_signature);

                // Enviar estos datos al servidor para la verificación
                const serverResponse = await fetch('https://tu-servidor.com/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pubkey, signed_message, message_signature })
                });

                const data = await serverResponse.json();
                console.log(data);

                // Procesar la respuesta del servidor aquí (e.g., manejar el JWT recibido)
                if (serverResponse.ok) {
                    this.handleLoginSuccess(data);
                } else {
                    this.handleLoginFailure(data);
                }
            } catch (error) {
                console.error('Error al solicitar la firma:', error);
                // Mostrar algún mensaje de error en la UI si es necesario
                this.handleError(error);
            }
        },
        handleLoginSuccess(data) {
            console.log("Login successful", data);
            // Puedes redirigir al usuario o mostrar algún mensaje de éxito
        },
        handleLoginFailure(data) {
            console.error("Login failed", data);
            // Muestra el error de inicio de sesión al usuario
        },
        handleError(error) {
            // Maneja errores generales aquí
            console.error("An error occurred", error);
        },
        async isAlbedoConnected() {
            try {
                const response = await albedo.publicKey();
                alert("Clave pública: " + response.pubkey);
            } catch (err) {
                alert("Error: " + err.error.message);
            }
        },
    },
};
</script>