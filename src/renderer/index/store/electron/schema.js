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
      platform: type.string(),
      skipIntro: type.boolean(),
      noSplash: type.boolean(),
      window: type.boolean(),
      enableHT: type.boolean(),
      noLogs: type.boolean(),
      cpuCount: type.object({
        enabled: type.boolean(),
        value: type.number(),
      }),
      exThreads: type.object({
        enabled: type.boolean(),
        value: type.number(),
      }),
      malloc: type.object({
        enabled: type.boolean(),
        value: type.string(),
      }),
    }),
    paths: type.object({
      armaDir: type.string(),
      modsDir: type.string(),
      missionsDir: type.string(),
      teamspeakPluginsDir: type.string(),
    }),
  }),
});

export default schema;
