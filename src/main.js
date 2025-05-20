import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './style.css'
import App from './App.vue'
import router from './router/router';

const app = createApp(App)
const pinia = createPinia()

app.use(pinia) // ✅ Register Pinia before mounting or using stores
app.use(router)
app.mount('#app')
