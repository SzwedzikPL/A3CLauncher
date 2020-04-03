
const state = {
  loggedIn: false,
  user: null,
};
const getters = {};
const actions = {
  login({commit}, form) {
    return new Promise((resolve, reject) => {

      // Test
      setTimeout(() => {
        commit('setUser', {
          username: 'Gracz1'
        });
        resolve();
      }, 3000);

      // reject({
      //   message: 'Błąd połączenia API'
      // });

    });
  }
};
const mutations = {
  setUser(state, user) {
    state.loggedIn = true;
    state.user = user;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
