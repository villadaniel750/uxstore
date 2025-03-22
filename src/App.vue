<template>
  <router-view />

   <!-- Dialogo de error de login estilo Vuetify moderno -->
   <v-dialog
      v-model="loginErrorDialog"
      max-width="400"
      persistent
    >
      <v-card
        :title="$t('Common.loginErrorTitle')"
        prepend-icon="mdi-alert-circle"
      >
        <v-card-text>
          {{ $t('Common.loginErrorDescription') }}
          <div v-if="loginErrorMessage" class="text-caption font-weight-thin mt-2">
            {{ loginErrorMessage }}
          </div>
        </v-card-text>
        
        <template v-slot:actions>
          <v-spacer />
          <v-btn color="primary" @click="closeLoginErrorDialog">
            {{ $t('Common.accept') }}
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
</template>

<script setup>
import { useStore } from 'vuex';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useTheme } from 'vuetify';


let store = useStore();
const theme = useTheme();

const loginErrorDialog = ref(false);
const loginErrorMessage = ref("");

function closeLoginErrorDialog() {
  loginErrorDialog.value = false;
  localStorage.removeItem("loginError");
}

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

  // Verificamos si hay un loginError
  const error = localStorage.getItem("loginError");
  if (error) {
    loginErrorMessage.value = decodeURIComponent(error);
    loginErrorDialog.value = true;
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth);
});

function updateWindowWidth() {
  store.dispatch('updateWindowWidth');
}
</script>