import '@/styles/bootstrap.scss';
import '@/styles/font-awesome.scss';
import '@/styles/fonts.scss';
import '@/styles/common.scss';

import Vue from 'vue';
import App from '@/components/App';
import store from '@/store';
import appConfig from '@/config';

const {shell, remote} = require('electron');

Vue.config.productionTip = false;

// Logger for Arma 3 rpt
// const isDev = process.env.NODE_ENV === 'development';
// const BrowserWindow = remote.BrowserWindow;
// let win = new BrowserWindow({
//   width: 800,
//   height: 600,
//   webPreferences: {
//     nodeIntegration: true
//   },
// });
// win.loadURL(isDev ? 'http://localhost:9080/console.html' : `file://${__dirname}/console.html`);

new Vue({
  el: '#app',
  store,
  data: () => ({
    isWindowMaximized: false,
  }),
  methods: {
    switchLocation(link) {
      const target = link.split('.');
      if (!target.length) return;
      this.$refs.app.switchLocation(target);
    },
    getCurrentWindow() {
      return remote.getCurrentWindow();
    },
    getWindowSize() {
      return remote.getCurrentWindow().getSize();
    },
    setWindowSize(x, y, center = false) {
      const currentWindow = remote.getCurrentWindow();
      const resizable = currentWindow.resizable;
      currentWindow.resizable = true;
      currentWindow.setSize(x, y);
      if (center) currentWindow.center();
      currentWindow.resizable = resizable;
    },
    openLink(linkName) {
      return new Promise((resolve, reject) => {
        const link = appConfig.links[linkName];
        if (!link) return reject('Unknown link: ' + linkName);

        shell.openExternal(link).then(resolve).catch(reject);
      });
    },
    maximizeWindow() {
      remote.getCurrentWindow().maximize();
    },
    minimizeWindow() {
      remote.getCurrentWindow().minimize();
    },
    unmaximizeWindow() {
      remote.getCurrentWindow().unmaximize();
    },
    closeWindow() {
      remote.getCurrentWindow().close();
    }
  },
  render: h => h(App, {ref: 'app'}),
});
