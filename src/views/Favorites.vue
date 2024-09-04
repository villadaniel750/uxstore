<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(image, index) in images"
        :key="index"
        cols="12"      
        sm="6"         
        md="4"        
        lg="3"        
        xl="2"     
      >
        <v-img :src="image" alt="Image" class="mb-3" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://via.placeholder.com/1920x1080',
        'https://via.placeholder.com/1920x1080',
        'https://via.placeholder.com/1920x1080',
        'https://via.placeholder.com/1920x1080',
        'https://via.placeholder.com/1920x1080',
        'https://via.placeholder.com/1920x1080',
      ],
    };
  },
};
</script>

<style scoped>
.mb-3 {
  margin-bottom: 1.5rem;
}
</style>