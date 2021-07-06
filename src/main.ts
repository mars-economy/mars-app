import { createApp } from 'vue'
import { LockPlugin } from '@snapshot-labs/lock/plugins/vue3'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import options from '@/utils/auth'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import OverlayPanel from 'primevue/overlaypanel'
import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.min.css'
import Panel from 'primevue/panel'
import ToastService from 'primevue/toastservice'

const app = createApp(App)
  .use(store)
  .use(router)
  .use(LockPlugin, options)
  .use(PrimeVue)
  .use(ToastService)

const requireComponent = require.context('@/components', true, /[\w-]+\.vue$/)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
  )
  app.component(componentName, componentConfig.default || componentConfig)
})
app.component('Button', Button)
app.component('Dialog', Dialog)
app.component('OverlayPanel', OverlayPanel)
app.component('Panel', Panel)

app.mount('#app')

export default app
