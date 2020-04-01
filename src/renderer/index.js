import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';

import Vue from 'vue';
import App from './App.vue';

const {enumerateValues, HKEY, RegistryValueType} = require('registry-js');

const Store = require('electron-store');
const log = require('electron-log');

// Test store saving
const store = new Store();
store.set('test', 'store');

// Test reading registry & saving logs
function logRegValues(values, key) {
  log.info(`Key: ${key}`);
  if (!values.length) return log.info('Found none');

  for (const value of values) {
    if (value.type === RegistryValueType.REG_SZ) {
      const stringData = value.data;
      log.info(`Found: ${value.name} = ${stringData}`);
    } else if (value.type === RegistryValueType.REG_DWORD) {
      const numberData = value.data;
      log.info(`Found: ${value.name} = ${numberData}`);
    }
  }
}

const key = 'SOFTWARE\\Valve\\Steam';
const key64 = 'SOFTWARE\\WOW6432Node\\Valve\\Steam';

const values = enumerateValues(HKEY.HKEY_LOCAL_MACHINE, key);
logRegValues(values, key);

const values64 = enumerateValues(HKEY.HKEY_LOCAL_MACHINE, key64);
logRegValues(values64, key64);


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
