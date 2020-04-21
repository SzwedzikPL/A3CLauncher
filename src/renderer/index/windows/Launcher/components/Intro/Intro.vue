<template>
  <div class="tab-intro">
    <div class="welcome-box" v-show="activeBox === 'welcome'">
      Witaj Gracz
      Ponieważ po raz pierwszy uruchomiłeś launcher konieczne będzie przeprowadzenie wstępnej konfiguracji.

      Wszystkie wprowadzone ustawienia będziesz mógł póżniej zmienić w zakładce ustawień.

      <button class="btn btn-primary" @click="startSteps">Rozpocznij konfigurację</button>
    </div>
    <div class="steps-box" v-show="activeBox === 'steps'">
      <ul class="steps">
        <li class="step" v-for="step, index in steps" :class="{active: index === activeStep}">
          <span class="step-icon">
            <i class="fa fa-check"></i>
          </span>
          <span class="step-title" v-text="step"></span>
        </li>
      </ul>
      <div class="steps-content">
        <div class="step-content">
          Treść aktualnego kroku
        </div>
        <div class="step-buttons">
          <button class="btn btn-secondary" @click="prevStep">Wróć</button>
          <button class="btn btn-primary" @click="nextStep" v-if="!isFinish">Dalej</button>
          <button class="btn btn-primary" @click="doneFirstRun" v-else>Zapisz</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Intro',
  data: () => ({
    activeBox: 'welcome',
    steps: ['Katalog Army 3', 'Katalog z modami', 'Katalog z misjami edytora', 'Katalog pluginów TeamSpeak 3', 'Katalog z narzędziami Army 3', 'Platforma'],
    activeStep: 0,
  }),
  computed: {
    isFinish() {
      return this.activeStep === this.steps.length;
    },
  },
  methods: {
    startSteps() {
      this.activeBox = 'steps';
    },
    saveSteps() {
      this.activeBox = 'finish';
    },
    prevStep() {
      if (this.activeStep <= 0) return;
      this.activeStep--;
    },
    nextStep() {
      if ((this.activeStep + 1) > this.steps.length) return;
      this.activeStep++;
    },
    doneFirstRun() {
      this.$store.commit('app/doneFirstRun');
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~./Intro.scss';
</style>
