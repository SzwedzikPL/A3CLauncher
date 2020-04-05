import axios from 'axios';
import store from '@/store';
import appConfig from '@/config.js';

const request = axios.create({
  baseURL: appConfig.api,
});

//store.state.session.apiToken;

const api = {
  login(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return request.post('/login/', formData);
  }
};

export default api;
