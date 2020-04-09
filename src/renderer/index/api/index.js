import axios from 'axios';
import store from '@/store';
import appConfig from '@/config';

const {remote} = require('electron');

const send = axios.create({
  baseURL: appConfig.api,
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
      const promiseResolve = resolve, promiseReject = reject;
      resolve = arg => setTimeout(() => promiseResolve(arg), appConfig.dev.requestDelay);
      reject = arg => setTimeout(() => promiseReject(arg), appConfig.dev.requestDelay);
    }

    send(params).then(result => {
      const data = result.data;
      if (data.error) return reject(data);
      resolve(data);
    }).catch(error => {
      let message;
      if (error.message) message = error.message;
      else if (error.response) message = error.response.statusText;
      else message = error.toString();

      reject({message});
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
