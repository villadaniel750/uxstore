<template v-slot:activator="{ props }">

    <v-btn 
        v-if="mobileView"
        @click="toggleTheme"
        class="my-2 mr-1"
        variant="text"
        icon="mdi-circle-half-full"
        size="small">
      </v-btn>

      <v-btn 
        v-else
        @click="toggleTheme"
        class="mr-2"
        variant="text"
        icon="mdi-circle-half-full">
      </v-btn>
  </template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useTheme } from 'vuetify';

export default {
  setup() {
    const store = useStore();
    const theme = useTheme();

    function toggleTheme() {
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';

      const isDarkTheme = theme.global.current.value.dark;
      localStorage.setItem('isDarkTheme', isDarkTheme.toString());
      
      if (isDarkTheme) {
        store.commit('setDarkThemeTrue');
      } else {
        store.commit('setDarkThemeFalse');
      }
      
    }

    const mobileView = computed(() => store.getters.mobileView);

    return {
      toggleTheme,
      mobileView
    };
  }
};
</script>