<template>
  <div class="window login-window">
    <WindowHandler ref="windowHandler" />
    <div class="window-content" ref="windowContent">
      <span class="login-header-shadow" v-once></span>
      <div class="login-header" v-once>
        <span class="logo"></span>
        <span class="logo-title">Community Launcher</span>
      </div>
      <div class="login-form" :class="{waiting: waiting}">
        <div class="form-spinner spinner-border"></div>
        <form class="form-content" @submit.prevent="loginUser" :class="{loading: waiting & !loginEnabled}">
          <template v-if="loginEnabled">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Nazwa użytkownika" tabindex="1" v-model="form.username" ref="inputUsername">
            </div>
            <div class="form-group">
              <input :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="Hasło" tabindex="2" v-model="form.password" ref="inputPassword">
              <a class="btn btn-transparent btn-show-password" @click="toggleShowPassword" v-if="!autoLogin">
                <i class="fa fa-eye" v-if="!showPassword"></i>
                <i class="fa fa-eye-slash" v-else></i>
              </a>
            </div>
            <div class="form-group form-checkbox">
              <input type="checkbox" v-model="form.remember" tabindex="3">
              <span class="checkbox" @click="toggleRemember">
                <i class="fa fa-check" v-if="form.remember"></i>
              </span>
              <!-- TODO: Add custom tooltip instead of title attr -->
              <label @click="toggleRemember">Zapamiętaj logowanie <i class="fa fa-question-circle" title="Przy kolejnym uruchomieniu zostaniesz zalogowany automatycznie używając ostatnich danych."></i></label>
            </div>
          </template>
          <div class="alert alert-danger text-center" v-if="error" v-text="error"></div>
          <button type="submit" class="btn btn-success btn-submit" tabindex="4" v-if="loginEnabled">Zaloguj</button>
          <hr />
          <div class="link-buttons">
            <link-button class="btn-link-forum" name="Forum" link="forum" @opened="focusInput" tabindex="5" />
            <link-button class="btn-link-recovery" name="Przypomnij hasło" link="recovery" @opened="focusInput" tabindex="6" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import appConfig from '@/config';
import stringtable from '@/stringtable';
import log from '@/utils/log';
import credentials from '@/utils/credentials.js';
import windowMixin from '@/mixins/window';
import LinkButton from '@/components/LinkButton';
import WindowHandler from '@/components/WindowHandler';

const sizeX = appConfig.loginWindow.sizeX;
const sizeY = appConfig.loginWindow.sizeY;

export default {
  name: 'Login',
  mixins: [windowMixin],
  data: () => ({
    waiting: true,
    autoLogin: false,
    showPassword: false,
    error: null,
    loginEnabled: false,
    form: {
      username: null,
      password: null,
      remember: false
    },
  }),
  methods: {
    initWindow() {
      log.debug('Initing', this.$options.name, 'window...');
      const currentWindow = this.$root.getCurrentWindow();
      currentWindow.resizable = true;
      currentWindow.setMinimumSize(sizeX, sizeY);
      currentWindow.setSize(sizeX, sizeY);
      currentWindow.center();
      currentWindow.show();
      currentWindow.resizable = false;
      this.$emit('ready');
      log.debug(this.$options.name, 'window inited');
    },
    onWindowReady() {
      log.debug(this.$options.name, 'window ready');
      this.updateWindowSize(true);
      this.$store.dispatch('session/init').then(() => {
        this.loginEnabled = true;
        this.$nextTick(this.init);
      }).catch(error => {
        this.error = error.message;
      }).finally(() => {
        this.waiting = false;
      });
    },
    init() {
      // Page is visible & elements are focusable
      const app = this.$store.state.app;
      const username = app.lastUsername;

      this.form.username = username;

      if (app.autoLogin) {
        this.waiting = true;
        this.form.remember = true;
        credentials.get(username).then(password => {
          this.autoLogin = true;
          this.form.password = password;
          this.loginUser();
        }).catch(message => {
          log.error(message);
          this.error = stringtable.CRED_READ_ERROR;
          this.waiting = false;
        });
      } else {
        this.focusInput();
      }

      this.$nextTick(() => this.updateWindowSize());
    },
    focusInput() {
      this.$refs['input' + (this.form.username ? 'Password' : 'Username')].focus();
    },
    updateWindowSize(center = false) {
      this.setWindowSize(center);
      this.$nextTick(() => this.setWindowSize(center));
    },
    setWindowSize(center) {
      const handlerH = this.$refs.windowHandler.$el.offsetHeight;
      const contentH = this.$refs.windowContent.offsetHeight;

      this.$root.setWindowSize(
        sizeX,
        handlerH + contentH,
        center
      )
    },
    toggleRemember() {
      this.form.remember = !this.form.remember;
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    loginUser() {
      this.waiting = true;
      this.$store.dispatch('session/login', this.form).then(result => {

      }).catch(error => {
        this.waiting = false;
        this.error = error.message;
        this.form.password = '';
        this.autoLogin = false;
        this.$refs.inputPassword.focus();
        this.$nextTick(this.updateWindowSize());
      });
    }
  },
  components: {WindowHandler, LinkButton}
}
</script>

<style lang="scss" scoped>
  @import '~./Login.scss';
</style>
