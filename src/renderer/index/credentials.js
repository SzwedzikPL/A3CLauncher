import keytar from 'keytar';
import appConfig from '@/config.js';

const service = appConfig.credentialsService;

export default {
  get(username) {
    return keytar.getPassword(service, username);
  },
  save(username, password) {
    return keytar.setPassword(service, username, password);
  },
  delete(username) {
    return keytar.deletePassword(service, username);
  }
}
