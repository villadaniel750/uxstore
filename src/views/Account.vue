<template>
  <v-container>
    <v-card>
      <v-card-title class="text-h5">Account</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row align="center" justify="center">
          <v-avatar size="80">
            <v-img src="https://randomuser.me/api/portraits/women/90.jpg" alt="User Avatar"></v-img>
          </v-avatar>
        </v-row>
        <v-row justify="center" class="mt-4">
          <v-col cols="12" md="6">
            <v-text-field label="Username" v-model="user.username" readonly></v-text-field>
            <v-text-field label="Email" v-model="user.email" readonly></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="editProfile">Edit Profile</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "@satoshi",
        email: "sat@gmx.com",
      },
    };
  },
  methods: {
    editProfile() {
      console.log("Edit profile clicked");
    },
  },
};
</script>
