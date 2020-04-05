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
        <form class="form-content" @submit.prevent="loginUser">
          <div class="form-group">
            <!-- TODO: Fix selecting username after logout  -->
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
          <div class="alert alert-danger" v-if="error" v-text="error"></div>
          <button type="submit" class="btn btn-success btn-submit" tabindex="4">Zaloguj</button>
          <hr />
          <div class="link-buttons">
            <button type="button" class="btn btn-link btn-link-forum" @click="openLink('forum')" tabindex="5" :disabled="openingLink === 'forum'">
              <span class="btn-spinner spinner-border"></span>
              <span class="btn-content">Forum <i class="fa fa-external-link"></i></span>
            </button>
            <button type="button" class="btn btn-link btn-link-recovery" @click="openLink('recovery')" tabindex="6" :disabled="openingLink === 'recovery'">
              <span class="btn-spinner spinner-border"></span>
              <span class="btn-content">Przypomnij hasło <i class="fa fa-external-link"></i></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import credentials from '@/credentials.js';
import Page from '@/components/Page.vue';

const pageWidth = 320;

export default {
  name: 'Login',
  extends: Page,
  data: () => ({
    waiting: false,
    openingLink: false,
    autoLogin: false,
    showPassword: false,
    error: null,
    form: {
      username: null,
      password: null,
      remember: false
    },
  }),
  methods: {
    initWindow() {
      const currentWindow = this.$root.getCurrentWindow();
      currentWindow.setSize(pageWidth, 464);
      currentWindow.center();
      currentWindow.show();
      currentWindow.resizable = false;
      this.$emit('ready');
      this.$nextTick(() => {
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
          }).catch(() => {
            // TODO: Add logger
            this.error = 'Odczyt hasła z poświadczeń systemu Windows nie powiodło się.';
            this.waiting = false;
          });
        } else {
          this.focusInput();
        }

        this.$nextTick(() => this.updateWindowSize());
      });
    },
    focusInput() {
      this.$refs['input' + (this.form.username ? 'Password' : 'Username')].focus();
    },
    updateWindowSize() {
      [0, 10].forEach(delay => setTimeout(() => {
        this.$root.setWindowSize(
          pageWidth,
          document.documentElement.scrollHeight
        )
      }, delay));
    },
    openLink(name) {
      this.openingLink = name;
      this.$root.openLink('forum').then(() => {
        this.focusInput();
        // Give OS some time for opening default browser
        setTimeout(() => {
          this.openingLink = false;
        }, 500);
      }).catch(error => {
        // TODO: Add logger
        console.error(error);
        this.openingLink = false;
      });
    },
    openWebRecovery() {
      this.$root.openLink('recovery');
      this.$refs.inputUsername.focus();
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
  }
}
</script>

<style lang="scss" scoped>
  @import '~./Login.scss';
</style>
