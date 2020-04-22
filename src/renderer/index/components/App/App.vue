<template>
  <div id="app">
    <Login v-if="!loggedIn" v-show="windowReady" :ready="windowReady" @ready="onWindowReady" ref="login" />
    <Launcher v-else v-show="windowReady" :ready="windowReady" @ready="onWindowReady" ref="launcher" />
  </div>
</template>

<script>
import log from '@/utils/log';

import Login from '@/windows/Login';
import Launcher from '@/windows/Launcher';

export default {
  name: 'App',
  data: () => ({
    windowReady: false
  }),
  computed: {
    loggedIn() {
      // Hide page if loggedIn status changed
      this.windowReady = false;
      return this.$store.state.session.loggedIn;
    }
  },
  mounted() {
    this.initComponentWindow();
  },
  methods: {
    switchLocation(target) {
      if (!this.$refs.launcher) return;
      this.$refs.launcher.switchLocation(target);
    },
    onWindowReady() {
      this.windowReady = true;
    },
    hideWindow() {
      log.debug('Hiding current window');
      // Hide window
      const currentWindow = this.$root.getCurrentWindow();
      currentWindow.hide();
      currentWindow.resizable = true;
      // Call init on current page
      this.initComponentWindow();
    },
    initComponentWindow() {
      this.$refs[this.loggedIn ? 'launcher' : 'login'].initWindow();
    }
  },
  components: {Login, Launcher}
}
</script>

<style>

</style>
