<template>
    <v-btn @click="userSignTransaction" block  rel="noopener noreferrer"  variant="tonal" style="border-color: #B8BAC4; color: #B8BAC4;" class="text-capitalize mt-3" size="large">
        <img src="@/assets/rabet.svg" alt="Twitter" style="height: 24px; width: 24px; margin-right: 8px;"/>
        Rabet
    </v-btn>
</template>

<script>
export default {
    methods: {
        async userSignTransaction() {
            try {
                // Conectar con Rabet antes de intentar firmar la transacción
                // const connectResult = await rabet.connect();
                // console.log(`User active public key is: ${connectResult.publicKey}`);

                // XDR y red a usar
                const xdr = 'AAAAAgAAAADboxFlQYKamAS7J42c9q5CcVrKmbbaR9qK2o2fxscTWQAAASwC/wbaAAAAAwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAQAAAACJFbikN9vQTXgRzv25svTR+/QFGccSvjzCzOiS5w6Z0gAAAAAAAAAAAbFtCAAAAAAAAAABAAAAABJOYvnN6JH0pP7nqFKBT8txu2NkuODt1PpSKioUBKKyAAAAAAAAAAAAEj/gAAAAAAAAAAEAAAAAKkXKryeNDqGzWdQvFQE3+iznroti+JT74HZd9152HaMAAAAAAAAAAAAEj/gAAAAAAAAAAA==';
                const network = 'public'; // mainnet o testnet

                // Firmar la transacción con Rabet
                const signResult = await rabet.sign(xdr, network);
                console.log("Transacción firmada correctamente:", signResult.xdr);
                alert('Transacción firmada exitosamente!');
                return signResult.xdr;
            } catch (error) {
                // Manejar errores que puedan surgir durante la conexión o la firma
                console.error("Error al firmar la transacción con Rabet:", error);
                alert('Fallo al firmar la transacción.');
                return error.toString();
            }
        }
    }
};
</script>