<template>
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
            :lazy-src="`https://picsum.photos/10/6?image=${i * 5 + 10}`"
            :src="`https://picsum.photos/500/300?image=${i * 5 + 10}`"
            height="200"
            aspect-ratio="16/9"
            cover
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
  </template>