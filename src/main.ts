import '@/assets/css/styles.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import {} from 'vue-router';
import App from './App.vue';
import { router } from './routers';

const saved = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.mount('#app');
