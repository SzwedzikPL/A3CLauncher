<template>
  <div class="login-window">
    <div class="window-handler">
      <button type="button" @click="login">
        <i class="fa fa-minus"></i>
      </button>
      <button type="button" @click="login">
        <i class="fa fa-times"></i>
      </button>
    </div>
    <div class="window-content">
      <div class="logo"></div>
      <div class="title">Community Launcher</div>
      <form>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Login" tabindex="0">
        </div>
        <div class="form-group">
          <!-- TODO: add show password option -->
          <input type="password" class="form-control" placeholder="Hasło" tabindex="1">
        </div>
        <button class="btn btn-submit" @click="login" tabindex="2">Zaloguj</button>
        <hr />
        <button class="btn btn-recovery" @click="login" tabindex="3">Przypomnij hasło <i class="fa fa-external-link"></i></button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    login() {
      this.$store.state.session.logged = true;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/components/Login/Login.scss';
</style>
