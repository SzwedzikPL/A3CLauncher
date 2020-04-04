import '@/styles/bootstrap.scss';
import '@/styles/font-awesome.scss';
import '@/styles/fonts.scss';
import '@/styles/common.scss';

import Vue from 'vue';
import App from '@/components/App';
import store from '@/store';

const {shell, remote} = require('electron');

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  data: () => ({
    isWindowMaximized: false
  }),
  methods: {
    initLauncherWindow() {
      const currentWindow = remote.getCurrentWindow();
      currentWindow.setSize(1040, 620);
      currentWindow.center();
      currentWindow.show();

      // Workaround for https://github.com/electron/electron/issues/19934
      // currentWindow.on('resize', () => {
      //   const bounds = currentWindow.getBounds();
      //   const size = currentWindow.getSize();
      //   const workArea = remote.screen.getDisplayMatching(bounds).workArea;
      //   this.isWindowMaximized = (
      //     size[0] == workArea.width &&
      //     size[1] == workArea.height
      //   );
      // });
    },
    preInitLauncherWindow(value) {
      const currentWindow = remote.getCurrentWindow();
      currentWindow.hide();
      currentWindow.resizable = true;
    },
    getWindowSize() {
      return remote.getCurrentWindow().getSize();
    },
    setWindowSize(x, y, center = false) {
      const currentWindow = remote.getCurrentWindow();
      currentWindow.setSize(x, y);
      if (center) currentWindow.center();
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
    unmaximizeWindow() {
      remote.getCurrentWindow().unmaximize();
    },
    closeWindow() {
      remote.getCurrentWindow().close();
    }
  },
  render: h => h(App),
});
