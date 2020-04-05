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
        .then(result => {
          const data = result.data;

          if (data.error) return reject(data);

          commit('setUser', data.user);
          commit('setToken', data.token);
          commit('app/onLogin', form, {root: true});

          resolve();
        })
        .catch(error => {
          let message = error.message;

          if (error.response) {
            message = error.response.statusText;
          }

          reject({message});
        });
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
