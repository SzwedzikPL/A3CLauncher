<template>
  <div>
    <h4>Arma 3</h4>
    <div class="form-group" :class="{'has-error': fieldErrors.armaDir}">
      <label for="armaDir">Katalog instalacji</label>
      <i class="icon-error" v-if="fieldErrors.armaDir"></i>
      <div class="input-group">
        <input type="text" class="form-control" id="armaDir" readonly :value="paths.armaDir">
        <div class="input-group-append">
          <button class="btn btn-secondary" type="button" @click="selectDir('armaDir')">Wybierz</button>
        </div>
        <small class="form-text text-danger" v-for="message in fieldErrors.armaDir" v-text="message" v-if="fieldErrors.armaDir"></small>
      </div>
    </div>
    <div class="form-group" :class="{'has-error': fieldErrors.modsDir}">
      <label for="modsDir">Katalog z modami</label>
      <i class="icon-error"v-if="fieldErrors.modsDir"></i>
      <div class="input-group">
        <input type="text" class="form-control" id="modsDir" readonly :value="paths.modsDir">
        <div class="input-group-append">
          <button class="btn btn-secondary" type="button" @click="selectDir('modsDir')">Wybierz</button>
        </div>
      </div>
      <small class="form-text form-text-error" v-for="message in fieldErrors.modsDir" v-text="message" v-if="fieldErrors.modsDir"></small>
      <small class="form-text text-muted" v-text="$stringtable.PATHS_MODSDIR_DESC"></small>
    </div>
    <div class="form-group" :class="{'has-error': fieldErrors.missionsDir}">
      <label for="missionsDir">Katalog z misjami edytora</label>
      <i class="icon-error" v-if="fieldErrors.missionsDir"></i>
      <div class="input-group">
        <input type="text" class="form-control" id="missionsDir" readonly :value="paths.missionsDir">
        <div class="input-group-append">
          <button class="btn btn-secondary" type="button" @click="selectDir('missionsDir')">Wybierz</button>
        </div>
      </div>
      <small class="form-text form-text-error" v-for="message in fieldErrors.missionsDir" v-text="message" v-if="fieldErrors.missionsDir"></small>
      <small class="form-text text-muted" v-text="$stringtable.PATHS_MISSIONSDIR_DESC"></small>
    </div>
    <h4>TeamSpeak 3</h4>
    <div class="form-group" :class="{'has-error': fieldErrors.teamspeakPluginsDir}">
      <label for="teamspeakPluginsDir">Katalog pluginów</label>
      <i class="icon-error" v-if="fieldErrors.teamspeakPluginsDir"></i>
      <div class="input-group">
        <input type="text" class="form-control" id="teamspeakPluginsDir" readonly :value="paths.teamspeakPluginsDir">
        <div class="input-group-append">
          <button class="btn btn-secondary" type="button" @click="selectDir('teamspeakPluginsDir')">Wybierz</button>
        </div>
      </div>
      <small class="form-text form-text-error" v-for="message in fieldErrors.teamspeakPluginsDir" v-text="message" v-if="fieldErrors.teamspeakPluginsDir"></small>
      <small class="form-text text-muted" v-text="$stringtable.PATHS_TSPLUGINSDIR_DESC"></small>
    </div>
  </div>
</template>

<script>
import settingsMixin from '@/mixins/settings';
import {steamPath, documentsPath, appDataPath} from '@/utils/path';

const selectDirTitles = {
  armaDir: 'Wybierz folder instalacji Arma 3',
  modsDir: 'Wybierz folder modów Arma 3',
  missionsDir: 'Wybierz folder misji edytora Arma 3',
  teamspeakPluginsDir: 'Wybierz folder pluginów TeamSpeak 3',
};

const selectDirDefaultPaths = {
  armaDir: steamPath || '\\',
  modsDir: steamPath || '\\',
  missionsDir: documentsPath,
  teamspeakPluginsDir: appDataPath,
};

export default {
  name: 'Paths',
  mixins: [settingsMixin],
  computed: {
    paths() {
      return this.$store.state.app.settings.paths;
    },
  },
  methods: {
    selectDir(varName) {
      this.selectDirDialog(
        `paths.${varName}`,
        selectDirTitles[varName],
        this.paths[varName] || selectDirDefaultPaths[varName]
      );
    }
  },
  components: {}
}
</script>
