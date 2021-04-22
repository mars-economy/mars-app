import { createApp } from 'vue'
import { LockPlugin } from '@snapshot-labs/lock/plugins/vue3'
import options from '@/utils/auth'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'

const app = createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue)
  .use(LockPlugin, options)

app.mount('#app')
export default app
