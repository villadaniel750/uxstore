<template>
    <v-btn @click="getFreighterPublicKey" block rel="noopener noreferrer" variant="tonal" style="border-color: #6969F2; color: #6969F2;" class="text-capitalize mt-3" size="large">
        <img src="@/assets/freighter.svg" alt="Twitter" style="height: 24px; width: 24px; margin-right: 8px;"/>
        Freighter
    </v-btn>
</template>

<script>
import {
  isConnected,
  requestAccess,
} from "@stellar/freighter-api";

export default {
  methods: {
    async getFreighterPublicKey() {
      try {
        // Check if Freighter is installed and connected
        if (!(await isConnected())) {
          alert('Please install Freighter to continue.');
          return;
        }

        // Request access and get public key
        const publicKey = await requestAccess();
        if (!publicKey) {
          alert('Access denied or no public key available.');
          return;
        }
        
        // Store the public key in Vuex store
        this.$store.commit('setFreighterPublicKey', publicKey);
        
        // Debug: Check if the store was updated
        console.log("Stored Freighter public key:", publicKey);
        
        // Emit close dialog event
        this.$emit('close-dialog');
      } catch (error) {
        console.error("Error retrieving the public key from Freighter:", error);
        alert("Error retrieving the public key from Freighter.");
      }
    }
  }
};
</script>