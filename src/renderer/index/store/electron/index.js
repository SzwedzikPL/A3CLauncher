import ElectronStore from 'electron-store';
import Ajv from 'ajv';
import debounce from 'lodash.debounce';

import log from '@/utils/log';
import schema from './schema';

const store = new ElectronStore();

const validator = new Ajv({
  allErrors: true,
  useDefaults: true,
  removeAdditional: 'all',
});

let storeData = store.store;

const validate = validator.compile(schema);

if (!validate(storeData)) {
  const errors = validate.errors;

  // get default store state from validator
  let defaultData = {};
  validate(defaultData);

  const index = (obj, key) => key ? obj[key] : obj;

  for (const error of errors) {
    log.error('App store validation error:', error.dataPath, error.message);

    let path = error.dataPath.split('.');
    const key = path.pop();

    // Get data objects references
    const dataRef = path.reduce(index, storeData);
    const defaultDataRef = path.reduce(index, defaultData);

    dataRef[key] = defaultDataRef[key];
  };

  log.error('Replaced', errors.length, 'invalid app store values with defaults');
}

// Save data in store
store.store = storeData;
log.debug('Loaded app store', store.store);

const updateStore = debounce(state => {
  log.debug('Saving electron store');
  store.store = state.app;
}, 250);

// Update electron store on each vuex store mutation
export function subscriber({type}, state) {
  if (!type.startsWith('app/')) return;
  updateStore(state);
}

export default store;
