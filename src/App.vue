<template>
  <router-view />
</template>

<script setup>
import { useStore } from 'vuex';
import { onMounted, onBeforeUnmount } from 'vue';

let store = useStore();

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth);
  updateWindowWidth();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth);
});

function updateWindowWidth() {
  store.dispatch('updateWindowWidth');
}
</script>