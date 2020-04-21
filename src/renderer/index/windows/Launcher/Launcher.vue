<template>
  <div class="window launcher-window">
    <WindowHandler />
    <div class="logo-wrapper" v-once>
      <div class="logo"></div>
    </div>
    <div class="window-content">
      <div class="launcher-background" :style="backgroundStyles"></div>
      <div class="launcher-header">
        <div class="navigation">
          <div class="logo-placeholder" v-once></div>
          <div class="intro-title" v-if="firstRun">Wstępna konfiguracja</div>
          <ul class="nav" v-else>
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
        <Intro v-if="firstRun" />
        <keep-alive v-else>
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
import WindowHandler from '@/components/WindowHandler';
import defaultAvatar from '@/assets/default-avatar.png';

import Intro from './components/Intro';
import Play from './components/Play';
import Missions from './components/Missions';
import Settings from './components/Settings';

const sizeX = appConfig.launcherWindow.sizeX;
const sizeY = appConfig.launcherWindow.sizeY;

const path = require('path');
const {pathToFileURL} = require('url');

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
    firstRun() {
      return this.$store.state.app.firstRun;
    },
    backgroundStyles() {
      const launcher = this.$store.state.app.settings.launcher;
      const opacityInput = this.$store.state.session.bgOpacityInput;
      const styles = [{
        opacity: opacityInput !== null ? opacityInput : launcher.bgOpacity
      }];

      if (launcher.bgImage) styles.push({
        backgroundImage: `url(${pathToFileURL(path.resolve(launcher.bgImage))})`
      });
      return styles;
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
      this.$store.dispatch('app/validateSettings');

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
    },
  },
  components: {WindowHandler, Dropdown, Intro, Play, Missions, Settings}
}
</script>

<style lang="scss" scoped>
  @import '~./Launcher.scss';
</style>

<style lang="scss">
  @import '~./LauncherGlobal.scss';
</style>
