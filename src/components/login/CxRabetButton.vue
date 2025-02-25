<template>
    <v-btn disabled @click="userSignTransaction" block  rel="noopener noreferrer"  variant="tonal" :color="isDarkTheme ? '#B8BAC4' : '#8A8C99'"  class="text-capitalize mt-3" size="large">
        <img src="@/assets/rabet.svg" alt="Twitter" style="height: 24px; width: 24px; margin-right: 8px;"/>
        Rabet
    </v-btn>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    methods: {
        async userSignTransaction() {
            try {
                // Conectar con Rabet antes de intentar firmar la transacción
                const connectResult = await rabet.connect();
                console.log(`User active public key is: ${connectResult.publicKey}`);

                // XDR y red a usar
                const xdr = 'AAAAAgAAAADboxFlQYKamAS7J42c9q5CcVrKmbbaR9qK2o2fxscTWQAAASwC/wbaAAAAAwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAQAAAACan9nPi8kIoBthZJEXJeKYZtXPR+0bDDsyP5SZsnB3IwAAAAAAAAAAAbFtCAAAAAAAAAABAAAAADygGATwVjGKjeMn7gsE1ZU7pWJ/WQPsELtdVpv+npsrAAAAAAAAAAAAEj/gAAAAAAAAAAEAAAAAW/L+cozyghajU1wLrhLznN2eCZI5CB6admax9Dh9FioAAAAAAAAAAAAEj/gAAAAAAAAAAA==';
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
    },
    computed: {
      ...mapGetters([
        'isDarkTheme'
      ]),
    },
};
</script>