import { createI18n } from 'vue-i18n'
import store from "../store/index";
import en from './english.json'
import amh from './amharic.json'
import oro from './oromo.json'
const i18n = createI18n({

    locale: store.state.lang || 'en',
    messages: {
        en,
        amh,
        oro,
    },
    fallbackLocale: 'en'
})
export default i18n