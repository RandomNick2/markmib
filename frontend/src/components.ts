/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import PrimeVue from 'primevue/config';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Badge from 'primevue/badge';
import Ripple from 'primevue/ripple';
import Password from 'primevue/password';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import SplitButton from 'primevue/splitbutton';
import Avatar from 'primevue/avatar';
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import Tooltip from 'primevue/tooltip';
import ContextMenu from 'primevue/contextmenu';

import type { App } from 'vue';

export function registerComponentsPrimeVue(app: App) {
  app.use(PrimeVue, {
    fontFamily: 'SF Pro Display, sans-serif'
  });
  app.use(ToastService);
  app.directive('ripple', Ripple);
  app.directive('tooltip', Tooltip);
  app.component('Menubar', Menubar);
  app.component('InputText', InputText);
  app.component('Button', Button);
  app.component('Badge', Badge);
  app.component('Password', Password);
  app.component('Toast', Toast);
  app.component('SplitButton', SplitButton);
  app.component('Avatar', Avatar);
  app.component('Calendar', Calendar);
  app.component('Dialog', Dialog);
  app.component('Dropdown', Dropdown);
  app.component('ContextMenu', ContextMenu);
}
