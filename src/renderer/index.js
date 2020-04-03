import '@/styles/bootstrap.scss';
import '@/styles/font-awesome.scss';
import '@/styles/fonts.scss';
import '@/styles/common.scss';

import Vue from 'vue';
import App from '@/components/App';
import store from '@/store';

const remote = require('electron').remote;
const {shell} = require('electron');

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  data: () => ({

  }),
  methods: {
    getWindowSize() {
      return remote.getCurrentWindow().getSize();
    },
    setWindowSize(x, y) {
      remote.getCurrentWindow().setSize(x, y);
    },
    openExternal(path) {
      shell.openExternal(path);
    },
    maximizeWindow() {
      remote.getCurrentWindow().maximize();
    },
    minimizeWindow() {
      remote.getCurrentWindow().minimize();
    },
    closeWindow() {
      remote.getCurrentWindow().close();
    }
  },
  render: h => h(App),
});
