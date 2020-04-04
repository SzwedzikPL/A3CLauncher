import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import session from './modules/session';

import {subscriber} from './electron';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {app, session}
});

// Subscribe electron store to vuex
store.subscribe(subscriber);

export default store;
