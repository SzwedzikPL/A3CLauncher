<template>
  <div class="tab-settings">
    <div class="tab-navigation">
      <div class="list-group">
        <button type="button" class="list-group-item list-group-item-action" :class="{active: tabActive('Launcher')}" @click="switchTab('Launcher')">
          Aplikacja <i class="icon-error" v-if="tabErrors.Launcher"></i>
        </button>
        <button type="button" class="list-group-item list-group-item-action" :class="{active: tabActive('Paths')}" @click="switchTab('Paths')">
          Ścieżki <i class="icon-error" v-if="tabErrors.Paths"></i>
        </button>
        <button type="button" class="list-group-item list-group-item-action" :class="{active: tabActive('Arma')}" @click="switchTab('Arma')">
          Arma 3 <i class="icon-error" v-if="tabErrors.Arma"></i>
        </button>
      </div>
    </div>
    <div class="tab-content">
      <keep-alive>
        <component :is="currentTabComponent"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import tabsMixin from '@/mixins/tabs';
import Launcher from './components/Launcher';
import Paths from './components/Paths';
import Arma from './components/Arma';

export default {
  name: 'Settings',
  mixins: [tabsMixin],
  data: () => ({
    tabs: ['Launcher', 'Paths', 'Arma'],
    currentTabComponent: 'Paths'
  }),
  methods: {
  },
  components: {Launcher, Paths, Arma},
}
</script>

<style lang="scss" scoped>
  @import '~./Settings.scss';
</style>
