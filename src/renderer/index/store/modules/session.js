import api from '@/api';

import defaultAvatar from '@/assets/default-avatar.png';

export default {
  namespaced: true,
  state: {
    loggedIn: false,
    apiToken: null,
    user: null,
  },
  getters: {},
  actions: {
    logout({commit}) {
      commit('setUser', null);
      commit('app/onLogout', null, {root: true});
    },
    login({commit, state}, form) {
      return new Promise((resolve, reject) => {
        if (state.loggedIn) return resolve();

        api.login(form.username, form.password)
        .then(data => {
          commit('setUser', data.user);
          commit('setToken', data.token);
          commit('app/onLogin', form, {root: true});

          resolve();
        }).catch(reject);
      });
    },
    init() {
      // Check is api enabled
      return new Promise((resolve, reject) => {
          api.status().then(data => {
            if (!data.enabled) return reject({
              message: data.message
            });

            resolve(data);
          }).catch(reject);
      });
    }
  },
  mutations: {
    setUser(state, user) {
      state.loggedIn = user !== null;
      state.user = user;
    },
    setToken(state, token) {
      state.apiToken = token;
    }
  }
}
