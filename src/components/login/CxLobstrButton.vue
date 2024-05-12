<template>
    <v-btn @click="isLobstrConnected" block rel="noopener noreferrer" variant="tonal"
        style="border-color: #4fa2bc; color: #4fa2bc;" class="text-capitalize mt-3" size="large">
        <img src="@/assets/lobstr.svg" alt="Twitter" style="height: 24px; width: 24px; margin-right: 8px;" />
        LOBSTR
    </v-btn>
</template>

<script>
import { isConnected, getPublicKey } from "@lobstrco/signer-extension-api";
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
    },
};

</script>