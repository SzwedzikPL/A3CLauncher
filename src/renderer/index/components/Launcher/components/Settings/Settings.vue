<template>
  <div class="tab-settings">
    <div class="tab-navigation">
      <div class="list-group">
        <button type="button" class="list-group-item list-group-item-action" :class="{active: tabActive('Paths')}" @click="switchTab('Paths')">
          Ścieżki <i class="fa fa-exclamation-triangle" style="color: #d81818;text-shadow: none;"></i>
        </button>
        <button type="button" class="list-group-item list-group-item-action" :class="{active: tabActive('ArmaParams')}" @click="switchTab('ArmaParams')">
          Parametry Arma 3
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
import Paths from './components/Paths';
import ArmaParams from './components/ArmaParams';

export default {
  name: 'Settings',
  mixins: [tabsMixin],
  data: () => ({
    currentTabComponent: 'Paths'
  }),
  methods: {
    
  },
  components: {Paths, ArmaParams},
}
</script>

<style lang="scss" scoped>
  @import '~./Settings.scss';
</style>
