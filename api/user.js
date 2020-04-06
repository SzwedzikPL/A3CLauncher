const crypto = require('crypto');

const userApi = {};
const userStatus = {
  name: 'TestUser',
  color: '#666633',
  avatar: 'https://avatars2.githubusercontent.com/u/8642887',
  rank: 'Użytkownik testowy',
  missions: [
    {
      name: 'Misja 1'
    }
  ],
  permissions: {
    mods: false,
    repository: true
  }
};

// API Login
// On success returns:
// authorization token (linked to user)
// user status
userApi.login = (req, res, setToken) => {
  const fields = req.fields;

  if (!fields || !fields.username || !fields.password) {
    return res.json({
      error: true,
      errorCode: 'LOGIN_ERROR_EMPTY',
      message: 'Nie podano nazwy użytkownika lub hasła',
    });
  }

  if (fields.username !== 'admin' || fields.password !== 'admin') {
    return res.json({
      error: true,
      errorCode: 'LOGIN_ERROR_CREDS',
      message: 'Błędna nazwa użytkownika lub hasło.',
    });
  }

  apiToken = crypto.createHash('md5').update(Date.now().toString()).digest("hex");
  setToken(apiToken);

  res.json({
    error: false,
    token: apiToken,
    user: userStatus
  });
};

// API Login
// On success returns:
// user status
userApi.user = (req, res) => {
  res.json({
    error: false,
    user: userStatus
  });
};

module.exports = userApi;
