<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col key="0" cols="12" sm="12" md="12" lg="5" xl="5">
        <label for="images1" class="drop-container d-flex flex-column align-center justify-center cursor-pointer darken-1 rounded-10 pa-4 rounded-lg" id="dropcontainer" style="height: 280px;">
          <img src="/src/assets/file-upload.svg" alt="Twitter" class="mt-3" style="height: 70px; width: 70px;" />
          <span class="text-h6 drop-title mb-6">Drag and drop files here</span>
          <input type="file" class="d-none" id="images1" accept="image/*" required>
        </label>
        <v-btn class="mt-3 w-100">
          Upload
        </v-btn>
      </v-col>
      <v-col key="1" cols="12" sm="12" md="12" lg="5" xl="5">
        <v-text-field label="Title" v-model="videoTitle" outlined></v-text-field>
        <v-text-field label="Category Tags" v-model="categoryTags" outlined></v-text-field>
        <div class="d-flex ga-4 align-center">
          <label for="images2" class="drop-container d-flex flex-column align-center justify-center cursor-pointer darken-1 rounded-10 pa-2 rounded-lg" id="dropcontainer">
            <span class="text-subtitle-1 drop-title">Thumbnail</span>
            <input type="file" class="d-none" id="images2" accept="image/*" required>
          </label>
          <v-btn class="">
            Upload
          </v-btn>
        </div>
        <v-radio-group class="mt-1" v-model="videoType">
          <v-radio label="Free Video" value="free"></v-radio>
          <v-radio label="Paid Video" value="paid"></v-radio>
        </v-radio-group>
        <v-text-field label="Price" v-if="videoType === 'paid'" v-model="price" outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col key="0" cols="12" sm="12" md="12" lg="4" xl="4">
        <v-checkbox v-model="agreeTerms" label="I agree to the terms and conditions"></v-checkbox>
        <div class="d-flex">
          <v-btn class="me-4" @click="preview">Preview</v-btn>
          <v-btn class="me-4" @click="saveAsDraft">Save as Draft</v-btn>
          <v-btn @click="publish">Publish</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.drop-container {
  transition: background .2s ease-in-out, border .2s ease-in-out;
  border: 1px dashed #555;
}

.drop-container:hover {
  background: #eee;
  border-color: #111;
}

.drop-container:hover .drop-title {
  color: #222;
}
</style>

<script>

export default {
  data() {
    return {
      videoTitle: '',
      categoryTags: '',
      videoType: 'free', // default to free
      price: '',
      agreeTerms: false,
    };
  },
  methods: {
    preview() {
      // Logic for previewing the video
    },
    saveAsDraft() {
      // Logic for saving as draft
    },
    publish() {
      // Logic for publishing the video
    }
  }
};
</script>
