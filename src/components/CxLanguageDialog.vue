<template>
  <v-dialog v-model="dialog" scrollable width="auto">
  <template v-slot:activator="{ props }">
    <!-- <v-btn 
      v-bind="props" 
      class="my-2 mr-3" 
      variant="text" 
      append-icon="mdi-translate">
      {{ $t("Common.language") }}
    </v-btn> -->
    <v-btn 
        v-if="mobileView"
        v-bind="props"
        class="my-2 mr-1"
        variant="text"
        icon="mdi-translate"
        size="small">
      </v-btn>

      <v-btn 
        v-else
        v-bind="props"
        class="my-2"
        variant="text"
        prepend-icon="mdi-translate">
        {{ $t("Common.language") }}
        
      </v-btn>
  </template>
  <v-card>
    <v-card-title>{{ $t("Common.language") }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 300px">
      <v-radio-group v-model="dialogm1" column>
        <v-radio :label="`简体中文 (${$t('Language.simplifiedChinese')})`" value="zh-cn"></v-radio>
        <v-radio :label="`繁體中文 (${$t('Language.traditionalChinese')})`" value="zh-tw"></v-radio>
        <v-radio :label="`English (${$t('Language.english')})`" value="en"></v-radio>
        <v-radio :label="`हिंदी (${$t('Language.hindi')})`" value="hi"></v-radio>
        <v-radio :label="`عرب (${$t('Language.arabic')})`" value="ar"></v-radio>
        <v-radio :label="`Español (${$t('Language.spanish')})`" value="es"></v-radio>
        <v-radio :label="`Melayu (${$t('Language.malay')})`" value="ms"></v-radio>
        <v-radio :label="`Русский (${$t('Language.russian')})`" value="ru"></v-radio>
        <v-radio :label="`日本語 (${$t('Language.japanese')})`" value="ja"></v-radio>
        <v-radio :label="`Português (${$t('Language.portuguese')})`" value="pt"></v-radio>
        <v-radio :label="`Українська (${$t('Language.ukrainian')})`" value="uk"></v-radio>
        <v-radio :label="`Deutsch (${$t('Language.german')})`" value="de"></v-radio>
        <v-radio :label="`Français (${$t('Language.french')})`" value="fr"></v-radio>
        <v-radio :label="`한국어 (${$t('Language.korean')})`" value="ko"></v-radio>
        <v-radio :label="`Italiano (${$t('Language.italian')})`" value="it"></v-radio>
        <v-radio :label="`Tiếng Việt (${$t('Language.vietnamese')})`" value="vi"></v-radio>
        <v-radio :label="`Türkçe (${$t('Language.turkish')})`" value="tr"></v-radio>
      </v-radio-group>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn prepend-icon="mdi-close" color="primary" variant="text" @click="dialog = false">
        {{ $t("Common.close") }}
      </v-btn>
      <v-btn class="ml-3" prepend-icon="mdi-content-save" color="primary" variant="text" @click="this.save()">
        {{ $t("Common.save") }}
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-dialog>
</template>


<script>
import { mapGetters } from "vuex";
import { loadLanguage, determineLanguageCode } from '@/main';
export default {
data: () => ({
  dialogm1: '',
  dialog: false,
}),
created() {
  const browserLanguage = navigator.language || navigator.userLanguage;
  const languageCode = localStorage.getItem('selectedLanguage') || determineLanguageCode(browserLanguage);
  this.dialogm1 = languageCode;
},
methods: {
  save() {
    this.dialog = false;
    console.log(this.dialogm1);
    localStorage.setItem('selectedLanguage', this.dialogm1);
    loadLanguage(this.dialogm1); // Carga el idioma seleccionado
  },
},
computed: {
    ...mapGetters([
      'mobileView', 
    ]),
  },
};
</script>
