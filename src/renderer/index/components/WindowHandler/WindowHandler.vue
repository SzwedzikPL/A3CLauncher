<template>
  <div class="window-handler" v-once>
    <button type="button" @click="$root.minimizeWindow">
      <i class="fa fa-minus"></i>
    </button>
    <!-- <button type="button" @click="$root.unmaximizeWindow" v-if="$root.isWindowMaximized">
      <i class="fa fa-window-restore"></i>
    </button>
    <button type="button" @click="$root.maximizeWindow" v-if="!$root.isWindowMaximized">
      <i class="fa fa-window-maximize"></i>
    </button> -->
    <button type="button" @click="$root.closeWindow">
      <i class="fa fa-times"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'WindowHandler'
}
</script>

<style lang="scss" scoped>
  @import '~./WindowHandler.scss';
</style>
