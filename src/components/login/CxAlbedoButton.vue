<template>
    <v-btn disabled @click="signTransaction" block rel="noopener noreferrer" variant="tonal"
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
        async signTransaction() {
      const xdr = 'AAAAAgAAAADboxFlQYKamAS7J42c9q5CcVrKmbbaR9qK2o2fxscTWQAAASwC/wbaAAAAAwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAQAAAACan9nPi8kIoBthZJEXJeKYZtXPR+0bDDsyP5SZsnB3IwAAAAAAAAAAAbFtCAAAAAAAAAABAAAAADygGATwVjGKjeMn7gsE1ZU7pWJ/WQPsELtdVpv+npsrAAAAAAAAAAAAEj/gAAAAAAAAAAEAAAAAW/L+cozyghajU1wLrhLznN2eCZI5CB6admax9Dh9FioAAAAAAAAAAAAEj/gAAAAAAAAAAA=='; // Aquí iría el XDR real proporcionado por tu servidor
      //para autenticacion:
      //AAAAAgAAAADnvkGByLO/qCM4AyawrIQ0GBHfZLX0V9bUK5H3ecHEDQAAAGQDAJJ9AAAAAQAAAAEAAAAAAAAAAAAAAABmRj6iAAAAAAAAAAEAAAAAAAAACgAAAA5BdXRoZW50aWNhdGlvbgAAAAAAAQAAAAR0ZXN0AAAAAAAAAAA=
      try {
        const result = await albedo.tx({
          xdr: xdr,
          network: 'public', // O 'public' dependiendo de la red que estés usando
          submit: false // Asegúrate de no enviar la transacción a la red Stellar
        });

        if (result.signed_envelope_xdr) {
          console.log("Transacción firmada correctamente:", result.signed_envelope_xdr);
          alert('Transacción firmada exitosamente!');
        } else {
          throw new Error("Error al firmar la transacción.");
        }
      } catch (error) {
        console.error("Error al usar Albedo para firmar:", error);
        alert('Fallo al firmar la transacción.');
      }
    }
    },
};
</script>