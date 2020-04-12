import api from '@/api';
import {getOSTasks} from '@/utils/os';

export default {
  namespaced: true,
  state: {
    loggedIn: false,
    apiToken: null,
    user: null,
    osTasks: {
      arma: [],
      armaLauncher: []
    }
  },
  getters: {
    isArmaRunning(state) {
      return state.osTasks.arma.length > 0
    },
    isArmaLauncherRunning(state) {
      return state.osTasks.armaLauncher.length > 0
    }
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
  },
  mutations: {
    setUser(state, user) {
      state.loggedIn = user !== null;
      state.user = user;
    },
    setToken(state, token) {
      state.apiToken = token;
    },
    setOSTasks(state, tasks) {
      state.osTasks = tasks;
    }
  }
}
