<template>
  <div class="window login-window">
    <div class="window-handler">
      <button type="button" @click="$root.minimizeWindow">
        <i class="fa fa-minus"></i>
      </button>
      <button type="button" @click="$root.closeWindow">
        <i class="fa fa-times"></i>
      </button>
    </div>
    <div class="window-content">
      <div class="logo"></div>
      <div class="title">Community Launcher</div>
      <div class="form" :class="{waiting: waiting}">
        <div class="form-spinner spinner-border"></div>
        <form class="form-content" @submit.prevent="loginUser" :class="{loading: waiting & !loginEnabled}">
          <template v-if="loginEnabled">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Nazwa użytkownika" tabindex="1" v-model="form.username" ref="inputUsername">
            </div>
            <div class="form-group">
              <input :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="Hasło" tabindex="2" v-model="form.password" ref="inputPassword">
              <a class="btn btn-show-password" @click="toggleShowPassword" v-if="!autoLogin">
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
          <div class="alert alert-danger" v-if="error" :class="{'text-center': !loginEnabled}" v-text="error"></div>
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
import credentials from '@/utils/credentials.js';
import windowMixin from '@/mixins/window';
import LinkButton from '@/components/LinkButton';
import log from '@/utils/log';
import stringtable from '@/stringtable';

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
      const currentWindow = this.$root.getCurrentWindow();
      currentWindow.resizable = true;
      currentWindow.setMinimumSize(sizeX, sizeY);
      currentWindow.setSize(sizeX, sizeY);
      currentWindow.center();
      currentWindow.show();
      currentWindow.resizable = false;
      this.$emit('ready');
    },
    onWindowReady() {
      this.updateWindowSize();
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
    updateWindowSize() {
      [0, 10].forEach(delay => setTimeout(() => {
        this.$root.setWindowSize(
          sizeX,
          document.documentElement.scrollHeight,
          true
        )
      }, delay));
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
  components: {LinkButton}
}
</script>

<style lang="scss" scoped>
  @import '~./Login.scss';
</style>
