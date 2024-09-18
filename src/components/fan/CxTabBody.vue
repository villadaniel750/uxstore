<template>
    <v-card flat>
      <v-tabs
        v-model="tab"
        align-tabs="center"
        color="orange-accent-2"
      >
        <v-tab :value="1">Entries</v-tab>
        <v-tab :value="2">Posts</v-tab>
      </v-tabs>
  
      <v-tabs-window v-model="tab">
        <v-tabs-window-item
          v-for="n in 3"
          :key="n"
          :value="n"
        >
          <v-container fluid>
            <v-row>
              <v-col
                v-for="i in 18"
                :key="i"
                cols="12"
                sm="6"
                md="4"
                lg="3"
                xl="2"
              >
                <v-img
                  :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                  :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                  height="200"
                  aspect-ratio="16/9"
                  cover
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </template>
  <script>
    export default {
      data: () => ({
        tab: null,
      }),
    }
  </script>