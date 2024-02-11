/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import PrimeVue from 'primevue/config'
import Menubar from 'primevue/menubar'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import Ripple from 'primevue/ripple'
import Password from 'primevue/password'


import type { App } from 'vue'

export function registerComponentsPrimeVue(app: App) {
  app.use(PrimeVue, {
    fontFamily: 'SF Pro Display, sans-serif',
  })
  app.component('Menubar', Menubar)
  app.component('InputText', InputText)
  app.component('Button', Button)
  app.component('Badge', Badge)
  app.directive('ripple', Ripple)
  app.component('Password', Password)
}
