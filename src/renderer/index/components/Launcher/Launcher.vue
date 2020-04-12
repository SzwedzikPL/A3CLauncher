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
              <a href="#" class="nav-link" :class="{active: tabActive('Play')}" @click="switchTab('Play')" ref="tabPlay">
                Graj <i class="icon-error" v-if="tabErrors.Play"></i>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" :class="{active: tabActive('Missions')}" @click="switchTab('Missions')" ref="tabMissions">
                Twórz misje <i class="icon-error" v-if="tabErrors.Missions"></i>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" :class="{active: tabActive('Settings')}" @click="switchTab('Settings')" ref="tabSettings">
                Ustawienia <i class="icon-error" v-if="tabErrors.Settings"></i>
              </a>
            </li>
          </ul>
        </div>
        <dropdown class="user-wrapper">
          <img :src="user.avatar || defaultAvatar" class="user-avatar" />
          <div class="user-data">
            <span class="user-name" v-text="user.name" :style="user.color ? {color: user.color} : null"></span>
            <span class="user-rank" v-text="user.rank"></span>
          </div>
          <template v-slot:options>
            <div class="list-group">
              <a href="#" class="list-group-item list-group-item-action" @click="logout">
                <i class="fa fa-sign-out"></i> Wyloguj
              </a>
            </div>
          </template>
        </dropdown>
      </div>
      <div class="launcher-content">
        <keep-alive>
          <component :is="currentTabComponent" ref="currentComponent"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import appConfig from '@/config';
import windowMixin from '@/mixins/window';
import tabsMixin from '@/mixins/tabs';
import Dropdown from '@/components/Dropdown';
import defaultAvatar from '@/assets/default-avatar.png';

import Play from './components/Play';
import Missions from './components/Missions';
import Settings from './components/Settings';

const sizeX = appConfig.launcherWindow.sizeX;
const sizeY = appConfig.launcherWindow.sizeY;

export default {
  name: 'Launcher',
  mixins: [windowMixin, tabsMixin],
  data: () => ({
    defaultAvatar,
    tabs: ['Play', 'Missions', 'Settings'],
    checkOSTasksTimeout: null,
    currentTabComponent: 'Play'
  }),
  computed: {
    user() {
      return this.$store.state.session.user;
    },
  },
  methods: {
    initWindow() {
      const currentWindow = this.$root.getCurrentWindow();
      // TODO: saving last size?
      currentWindow.setSize(sizeX, sizeY);
      currentWindow.setMinimumSize(sizeX, sizeY);
      currentWindow.center();
      currentWindow.show();
      this.$emit('ready');
    },
    onWindowReady() {
      this.checkOSTasks();
      this.$store.dispatch('app/parseSettings');

      setTimeout(() => {
        this.$refs['tab' + this.currentTabComponent].focus();
      }, 50);
    },
    checkOSTasks() {
      this.$store.dispatch('session/checkOSTasks').then(() => {
        clearTimeout(this.checkOSTasksTimeout);
        this.checkOSTasksTimeout = setTimeout(
          this.checkOSTasks,
          appConfig.osTasksCheckInterval
        );
      });
    },
    logout() {
      this.$store.dispatch('session/logout');
    }
  },
  components: {Dropdown, Play, Missions, Settings}
}
</script>

<style lang="scss" scoped>
  @import '~./Launcher.scss';
</style>

<style lang="scss">
  @import '~./LauncherGlobal.scss';
</style>
