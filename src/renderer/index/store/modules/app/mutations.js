import log from '@/utils/log';
import credentials from '@/utils/credentials';

export default {
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
};
