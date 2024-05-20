<template>
    <v-btn @click="userSignTransaction" block rel="noopener noreferrer" variant="tonal"
        style="border-color: #4fa2bc; color: #4fa2bc;" class="text-capitalize mt-3" size="large">
        <img src="@/assets/lobstr.svg" alt="Twitter" style="height: 24px; width: 24px; margin-right: 8px;" />
        LOBSTR
    </v-btn>
</template>

<script>
import { isConnected, getPublicKey, signTransaction } from "@lobstrco/signer-extension-api";
export default {
    methods: {
        async isLobstrConnected(){
        if (await isConnected()) {
         this.retrievePublicKey();
        }else{
          alert("User has not LOBSTR extension installed!");
        }
        
      },
      async retrievePublicKey() {
      let publicKey = "";
      let error = "";

      try {
        publicKey = await getPublicKey();
        alert(publicKey);
      } catch (e) {
        error = e;
        console.log(e);
      }

      if (error) {
        return error;
      }

      return publicKey;
    },
    async userSignTransaction() {
  try {
    // Intentar firmar la transacción con la extensión LOBSTR
    const signedXdr = await signTransaction("AAAAAgAAAADboxFlQYKamAS7J42c9q5CcVrKmbbaR9qK2o2fxscTWQAAASwC/wbaAAAAAwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAQAAAACJFbikN9vQTXgRzv25svTR+/QFGccSvjzCzOiS5w6Z0gAAAAAAAAAAAbFtCAAAAAAAAAABAAAAABJOYvnN6JH0pP7nqFKBT8txu2NkuODt1PpSKioUBKKyAAAAAAAAAAAAEj/gAAAAAAAAAAEAAAAAKkXKryeNDqGzWdQvFQE3+iznroti+JT74HZd9152HaMAAAAAAAAAAAAEj/gAAAAAAAAAAA==");
    console.log("Transacción firmada correctamente:", signedXdr);
    alert('Transacción firmada exitosamente!');
    return signedXdr;
  } catch (error) {
    // Manejar errores que puedan surgir durante la firma
    console.error("Error al firmar la transacción con LOBSTR:", error);
    alert('Fallo al firmar la transacción.');
    return error.toString();
  }
}


    },
};

</script>