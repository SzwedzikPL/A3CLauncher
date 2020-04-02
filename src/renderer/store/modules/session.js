
const state = {
  logged: false,
  user: null,

};
const getters = {};
const actions = {
  login() {
    return new Promise((resolve, reject) => {
      resolve();
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
