
const state = {
  loggedIn: false,
  user: null,
};
const getters = {};
const actions = {
  login({commit}, form) {
    return new Promise((resolve, reject) => {

      setTimeout(() => {
        reject({
          message: 'Błąd połączenia API'
        });
      }, 5000);

    });
  }
};
const mutations = {
  setUser() {

  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
