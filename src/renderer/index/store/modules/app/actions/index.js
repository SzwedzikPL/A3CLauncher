import log from '@/utils/log';

import validateSettings from './validateSettings';
import setupDefaultSettings from './setupDefaultSettings';

export default {
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
  async updateSetting({commit, state, dispatch}, setting) {
    log.debug('Updaing setting', setting.key);
    let path = setting.key.split('.');
    const key = path.pop();
    let settingObject = state.settings;
    if (!path.every(key => (settingObject = settingObject[key]) !== undefined))
      return;

    commit('updateSetting', {path, key, value: setting.value});

    await dispatch('validateSettings');
  },
  validateSettings,
  setupDefaultSettings,
};
