import {enumerateValues, HKEY} from 'registry-js';

import log from '@/utils/log';

const path = require('path');
const fs = require('fs');
const {remote} = require('electron');

function getSteamPath() {
  for (const dir of ['', 'WOW6432Node']) {
    const values = enumerateValues(
      HKEY.HKEY_LOCAL_MACHINE,
      path.join('SOFTWARE', dir, 'Valve', 'Steam')
    );
    for (const value of values) {
      if (value.name === 'InstallPath')
        return value.data;
    }
  }

  return null;
}

export const documentsPath = remote.app.getPath('documents');
log.debug('Documents path =', `"${documentsPath}"`);

export const picturesPath = remote.app.getPath('pictures');
log.debug('Pictures path =', `"${picturesPath}"`);

export const appDataPath = remote.app.getPath('appData');
log.debug('AppData path =', `"${appDataPath}"`);

export const steamPath = getSteamPath();
log.debug('Steam path =', `"${steamPath}"`);

export async function isPathType(type, path) {
  return new Promise(resolve => {
    fs.stat(path, (error, stats) => {
      if (error) return resolve(false);

      if (type === 'dir')
        return resolve(stats.isDirectory());
      if (type === 'file')
        return resolve(stats.isFile());

      resolve(false);
    });
  });
}

export async function isPathDirectory(path) {
  return isPathType('dir', path);
}

export async function isPathFile(path) {
  return isPathType('file', path);
}

export async function isPathWritable(path) {
  return new Promise(resolve => {
    fs.access(path, fs.constants.W_OK, error => {
      if (error) return resolve(false);
      resolve(true);
    });
  });
}
