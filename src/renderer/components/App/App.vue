<template>
  <div id="app">
    <Login v-if="!loggedIn" />
    <Launcher v-else v-show="launcherReady" @ready="onLauncherReady" />
  </div>
</template>

<script>
import Login from '@/components/Login';
import Launcher from '@/components/Launcher';

export default {
  name: 'App',
  data: () => ({
    launcherReady: false
  }),
  computed: {
    loggedIn() {
      return this.$store.state.session.loggedIn;
    }
  },
  methods: {
    onLauncherReady() {
      this.launcherReady = true;
    }
  },
  components: {Login, Launcher}
}
</script>

<style>

</style>
