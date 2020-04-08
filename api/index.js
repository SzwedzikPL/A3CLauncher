const userApi = require('./user');
const modsApi = require('./mods');

const baseURL = '/api';

module.exports = app => {
  let apiToken = '';

  const setToken = (token) => {
    apiToken = token;
  };

  const verifyToken = (req, res) => {
    if (req.header('Authorization') !== apiToken) {
      res.json({
        error: true,
        message: 'Niepoprawny token'
      });
      return false;
    }
    return true;
  };

  // API status
  // On success returns:
  // enabled flag
  // message (if enabled is false)
  app.get(baseURL + '/status', (req, res) => {
    res.json({
      error: false,
      enabled: true,
      // message: 'API jest niedostępne'
    });
  });

  app.post(baseURL + '/login', (req, res) => {
    userApi.login(req, res, setToken);
  });

  app.get(baseURL + '/user', (req, res) => {
    if (!verifyToken(req, res)) return;
    userApi.user(req, res);
  });

  app.get(baseURL + '/mods', (req, res) => {
    if (!verifyToken(req, res)) return;
    modsApi.modList(req, res);
  });

  app.get(baseURL + '/mods/:modId', (req, res) => {
    if (!verifyToken(req, res)) return;
    modsApi.mod(req, res);
  });
};
