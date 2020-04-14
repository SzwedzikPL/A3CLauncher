import axios from 'axios';

import log from '@/utils/log';
import store from '@/store';
import appConfig from '@/config';

import translateError from './translateError';

const {remote} = require('electron');

const send = axios.create({
  baseURL: appConfig.api,
  timeout: 30*1000,
  headers: {
    'Client': remote.app.name,
    'Client-Version': remote.app.getVersion(),
  }
});

function request(params) {
  // Always use currently stored token
  // Useful in development
  const currentToken = store.state.session.apiToken;
  if (currentToken) {
    params.headers = params.headers || {};
    params.headers['Authorization'] = currentToken;
  }

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'development') {
      const delay = fn => arg => setTimeout(() => fn(arg), appConfig.dev.requestDelay);
      resolve = delay(resolve);
      reject = delay(reject);
    }

    log.debug('Sending request to', params.url);
    send(params).then(result => {
      const data = result.data;
      log.debug('Request to', result.config.url, 'responded with status', result.status);
      if (data.error) {
        log.debug('Request error response: ', data);
        return reject(data);
      }
      resolve(data);
    }).catch(error => {
      let message;
      if (error.message) message = error.message;
      else if (error.response) message = error.response.statusText;
      else message = error.toString();

      log.debug('Request to', error.config.url, 'resulted in error:', message);

      reject({message: translateError(message)});
    });
  });
}

const api = {
  login(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return request({
      method: 'post',
      url: '/login/',
      data: formData
    });
  },
  status() {
    return request({
      method: 'get',
      url: '/status/',
    });
  },
  user() {
    return request({
      method: 'get',
      url: '/user/',
    });
  }
};

export default api;
