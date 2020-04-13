<template>
  <div class="tab-missions">
    <span class="missions-desc">Niedostępne w wersji demo</span>

    <div class="feedback-info">
      <p>Masz pomysł jakie funkcje powinny się tutaj znaleźć?</p>
      <link-button class="btn-link-feedback" link="feedback">Zgłoś</link-button>
    </div>
  </div>
</template>

<script>
import LinkButton from '@/components/LinkButton';

export default {
  name: 'Missions',
  components: {LinkButton}
}
</script>

<style lang="scss" scoped>
  @import '~./Missions.scss';
</style>
