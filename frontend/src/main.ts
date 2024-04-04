import 'primeicons/primeicons.css';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/aura-light-blue/theme.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { registerComponentsPrimeVue } from './components';

const app = createApp(App);

app.use(createPinia());
app.use(router);
registerComponentsPrimeVue(app);

app.mount('#app');
