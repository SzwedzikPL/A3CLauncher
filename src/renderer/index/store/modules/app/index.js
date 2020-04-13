import electronStore from '@/store/electron';

import actions from './actions';
import mutations from './mutations';

export default {
  namespaced: true,
  state: electronStore.store,
  getters: {},
  actions,
  mutations,
}
