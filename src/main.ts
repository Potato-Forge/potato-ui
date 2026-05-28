import { createPinia } from 'pinia'
import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './foundations/pf-theme/pf-theme.css'
import './docs/styles.css'
import App from './App.vue'
import PfCode from './components/pf-code/PfCode.vue'

const app = createApp(App)
app.component('PfCode', PfCode)
app.use(createPinia())
app.mount('#app')
