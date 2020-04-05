const express = require('express');
const formidableMiddleware = require('express-formidable');
const crypto = require('crypto');

module.exports = app => {
  let apiToken = '';

  app.use(formidableMiddleware());

  app.post('/api/login', (req, res) => {
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

    res.json({
      error: false,
      token: apiToken,
      user: {
        name: 'TestUser',
        color: '#666633',
        avatar: 'https://avatars2.githubusercontent.com/u/8642887',
        rank: 'Użytkownik testowy',
      }
    });
  });
};
