<template>
  <div class="tab-play" style="padding: 100px;">
    <button type="button" class="btn btn-success" @click="launchArma">Uruchom</button>
  </div>
</template>

<script>
export default {
  name: 'Play',
  methods: {
    launchArma() {
      this.$store.dispatch('launchArma');
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
  @import '~./Play.scss';
</style>
