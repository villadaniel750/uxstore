<template v-slot:activator="{ props }">

    <v-btn 
        v-if="mobileView"
        class="my-2 mr-1"
        variant="text"
        icon="mdi-circle-half-full"
        size="small">
      </v-btn>

      <v-btn 
        v-else
        class="mr-2"
        variant="text"
        icon="mdi-circle-half-full">
      </v-btn>
  </template>
<script>
import { mapGetters } from "vuex";

export default {

created() {

},
methods: {
  save() {
    this.dialog = false;
    console.log(this.dialogm1);
    localStorage.setItem('selectedLanguage', this.dialogm1);
    loadLanguage(this.dialogm1); // Carga el idioma seleccionado
  },
},
computed: {
    ...mapGetters([
      'mobileView', 
    ]),
  },
};
</script>