<template>
    <v-card flat>
      <v-tabs
        v-model="tab"
        align-tabs="center"
        color="orange-accent-2"
      >
      <v-tab :value="1" prepend-icon="mdi-view-grid">Entries</v-tab>
      <v-tab :value="2" prepend-icon="mdi-post">Posts</v-tab>
      </v-tabs>
  
      <v-tabs-window v-model="tab">
        <v-tabs-window-item :value="1">
           <cx-entries></cx-entries>
        </v-tabs-window-item>

        <v-tabs-window-item :value="2">
          <cx-posts></cx-posts>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </template>
  <script>
  import CxEntries from "@/components/fan/CxEntries.vue";
  import CxPosts from "@/components/fan/CxPosts.vue";
    export default {
      data: () => ({
        tab: null,
      }),
    }
  </script>