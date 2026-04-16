import '@/assets/css/styles.css';
import { createApp } from 'vue';
import {} from 'vue-router';
import App from './App.vue';
import { router } from './routers';

const saved = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);

const app = createApp(App);
app.use(router);
app.mount('#app');
