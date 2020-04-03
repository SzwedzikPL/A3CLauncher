<template>
  <div class="window launcher-window">
    <div class="window-handler">
      <button type="button" @click="$root.minimizeWindow">
        <i class="fa fa-minus"></i>
      </button>
      <button type="button" @click="$root.unmaximizeWindow" v-if="$root.isWindowMaximized">
        <i class="fa fa-window-restore"></i>
      </button>
      <button type="button" @click="$root.maximizeWindow" v-if="!$root.isWindowMaximized">
        <i class="fa fa-window-maximize"></i>
      </button>
      <button type="button" @click="$root.closeWindow">
        <i class="fa fa-times"></i>
      </button>
    </div>
    <div class="window-content">
      <div class="launcher-background"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Launcher',
  mounted() {
    // Give chrome time to update screen
    // This fixes blink of login-window on launcher-window showing up
    // TODO: find better way...
    setTimeout(() => {
      this.$root.preInitLauncherWindow();
      this.$emit('ready');
    }, 200);
    setTimeout(() => {
      this.$root.initLauncherWindow();
    }, 800);
  },
}
</script>

<style lang="scss" scoped>
  @import '~@/components/Launcher/Launcher.scss';
</style>
