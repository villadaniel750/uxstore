<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col key="0" cols="12" sm="12" md="12" lg="5" xl="5">
        <label for="images" class="drop-container d-flex flex-column align-center justify-center cursor-pointer darken-1 rounded-10 pa-4 rounded-lg" id="dropcontainer" style="height: 280px;">
          <img src="/src/assets/file-upload.svg" alt="Twitter" class="mt-3" style="height: 70px; width: 70px;" />
          <span class="text-h6 drop-title mb-6">Drag and drop files here</span>
          <input type="file" class="d-none" id="images" accept="image/*" required>
        </label>
        <v-file-upload density="comfortable" variant="comfortable" title="Select Video"
          accept="video/*"></v-file-upload>
        <v-btn class="mt-3 w-100">
          Upload
        </v-btn>
      </v-col>
      <v-col key="1" cols="12" sm="12" md="12" lg="5" xl="5">
        <v-text-field label="Title" v-model="videoTitle" outlined></v-text-field>
        <v-text-field label="Category Tags" v-model="categoryTags" outlined></v-text-field>
        <v-file-upload density="comfortable" variant="comfortable" title="Thumbnail" accept="image/*"></v-file-upload>
        <v-radio-group v-model="videoType">
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
      images: Array.from({ length: 18 }, (_, i) => {
        const index = i + 1;
        return {
          lazySrc: `https://picsum.photos/10/4?image=${index * 5 + 10}`,
          src: `https://picsum.photos/500/300?image=${index * 5 + 10}`
        };
      }),
      loading: Array(18).fill(false)
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
