import Vue from 'vue';
import Vuex from 'vuex';

import log from '@/utils/log';
import {getArmaExecName, getArmaParams} from '@/utils/arma';

import app from './modules/app';
import session from './modules/session';
import {subscriber} from './electron';

const path = require('path');
const {spawn} = require('child_process');

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {app, session},
  actions: {
    launchArma({state, commit, dispatch}, params = {}) {
      return new Promise(resolve => {
        const armaDir = state.app.settings.paths.armaDir;
        const armaSettings = state.app.settings.arma;

        const armaExec = path.join(armaDir, getArmaExecName(armaSettings.platform));
        // TODO: mods
        const armaParams = getArmaParams(Object.assign({}, armaSettings, params));

        log.debug('Launching arma', armaExec, armaParams);
        const armaProcess = spawn(armaExec, armaParams, {detached: true});

        armaProcess.on('error', error => {
          log.error('Arma process error:', error.message);
        });

        if (!armaProcess.pid) {
          log.error('Arma launch failed');
          return resolve(null);
        }

        log.info('Arma launched with pid', armaProcess.pid);
        commit('session/addArmaTask', armaProcess.pid);
        commit('session/ownArmaProcess', true);

        armaProcess.on('close', code => {
          log.info('Arma closed with code', code);
          commit('session/ownArmaProcess', false);

          if (code !== 0) {
            // TODO: Possible error?
            // TODO: Ask user if he want's rpt logs from session?
          }

          dispatch('session/checkOSTasks');
        });

        resolve(armaProcess.pid);
      });
    }
  }
});

// Subscribe electron store to vuex
store.subscribe(subscriber);

export default store;
