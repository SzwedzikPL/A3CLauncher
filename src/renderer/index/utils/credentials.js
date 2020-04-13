import keytar from 'keytar';
import appConfig from '@/config';

const service = appConfig.credentialsService;

export default {
  get(username) {
    return new Promise((resolve, reject) => {
      keytar.getPassword(service, username).then(resolve).catch(() => {
        reject('Error getting credentials', service, username);
      });
    });
  },
  save(username, password) {
    return new Promise((resolve, reject) => {
      keytar.setPassword(service, username, password).then(resolve).catch(() => {
        reject('Error saving credentials', service, username);
      });
    });
  },
  delete(username) {
    return new Promise((resolve, reject) => {
      keytar.deletePassword(service, username).then(resolve).catch(() => {
        reject('Error deleting credentials', service, username);
      });
    });
  }
}
