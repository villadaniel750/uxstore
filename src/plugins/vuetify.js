import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'dark', // Asegúrate de definir un tema por defecto
    themes: {
      light: {
        colors: {
          primary: '#d56043', // Color verde para modo claro
        },
      },
      dark: {
        colors: {
          primary: '#FFAB40', // Color rojo para modo oscuro
        },
      },
    },
  },
})
