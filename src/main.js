import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import i18n from './language/i18n'
import Toaster from "@meforma/vue-toaster";
import VueGoogleMaps from '@fawmi/vue-google-maps'


createApp(App).use(store).use(router).use(i18n).use(Toaster, { position: 'bottom-right' }).use(VueGoogleMaps, {
    load: {
        key: '',
        language: 'en',
    },
}).mount('#app')