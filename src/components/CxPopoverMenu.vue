<template>
    <div class="text-center">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        location="bottom"
      >
        <template v-slot:activator="{ props }">
          <v-list-item
          :ripple="false"
            v-bind="props"
            nav
            class="ma-1"
            prepend-avatar="https://randomuser.me/api/portraits/women/90.jpg"
          ></v-list-item>
        </template>

        <v-card min-width="300">
          <v-list>
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/women/90.jpg"
              title="sat@gmx.com"
              subtitle="@sat"
            >
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item>
              <cx-language-dialog></cx-language-dialog>
            </v-list-item>

            <v-list-item>
              <v-switch
                v-model="darkMode"
                color="amber-lighten-1"
                label="Dark Mode"
                hide-details
              ></v-switch>
            </v-list-item>

            
          </v-list>

          <v-card-actions>
            <v-spacer></v-spacer>

            
            <v-btn
              color="primary"
              variant="text"
              @click="logout"
            >
            {{ $t("Common.logout") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </div>
</template>


<script>
import { mapState } from "vuex";
import CxLanguageDialog from "@/components/CxLanguageDialog";
export default {
  data: () => ({
    menu: false,
    darkMode: true,
  }),
  components: {
    CxLanguageDialog,
  },
  methods: {
    logout() {
      this.$store.commit("setLoggedInFalse");
      window.location.reload();
    },
  },
  computed: {
    ...mapState([ "loggedIn"]),
  },
};//ss
</script>
