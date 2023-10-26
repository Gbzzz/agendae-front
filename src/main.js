import App from './App.vue'
import './axios'
import { createApp } from 'vue'
import vuetify from '@/plugins/vuetify';
import router from '@/router';
import pinia from '@/store';
// import { useMe } from '@/store/me';
import '@/scss/style.scss';

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.mount('#app')

app.use(pinia)


