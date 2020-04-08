export default {
  type: 'object',
  properties: {
    lastUsername: {
      type: 'string',
      default: '',
    },
    autoLogin: {
      type: 'boolean',
      default: false,
    },
    launcherSize: {
      type: 'object',
      properties: {
        x: {
          type: 'number',
          default: 0
        },
        y: {
          type: 'number',
          default: 0
        },
      },
      default: {},
      required: ['x', 'y'],
    },
    settings: {
      type: 'object',
      properties: {
        paths: {
          type: 'object',
          properties: {
            armaDir: {
              type: 'string',
              default: '',
            },
            armaExec: {
              type: 'string',
              default: '',
            },
            modsDir: {
              type: 'string',
              default: '',
            },
            missionsDir: {
              type: 'string',
              default: '',
            },
            teamspeakPluginsDir: {
              type: 'string',
              default: '',
            },
          },
          default: {},
          required: ['armaDir', 'armaExec', 'modsDir', 'missionsDir', 'teamspeakPluginsDir']
        },
      },
      default: {},
      required: ['paths']
    },
  },
  default: {},
  required: ['lastUsername', 'autoLogin', 'launcherSize', 'settings'],
}
