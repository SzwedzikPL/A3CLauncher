import arch from 'arch';
import physicalCpuCount from 'physical-cpu-count';

import {steamPath, documentsPath, appDataPath} from '@/utils/path';

const path = require('path');

const armaDir = steamPath ? path.join(steamPath, 'steamapps', 'common', 'Arma 3') : '';
const missionsDir = path.join(documentsPath, 'Arma 3', 'missions');
const teamspeakPluginsDir = path.join(appDataPath, 'TS3Client', 'plugins');
const exThreads = physicalCpuCount >= 4 ? 7 : (physicalCpuCount == 2 ? 3 : 0);

const type = {};
[['string', ''], ['boolean', false], ['number', 0]].forEach(typeData => {
  type[typeData[0]] = (defaultValue = typeData[1]) => ({
    type: typeData[0],
    default: defaultValue,
  });
});
type.object = props => ({
  type: 'object',
  properties: props,
  default: {},
  required: Object.keys(props),
});

const schema = type.object({
  lastUsername: type.string(),
  autoLogin: type.boolean(),
  launcherSize: type.object({
    x: type.number(),
    y: type.number(),
  }),
  settings: type.object({
    arma: type.object({
      platform: type.string(arch()),
      skipIntro: type.boolean(),
      noSplash: type.boolean(true),
      window: type.boolean(),
      enableHT: type.boolean(true),
      noLogs: type.boolean(),
      cpuCount: type.object({
        enabled: type.boolean(),
        value: type.number(physicalCpuCount),
      }),
      exThreads: type.object({
        enabled: type.boolean(),
        value: type.number(exThreads),
      }),
      malloc: type.object({
        enabled: type.boolean(),
        value: type.string(),
      }),
    }),
    paths: type.object({
      armaDir: type.string(armaDir),
      modsDir: type.string(armaDir),
      missionsDir: type.string(missionsDir),
      teamspeakPluginsDir: type.string(teamspeakPluginsDir),
    }),
    launcher: type.object({
      bgImage: type.string(),
      bgOpacity: type.number(0.12),
    }),
  }),
});

export default schema;
