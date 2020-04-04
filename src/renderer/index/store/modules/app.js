import electronStore from '../electron';

const state = electronStore.store;
const getters = {};
const actions = {};
const mutations = {
  setTest (state, payload) {
    state.test = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
