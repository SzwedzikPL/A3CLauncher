<template>
  <div>

  </div>
</template>

<script>
import settingsMixin from '@/mixins/settings';

export default {
  name: 'Arma',
  mixins: [settingsMixin],
  computed: {
    arma() {
      return this.$store.state.app.settings.arma;
    },
  },
}
</script>
