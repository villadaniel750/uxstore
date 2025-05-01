<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="text-h5">
        <v-icon color="error" class="mr-2">mdi-lock</v-icon>
        Video Blocked
      </v-card-title>
      <v-card-text>
        <p class="text-body-1">
          This video is currently blocked and cannot be viewed. Please try again later or contact the content creator for more information.
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'CxBlockedDialog',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    dialog: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  }
};
</script> 