import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store';
import { AuthStateModule } from './store/modules/AuthState';

import 'highlight.js/scss/atelier-cave-dark.scss';
import hljs from 'highlight.js';

Vue.config.productionTip = false;

Vue.use(hljs.vuePlugin);

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App),
  beforeCreate() {
    AuthStateModule.initialize();
  }
}).$mount('#app');
