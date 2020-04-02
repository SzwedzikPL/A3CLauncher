const ElectronStore = require('electron-store');

const store = new ElectronStore({
  // schema: {
  //
  // }
});

// Update electron store on each vuex store mutation
export function subscriber(mutation, state) {
  store.store = state.app;
}

export default store;
