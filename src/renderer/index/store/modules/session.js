import axios from 'axios';


const defaultAvatar = require('@/assets/default-avatar.png').default;
const state = {
  loggedIn: false,
  user: null,
};

const getters = {};
const actions = {
  login({commit}, form) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('username', form.username);
      formData.append('password', form.password);

      axios.post('https://arma3coop.pl/api/login/', formData)
      .then(result => {
        const data = result.data;

        if (data.error) return reject(data);

        commit('setUser', data.user);
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
