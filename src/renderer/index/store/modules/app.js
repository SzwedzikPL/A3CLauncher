import arch from 'arch';
import physicalCpuCount from 'physical-cpu-count';

import electronStore from '../electron';
import credentials from '@/credentials.js';
import {isPathDirectory, isPathFile, steamPath} from '@/utils/path';

const {remote} = require('electron');
const path = require('path');

export default {
  namespaced: true,
  state: electronStore.store,
  getters: {},
  actions: {
    async setupDefaultSettings({commit, state}) {
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
      }

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
    }
  },
  mutations: {
    setPathSettings(state, paths) {
      state.settings.paths = paths;
    },
    setArmaSettings(state, arma) {
      state.settings.arma = arma;
    },
    onLogout(state) {
      state.autoLogin = false;

      if (state.lastUsername)
        credentials.delete(state.lastUsername);
    },
    onLogin(state, form) {
      state.lastUsername = form.username;

      if (state.autoLogin = form.remember)
        credentials.save(form.username, form.password);
    }
  }
}
