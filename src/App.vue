<template>
  <router-view />
</template>

<script setup>
import { useStore } from 'vuex';
import { onMounted, onBeforeUnmount } from 'vue';
import { useTheme } from 'vuetify';

let store = useStore();
const theme = useTheme();

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth);
  updateWindowWidth();
  
  const isDarkThemeString = localStorage.getItem('isDarkTheme'); 
  if (isDarkThemeString !== null) {
    const isDarkTheme = isDarkThemeString === 'true';
    if(isDarkTheme){
      store.commit("setDarkThemeTrue");
      theme.global.name.value = 'dark';
    }else{
      store.commit("setDarkThemeFalse");
      theme.global.name.value = 'light';
    }
}
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth);
});

function updateWindowWidth() {
  store.dispatch('updateWindowWidth');
}
</script>