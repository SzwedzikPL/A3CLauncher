import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import session from './modules/session';

import {subscriber} from './electron';

import {getArmaExecName, getArmaParams} from '@/utils/arma';

const path = require('path');
const {spawn} = require('child_process');

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {app, session},
  actions: {
    async parseSettings({commit, dispatch, state}) {
      const settings = state.app.settings;

      // Setup default settings on first run
      if (Object.values(settings.paths).every(value => value === '')) {
        await dispatch('app/setupDefaultSettings');
      }

      await dispatch('validateSettings');
    },
    async validateSettings({commit, state}) {

    },
    launchArma({state}) {
      const armaDir = state.app.settings.paths.armaDir;
      const armaSettings = state.app.settings.arma;

      const armaProc = spawn(
        path.join(armaDir, getArmaExecName(armaSettings.platform)),
        getArmaParams(armaSettings),
        {
          detached: true
        }
      );

      armaProc.on('close', code => {
        if (code !== 0) {
          // TODO: Possible error?
          // TODO: Ask user if he want's rpt logs from session?
        }
      });
    }
  }
});

// Subscribe electron store to vuex
store.subscribe(subscriber);

export default store;
