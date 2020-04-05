import electronStore from '../electron';
import credentials from '@/credentials.js';

export default {
  namespaced: true,
  state: electronStore.store,
  getters: {},
  actions: {},
  mutations: {
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
