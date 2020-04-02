import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';

import '@/styles/fonts.css';
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
