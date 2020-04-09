<template>
  <div id="app">
    <Login v-if="!loggedIn" v-show="pageReady" :ready="pageReady" @ready="onPageReady" ref="login" />
    <Launcher v-else v-show="pageReady" :ready="pageReady" @ready="onPageReady" ref="launcher" />
  </div>
</template>

<script>
import Login from '@/components/Login';
import Launcher from '@/components/Launcher';

export default {
  name: 'App',
  data: () => ({
    pageReady: false
  }),
  computed: {
    loggedIn() {
      // Hide page if loggedIn status changed
      this.pageReady = false;
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
    onPageReady() {
      this.pageReady = true;
    },
    hideWindow() {
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
