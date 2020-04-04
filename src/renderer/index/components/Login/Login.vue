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
            <input type="text" class="form-control" placeholder="Nazwa użytkownika" tabindex="1" v-model="username" ref="inputUsername">
          </div>
          <div class="form-group">
            <input :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="Hasło" tabindex="2" v-model="password">
            <button class="btn btn-show-password" @click="toggleShowPassword">
              <i class="fa fa-eye" v-if="!showPassword"></i>
              <i class="fa fa-eye-slash" v-else></i>
            </button>
          </div>
          <div class="alert alert-danger" v-if="error" v-text="error"></div>
          <button class="btn btn-success btn-submit" @click="loginUser" tabindex="3">Zaloguj</button>
          <hr />
          <button class="btn btn-recovery" @click="openWebRecovery" tabindex="4">Przypomnij hasło <i class="fa fa-external-link"></i></button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    waiting: false,
    username: null,
    password: null,
    showPassword: false,
    error: null
  }),
  mounted() {
    this.$nextTick(() => this.updateWindowSize());
    this.$refs.inputUsername.focus();
  },
  methods: {
    updateWindowSize() {
      [0, 10].forEach(delay => setTimeout(() => {
        this.$root.setWindowSize(
          document.documentElement.scrollWidth,
          document.documentElement.scrollHeight
        )
      }, delay));
    },
    openWebRecovery() {
      this.$root.openExternal('https://arma3coop.pl/ucp.php?mode=sendpassword');
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    loginUser() {
      this.waiting = true;
      this.$store.dispatch('session/login', {
        username: this.username,
        password: this.password
      }).then(result => {

      }).catch(error => {
        this.waiting = false;
        this.error = error.message;
        this.$nextTick(this.updateWindowSize());
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~./Login.scss';
</style>
