import ElectronStore from 'electron-store';
import Ajv from 'ajv';

import log from '@/utils/log';
import schema from './schema';

const store = new ElectronStore();

const validator = new Ajv({
  useDefaults: true,
  removeAdditional: 'all',
});

let data = store.store;

const validate = validator.compile(schema);
const valid = validate(data);

store.store = data;

log.debug('Loaded app store', store.store);
if (!valid) log.debug('App store validation errors', validate.errors);

// Update electron store on each vuex store mutation
export function subscriber({type}, state) {
  if (!type.startsWith('app/')) return;
  log.debug('Updaing electron store');
  store.store = state.app;
}

export default store;
