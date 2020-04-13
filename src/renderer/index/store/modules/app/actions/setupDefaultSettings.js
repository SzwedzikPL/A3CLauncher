import arch from 'arch';
import physicalCpuCount from 'physical-cpu-count';

import log from '@/utils/log';
import {isPathDirectory, steamPath, documentsPath, appDataPath} from '@/utils/path';

const path = require('path');

export default async function setupDefaultSettings({commit, state}) {
  log.debug('Setting default settings...');
  const armaSettings = state.settings.arma;

  // Copy all settings options
  const paths = Object.assign({}, state.settings.paths);
  const arma = Object.assign(
    {},
    armaSettings,
    {
      cpuCount: Object.assign({}, armaSettings.cpuCount),
      exThreads: Object.assign({}, armaSettings.exThreads),
      malloc: Object.assign({}, armaSettings.malloc)
    }
  );

  // Setup paths
  if (steamPath) {
    const armaDir = path.join(steamPath, 'steamapps', 'common', 'Arma 3');
    if (await isPathDirectory(armaDir))
      paths.armaDir = armaDir;
  } else log.debug('Missing steamPath');

  if (paths.armaDir)
    paths.modsDir = paths.armaDir;

  const missionsDir = path.join(documentsPath, 'Arma 3', 'missions');
  if (await isPathDirectory(missionsDir))
    paths.missionsDir = missionsDir;

  const teamspeakPluginsDir = path.join(appDataPath, 'TS3Client', 'plugins');
  if (await isPathDirectory(teamspeakPluginsDir))
    paths.teamspeakPluginsDir = teamspeakPluginsDir;

  // Setup arma params
  arma.platform = arch();
  arma.noSplash = true;
  arma.enableHT = true;
  arma.cpuCount.value = physicalCpuCount;

  if (physicalCpuCount >= 4)
    arma.exThreads.value = 7;
  else if (physicalCpuCount == 2)
    arma.exThreads.value = 3;

  commit('setPathSettings', paths);
  commit('setArmaSettings', arma);
  log.debug('Default settings set');
  log.debug('Paths default settings', paths);
  log.debug('Arma default settings', arma);
}
