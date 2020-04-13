<template>
  <div>
    <h4>Wygląd</h4>


  </div>
</template>

<script>
import settingsMixin from '@/mixins/settings';

export default {
  name: 'Application',
  mixins: [settingsMixin],
  computed: {
    application() {
      return this.$store.state.app.settings.application;
    },
  },
}
</script>
