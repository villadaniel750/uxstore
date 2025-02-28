<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" location="bottom">
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
            subtitle="@satoshi"
          >
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>


          <v-list-item>
            <v-switch
              v-model="darkMode"
              color="amber-lighten-1"
              label="Dark Mode"
              hide-details
              @change="toggleTheme"
            ></v-switch>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="text" @click="logout">
            {{ $t("Common.logout") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useTheme } from "vuetify";
import CxLanguageDialog from "@/components/CxLanguageDialog";

export default {
  components: {
    CxLanguageDialog,
  },
  setup() {
    const store = useStore();
    const theme = useTheme();
    const menu = ref(false);
    const darkMode = ref(false);

    function toggleTheme() {
      const newTheme = darkMode.value ? "dark" : "light";
      theme.global.name.value = newTheme;

      localStorage.setItem("isDarkTheme", darkMode.value.toString());

      if (darkMode.value) {
        store.commit("setDarkThemeTrue");
      } else {
        store.commit("setDarkThemeFalse");
      }
    }

    onMounted(() => {
      const storedTheme = localStorage.getItem("isDarkTheme");
      const isDark = storedTheme ? storedTheme === "true" : theme.global.current.value.dark;

      darkMode.value = isDark;
      theme.global.name.value = isDark ? "dark" : "light";
    });

    watch(
      () => theme.global.current.value.dark,
      (newValue) => {
        darkMode.value = newValue;
      }
    );

    function logout() {
      store.commit("setLoggedInFalse");
      window.location.reload();
    }

    return {
      menu,
      darkMode,
      toggleTheme,
      logout,
    };
  },
};
</script>
