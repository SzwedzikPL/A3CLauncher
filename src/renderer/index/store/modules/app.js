import arch from 'arch';
import physicalCpuCount from 'physical-cpu-count';

import electronStore from '../electron';
import credentials from '@/utils/credentials';
import stringtable from '@/stringtable';
import {isPathDirectory, isPathFile, steamPath} from '@/utils/path';
import log from '@/utils/log';

const {remote} = require('electron');
const path = require('path');

const validationError = (source, field, message) => ({
  source: source ? `Settings.${source}` : 'Settings',
  params: {field},
  message,
});

export default {
  namespaced: true,
  state: electronStore.store,
  getters: {},
  actions: {
    async parseSettings({commit, dispatch, state}) {
      log.debug('Parsing settings...');
      log.debug('First run:', state.firstRun);

      // Setup default settings on first run
      if (state.firstRun) {
        await dispatch('setupDefaultSettings');
        commit('doneFirstRun');
      }

      await dispatch('validateSettings');
      log.debug('Settings parsed');
    },
    async validateSettings({dispatch, state}) {
      log.debug('Validating settings...');
      // Validate settings
      const errors = [];
      const addError = (tab, field, message) => errors.push({
        source: tab ? `Settings.${tab}` : 'Settings',
        params: {field},
        message,
      });

      // Paths

      // Check is arma exec in install dir
      // Check is mods dir writable
      // Check is missions dir writable
      // Check is ts3 plugins dir writable

      //addError('Paths', 'modsDir', stringtable.CANT_WRITE_DIR);
      //addError('Paths', 'teamspeakPluginsDir', stringtable.CANT_WRITE_DIR);

      // Arma

      //WIP

      // Clear all previous errors from settings
      dispatch('session/clearErrorsFromSource', 'Settings', {root: true});

      // Add new errors if any
      log.debug('Settings validated, errors:', errors.length);
      if (errors.length) dispatch('session/addErrors', errors, {root: true});
    },
    async setupDefaultSettings({commit, state}) {
      log.debug('Setting default settings...');
      const armaSettings = state.settings.arma;

      // Copy all settings options
      const paths = Object.assign({}, state.settings.paths);
      const arma = Object.assign(
        {},
        armaSettings,
        {
          cpuCount: Object.assign({}, armaSettings.cpuCount),
          exThreads: Object.assign({}, armaSettings.exThreads),
          malloc: Object.assign({}, armaSettings.malloc)
        }
      );

      // Setup paths
      if (steamPath) {
        const armaDir = path.join(steamPath, 'steamapps', 'common', 'Arma 3');
        if (await isPathDirectory(armaDir))
          paths.armaDir = armaDir;
      } else log.debug('Missing steamPath');

      if (paths.armaDir)
        paths.modsDir = paths.armaDir;

      const userDocuments = remote.app.getPath('documents');
      const missionsDir = path.join(userDocuments, 'Arma 3', 'missions');
      if (await isPathDirectory(missionsDir))
        paths.missionsDir = missionsDir;

      const appData = remote.app.getPath('appData');
      const teamspeakPluginsDir = path.join(appData, 'TS3Client', 'plugins');
      if (await isPathDirectory(teamspeakPluginsDir))
        paths.teamspeakPluginsDir = teamspeakPluginsDir;

      // Setup arma params
      arma.platform = arch();
      arma.noSplash = true;
      arma.enableHT = true;
      arma.cpuCount.value = physicalCpuCount;

      if (physicalCpuCount >= 4)
        arma.exThreads.value = 7;
      else if (physicalCpuCount == 2)
        arma.exThreads.value = 3;

      commit('setPathSettings', paths);
      commit('setArmaSettings', arma);
      log.debug('Default settings set');
      log.debug('Paths default settings', paths);
      log.debug('Arma default settings', arma);
    },
    async updateSetting({commit, state, dispatch}, setting) {
      let path = setting.key.split('.');
      const key = path.pop();
      let settingObject = state.settings;
      if (!path.every(key => (settingObject = settingObject[key]) !== undefined))
        return;

      commit('updateSetting', {path, key, value: setting.value});

      await dispatch('validateSettings');
    }
  },
  mutations: {
    updateSetting(state, setting) {
      let settingObject = state.settings;
      setting.path.forEach(key => settingObject = settingObject[key]);
      settingObject[setting.key] = setting.value;
    },
    doneFirstRun(state) {
      state.firstRun = false;
    },
    setPathSettings(state, paths) {
      state.settings.paths = paths;
    },
    setArmaSettings(state, arma) {
      state.settings.arma = arma;
    },
    onLogout(state) {
      state.autoLogin = false;

      if (state.lastUsername)
        credentials.delete(state.lastUsername).catch(log.error);
    },
    onLogin(state, form) {
      state.lastUsername = form.username;

      if (state.autoLogin = form.remember)
        credentials.save(form.username, form.password).catch(log.error);
    }
  }
}
