<template>
  <div class="window launcher-window">
    <div class="window-handler">
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
    <div class="logo-wrapper"><div class="logo"></div></div>
    <div class="window-content">
      <div class="launcher-background"></div>
      <div class="launcher-header">
        <div class="navigation">
          <div class="logo-placeholder"></div>
          <ul class="nav">
            <li class="nav-item">
              <a class="nav-link" :class="{active: currentTabComponent == 'Play'}" @click="switchTab('Play')">Graj</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{active: currentTabComponent == 'Missions'}" @click="switchTab('Missions')">Twórz misje</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{active: currentTabComponent == 'Settings'}" @click="switchTab('Settings')">Ustawienia</a>
            </li>
          </ul>
        </div>
        <div class="userbox">
          {{ user.username }}
        </div>
      </div>
      <div class="launcher-content">
        <keep-alive>
          <component :is="currentTabComponent"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import Play from './components/Play';
import Missions from './components/Missions';
import Settings from './components/Settings';

export default {
  name: 'Launcher',
  data: () => ({
    currentTabComponent: 'Play'
  }),
  computed: {
    user() {
      return this.$store.state.session.user;
    }
  },
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
  methods: {
    switchTab(tab) {
      this.currentTabComponent = tab;
    }
  },
  components: {Play, Missions, Settings}
}
</script>

<style lang="scss" scoped>
  @import '~@/components/Launcher/Launcher.scss';
</style>
