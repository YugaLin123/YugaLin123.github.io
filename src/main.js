import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara' // 引入 Lara 主題
import 'primeicons/primeicons.css'
import { primeVue_i18n } from '@/i18n/primeVueI18n.js'
import { i18n } from '@/i18n/locales.js'
import '@/assets/css/default.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(i18n)
app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Lara,
    options: {
      prefix: 'p', // CSS 變數的前綴，預設為 p
      darkModeSelector: 'system', // 或是 '.my-app-dark'
      cssLayer: false, // 是否使用 CSS Layer
    },
  },
  locale: primeVue_i18n,
})
app.mount('#app')
