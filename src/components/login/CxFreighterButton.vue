<template>
    <v-btn @click="userSignTransaction" block  rel="noopener noreferrer"  variant="tonal" style="border-color: #6969F2; color: #6969F2;" class="text-capitalize mt-3" size="large">
        <img src="@/assets/freighter.svg" alt="Twitter" style="height: 24px; width: 24px; margin-right: 8px;"/>
        Freighter
    </v-btn>
</template>

<script>
import {
  isConnected,
  requestAccess,
  signTransaction,
} from "@stellar/freighter-api";

export default {
  methods: {
    async userSignTransaction() {
      try {
        // Verificar si Freighter está instalado y conectado
        if (!(await isConnected())) {
          alert('Please install Freighter to continue.');
          return;
        }

        // Solicitar acceso y obtener la clave pública
        const publicKey = await requestAccess();
        if (!publicKey) {
          alert('Access denied or no public key available.');
          return;
        }
        console.log(`Public key retrieved: ${publicKey}`);

        // Define el XDR y la red para la firma
        const xdr = 'AAAAAgAAAADnvkGByLO/qCM4AyawrIQ0GBHfZLX0V9bUK5H3ecHEDQAAASwDAJJ9AAAAAQAAAAEAAAAAAAAAAAAAAABmRj6iAAAAAAAAAAMAAAAAAAAAAQAAAACmQ0PRQfDqCF+MwIvEy0b05EKgFOdwyF0jWdk4x9C1RAAAAAAAAAAAATEtAAAAAAAAAAABAAAAANEvKvuHZgdIigty5V8bfMwb7IM8+ZTWB8Hd4wlgOPGUAAAAAAAAAAAAHoSAAAAAAAAAAAEAAAAAN1Qc2mRF4pXo2chTYhR++jHryVmGNKHeboaMVNup1L0AAAAAAAAAAAL68IAAAAAAAAAAAA==';
        const opts = {
          network: 'public', // 'public' o 'testnet'
          networkPassphrase: 'Public Global Stellar Network ; September 2015', // Omitir si no es necesario
          accountToSign: publicKey // Especificar si se necesita firmar con una cuenta específica
        };
        const signedXdr = await signTransaction(xdr, opts);
        console.log("Transaction signed successfully:", signedXdr);
        alert('Transaction signed successfully!');
        return signedXdr;
      } catch (error) {
        console.error("Error signing transaction with Freighter:", error);
        alert('Failed to sign the transaction.');
        return error.toString();
      }
    }
  }
};
</script>