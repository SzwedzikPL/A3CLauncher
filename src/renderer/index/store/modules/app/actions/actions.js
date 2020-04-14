import log from '@/utils/log';

import validateSettings from './validateSettings';

export default {
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
};
