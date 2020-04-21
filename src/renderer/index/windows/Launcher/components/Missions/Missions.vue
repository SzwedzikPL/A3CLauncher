<template>
  <div class="tab-missions">
    <img src="https://media.giphy.com/media/YQitE4YNQNahy/giphy.gif" />
    <h4 class="missions-desc">Moduł w budowie</h4>

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
