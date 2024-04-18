// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import { createI18n } from 'vue-i18n';
import QrcodeVue from 'qrcode.vue'
import { store } from './store'
import VueNumber from 'vue-number-animation'

const app = createApp(App)

// Crear la instancia de i18n
const i18n = createI18n({
    locale: 'en', // Será actualizado más adelante
});

// Determinar el idioma a partir del almacenamiento local o el navegador
const storedLanguage = localStorage.getItem('selectedLanguage');
const browserLanguage = navigator.language || navigator.userLanguage;
const selectedLanguage = storedLanguage || browserLanguage;

// Función para cargar dinámicamente el archivo de idioma correspondiente
export const loadLanguage = (language) => {
    return import(`./locales/${language}.js`)
        .then((messages) => {
            i18n.global.setLocaleMessage(language, messages.default || messages);
            i18n.global.locale = language;
            // localStorage.setItem('selectedLanguage', language);
        })
        .catch((error) => {
            console.error('Error al cargar el idioma:', error);
            return import('./locales/en.js').then((messages) => {
                i18n.global.setLocaleMessage('en', messages.default || messages);
                i18n.global.locale = 'en';
                // localStorage.setItem('selectedLanguage', 'en');
            });
        });
};

// Función para determinar si se debe mostrar chino tradicional o simplificado
export const determineLanguageCode = (language) => {
    language = language.toLowerCase().substring(0, 5);   
    if (language.startsWith('zh')) {
        if (language === 'zh-tw' || language === 'zh-hk' || language === 'zh-ha' || language === 'zh-mo') {
            return 'zh-tw'; // Chino tradicional
        } else {
            return 'zh-cn'; // Chino simplificado
        }
    }
    return language.substr(0, 2);
};

// Cargar el idioma correspondiente según la selección o el idioma del navegador
export const languageCode = determineLanguageCode(selectedLanguage);
loadLanguage(languageCode).catch(() => {
    // En caso de error, cargar el archivo de idioma en inglés como predeterminado
    loadLanguage('en');
});

// Montar la aplicación con la instancia de i18n
app.use(i18n);

app.use(store);
app.use(VueNumber)

registerPlugins(app)
app.component('QrcodeVue', QrcodeVue)
app.mount('#app')
