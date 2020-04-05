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
              <a class="nav-link" :class="{active: tabActive('Play')}" @click="switchTab('Play')">Graj</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{active: tabActive('Missions')}" @click="switchTab('Missions')">Twórz misje</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{active: tabActive('Settings')}" @click="switchTab('Settings')">Ustawienia</a>
            </li>
          </ul>
        </div>
        <div class="user-wrapper">
          <img :src="user.avatar" class="user-avatar" />
          <div class="user-data">
            <span class="user-name" v-text="user.name" :style="user.color ? {color: user.color} : null"></span>
            <span class="user-rank" v-text="user.rank"></span>
          </div>
          <!-- TODO: Add drop controls -->
          <div class="drop">
            <div class="list-group">
              <a href="#" class="list-group-item list-group-item-action" @click="logout">
                Wyloguj <i class="fa fa-sign-out"></i>
              </a>
            </div>
          </div>
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
import Page from '@/components/Page.vue';
import Play from './components/Play';
import Missions from './components/Missions';
import Settings from './components/Settings';

export default {
  name: 'Launcher',
  extends: Page,
  data: () => ({
    currentTabComponent: 'Play'
  }),
  computed: {
    user() {
      return this.$store.state.session.user;
    }
  },
  methods: {
    initWindow() {
      const currentWindow = this.$root.getCurrentWindow();
      currentWindow.setSize(1040, 620);
      currentWindow.center();
      currentWindow.show();
      this.$emit('ready');
    },
    logout() {
      this.$store.dispatch('session/logout');
    },
    tabActive(tab) {
      return this.currentTabComponent === tab;
    },
    switchTab(tab) {
      this.currentTabComponent = tab;
    }
  },
  components: {Play, Missions, Settings}
}
</script>

<style lang="scss" scoped>
  @import '~./Launcher.scss';
</style>
