import '@/styles/bootstrap.scss';
import '@/styles/font-awesome.scss';
import '@/styles/fonts.scss';
import '@/styles/common.scss';

import Vue from 'vue';
import App from '@/components/App';
import store from '@/store';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
