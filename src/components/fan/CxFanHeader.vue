<template>
    <v-container>
        <v-img
                    class="rounded-circle"
                    :src="logoImage"
                    alt="Profile"
                    max-width="210"
                    max-height="210"
                />
        <div class="flex sm:flex-nowrap flex-wrap justify-start gap-4">
            <div class="sm:w-48 w-full flex justify-center">
                
            </div>
            
        </div>
    </v-container>
</template>
<script>
export default {
  data() {
    return {
      // Simula una URL de imagen por defecto
      logoImage: "https://picsum.photos/210/210",
    };
  },
  // En un método o ciclo de vida, podrías reemplazar logoImage con la URL desde la base de datos.
  mounted() {
    // Ejemplo: reemplazar con la URL obtenida desde la base de datos.
    // this.logoImage = "https://tu-servidor.com/imagen-desde-bd.jpg";
  },
};
</script>