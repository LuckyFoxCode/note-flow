import '@/assets/css/styles.css';
import { createApp } from 'vue';
import App from './App.vue';

const saved = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);

createApp(App).mount('#app');
