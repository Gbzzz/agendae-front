import { loadFonts } from '@/plugins/webfontloader'
loadFonts()
import App from './App.vue'
import './axios'
import { createApp } from 'vue'
import vuetify from '@/plugins/vuetify';
import router from '@/router';
import pinia from '@/store';
import { useMe } from '@/store/me';
import '@/scss/style.scss';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App)

app.use(pinia)
app.use(ElementPlus)
const meStore = useMe();
meStore.getMe()
  .catch(() => {})
  .finally(() => {
    app.use(vuetify)
    app.use(router)
    app.mount('#app')
  })

