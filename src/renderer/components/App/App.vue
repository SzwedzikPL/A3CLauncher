<template>
  <div id="app">
    <Login v-if="!$store.state.session.logged" />
    <Launcher v-else />
  </div>
</template>

<script>
import Login from '@/components/Login';
import Launcher from '@/components/Launcher';

export default {
  name: 'App',
  components: {Login, Launcher}
}
</script>

<style>

</style>
