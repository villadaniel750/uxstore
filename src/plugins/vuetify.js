import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'dark', // Asegúrate de definir un tema por defecto
    themes: {
      light: {
        colors: {
          primary: '#000000', // Color para modo claro #d56043
        },
      },
      dark: {
        colors: {
          primary: '#FFFFFF', // Color para modo oscuro #FFAB40
        },
      },
    },
  },
})
