<template>
  <div>

  </div>
</template>

<script>
import formMixin from '@/mixins/form';

export default {
  name: 'Arma',
  mixins: [formMixin],
  computed: {
    arma() {
      return this.$store.state.app.settings.arma;
    },
  },
}
</script>
