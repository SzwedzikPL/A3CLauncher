import api from '@/api';
import {getOSTasks} from '@/utils/os';

let errorCounter = 0;
let alertCounter = 0;

export default {
  namespaced: true,
  state: {
    loggedIn: false,
    apiToken: null,
    user: null,
    bgOpacityInput: null,
    osTasks: {
      arma: [],
      armaLauncher: []
    },
    errors: [],
    alerts: []
  },
  getters: {
    isArmaRunning(state) {
      return state.osTasks.arma.length > 0
    },
    isArmaLauncherRunning(state) {
      return state.osTasks.armaLauncher.length > 0
    },
    invalidSettings(state) {
      return state.errors.map(error => error.setting).filter(setting => !!setting);
    },
  },
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
    },
    checkOSTasks({commit, state}) {
      return new Promise(async resolve => {
        let tasksChanged = false;
        const tasks = await getOSTasks();

        Object.keys(tasks).forEach(taskName => {
          if (tasksChanged) return;
          const currentTaskPids = tasks[taskName];
          const taskPids = state.osTasks[taskName];

          if (!currentTaskPids.length && !taskPids.length) return;
          if (currentTaskPids.length !== taskPids.length)
            return tasksChanged = true;

          tasksChanged = !currentTaskPids.every((pid, index) => taskPids[index] === pid);
        });

        if (tasksChanged) commit('setOSTasks', tasks);
        resolve();
      });
    },
    addError({commit}, error) {
      const id = errorCounter++;
      commit('addError', Object.assign({}, error, {id}));
      return id;
    },
    addErrors({dispatch}, errors) {
      return errors.map(error => dispatch('addError', error));
    },
    removeError({state, commit}, id) {
      const errorIndex = state.errors.findIndex(error => error.id === id);
      if (errorIndex === -1) return false;

      commit('removeError', errorIndex);
      return true;
    },
    clearErrorsFromSource({state, commit}, source) {
      // Filter out errors from source
      commit('setErrors', state.errors.filter(error => !error.source.startsWith(source)));
    }
  },
  mutations: {
    setBackgroundOpacityInput(state, value) {
      state.bgOpacityInput = value;
    },
    setErrors(state, errors) {
      state.errors = errors;
    },
    addError(state, error) {
      state.errors.push(error);
    },
    removeError(state, index) {
      state.errors.splice(index, 1);
    },
    setUser(state, user) {
      state.loggedIn = user !== null;
      state.user = user;
    },
    setToken(state, token) {
      state.apiToken = token;
    },
    setOSTasks(state, tasks) {
      state.osTasks = tasks;
    },
    addArmaTask(state, pid) {
      state.osTasks.arma.push(pid);
    },
  }
}
