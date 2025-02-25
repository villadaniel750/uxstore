<template>
    <v-btn @click="getLobstrPublicKey" block rel="noopener noreferrer" variant="tonal"
        style="border-color: #4fa2bc; color: #4fa2bc;" class="text-capitalize mt-3" size="large">
        <img src="@/assets/lobstr.svg" alt="Lobstr" style="height: 24px; width: 24px; margin-right: 8px;" />
        LOBSTR
    </v-btn>
  </template>
  
  <script>
  import { isConnected, getPublicKey } from "@lobstrco/signer-extension-api";
  
  export default {
    methods: {
        async getLobstrPublicKey() {
            try {
                // Check if the user has LOBSTR installed and active
                const connected = await isConnected();
                if (!connected) {
                    alert("LOBSTR is not installed or enabled.");
                    return;
                }
  
                // Get the user's public key
                const publicKey = await getPublicKey();
                if (!publicKey) {
                    alert("Could not retrieve the public key from LOBSTR.");
                    return;
                }
  
                // Display the public key in an alert
                alert(`Your LOBSTR public address is:\n${publicKey}`);
  
            } catch (error) {
                console.error("Error retrieving the public key from LOBSTR:", error);
                alert("Error retrieving the public key from LOBSTR.");
            }
        }
    }
  };
  </script>
  
  