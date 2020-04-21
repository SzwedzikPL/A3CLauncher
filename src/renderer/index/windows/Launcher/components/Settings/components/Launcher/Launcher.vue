<template>
  <div>
    <h4>Wygląd</h4>
    <div class="form-group" :class="{'has-error': fieldErrors.bgImage}">
      <label for="bgImage">Zdjęcie w tle</label>
      <i class="icon-error"></i>
      <div class="input-group">
        <input type="text" class="form-control" id="bgImage" readonly :value="launcher.bgImage">
        <div class="input-group-append">
          <button class="btn btn-secondary" type="button" @click="selectFile('bgImage')">Wybierz</button>
          <button class="btn btn-secondary" type="button" @click="clearBackgroundImage()">Wyczyść</button>
        </div>
        <small class="form-text text-danger" v-for="message in fieldErrors.bgImage" v-text="message" v-if="fieldErrors.bgImage"></small>
      </div>
    </div>
    <div class="form-group" :class="{'has-error': fieldErrors.bgOpacity}">
      <label for="bgOpacity">Widocznoś tła</label>
      <i class="icon-error"></i>
      <div class="input-group">
        <input type="range" class="form-control-range" min="0" max="1" step="0.01" id="bgOpacity"
        @input="onOpacityInput" @change="onOpacityChange" :value="bgOpacity">
        <span v-text="`${parseInt(bgOpacity*100)}%`"></span>
      </div>
    </div>
  </div>
</template>

<script>
import settingsMixin from '@/mixins/settings';
import {picturesPath} from '@/utils/path';
import appConfig from '@/config';

const path = require('path');

export default {
  name: 'Launcher',
  mixins: [settingsMixin],
  computed: {
    launcher() {
      return this.$store.state.app.settings.launcher;
    },
    bgOpacity() {
      const bgOpacity = this.$store.state.app.settings.launcher.bgOpacity;
      const bgOpacityInput = this.$store.state.session.bgOpacityInput;

      return bgOpacityInput !== null ? bgOpacityInput : bgOpacity;
    }
  },
  methods: {
    onOpacityInput(event) {
      this.$store.commit('session/setBackgroundOpacityInput', event.target.value);
    },
    onOpacityChange(event) {
      this.updateSetting('launcher.bgOpacity', parseFloat(event.target.value));
      this.$store.commit('session/setBackgroundOpacityInput', null);
    },
    selectFile(varName) {
      const defaultPath = this.launcher.bgImage ? path.dirname(this.launcher.bgImage) : picturesPath;
      this.selectFileDialog(`launcher.${varName}`, 'Wybierz zdjęcie tła', defaultPath, [
        {name: 'Grafika', extensions: appConfig.backgroundImageExtensions}
      ]);
    },
    clearBackgroundImage() {
      this.updateSetting('launcher.bgImage', '');
    },
  }
}
</script>
