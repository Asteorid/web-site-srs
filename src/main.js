import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Импорт маршрутизатора

const app = createApp(App);
app.use(router); // Использование Vue Router в приложении
app.mount('#app');
