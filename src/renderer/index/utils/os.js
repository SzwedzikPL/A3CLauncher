import tasklist from 'tasklist';
import {enumerateValues, HKEY} from 'registry-js';

const path = require('path');

export async function getOSTasks() {
  const status = {
    arma: [],
    armaLauncher: [],
  };
  const tasks = await tasklist({filter: ['IMAGENAME eq arma3*']});
  for (const task of tasks) {
    if (task.imageName === 'arma3.exe' || task.imageName === 'arma3_x64.exe')
      status.arma.push(task.pid);
    else if (task.imageName === 'arma3launcher.exe')
      status.armaLauncher.push(task.pid);
  }

  return status;
}

export function getRegistrySoftwareValue(regPath, name) {
  const values = enumerateValues(HKEY.HKEY_LOCAL_MACHINE, path.join('SOFTWARE', regPath));

  for (const value of values) {
    if (value.name === name) return value.data;
  }

  return null;
}
