import log from '@/utils/log';
import {memoize} from '@/utils/common';
import {getRegistrySoftwareValue} from '@/utils/os';

const path = require('path');
const fs = require('fs');
const {remote} = require('electron');

const softwareRegDirs = ['WOW6432Node', ''];

export const getSteamPath = memoize(() => {
  for (const dir of softwareRegDirs) {
    const regPath = path.join(dir, 'Valve', 'Steam');
    const value = getRegistrySoftwareValue(regPath, 'InstallPath');
    if (value) {
      log.debug('Found key InstallPath =', value, 'in', regPath);
      return value;
    };
  }

  return null;
}, {name: 'getSteamPath', logSource: true, logResult: true});


export const getArmaPath = memoize(() => {
  // Try Arma 3 regedit catalog
  for (const dir of softwareRegDirs) {
    const regPath = path.join(dir, 'Bohemia Interactive', 'Arma 3');
    const value = getRegistrySoftwareValue(regPath, 'main');
    if (value) {
      log.debug('Found key main =', value, 'in', regPath);
      return value;
    };
  }

  // Try steam catalog
  const steamPath = getSteamPath();
  if (steamPath) return path.join(steamPath, 'steamapps', 'common', 'Arma 3');

  // Out of sensible options
  return null;
}, {name: 'getArmaPath', logSource: true, logResult: true});


export const documentsPath = remote.app.getPath('documents');
log.debug('Documents path =', `"${documentsPath}"`);

export const picturesPath = remote.app.getPath('pictures');
log.debug('Pictures path =', `"${picturesPath}"`);

export const appDataPath = remote.app.getPath('appData');
log.debug('AppData path =', `"${appDataPath}"`);

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
