import { createApp } from 'vue';
import { createPinia} from 'pinia';
import './style.css';
import App from './App.vue';
import '@fortawesome/fontawesome-free/css/all.css';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.mount('#app');
