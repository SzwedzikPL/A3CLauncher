import log from '@/utils/log';

const appName = process.env.PRODUCT_NAME;

// Production config
let config = {
  loginWindow: {
    sizeX: 320,
    sizeY: 370
  },
  launcherWindow: {
    sizeX: 1064,
    sizeY: 640
  },
  links: {
    forum: 'https://arma3coop.pl',
    recovery: 'https://arma3coop.pl/ucp.php?mode=sendpassword',
    feedback: 'https://arma3coop.pl/viewforum.php?f=33'
  },
  credentialsService: appName,
  api: 'https://arma3coop.pl/api',
  osTasksCheckInterval: 2000,
  backgroundImageExtensions: ['jpg', 'jpeg', 'png', 'gif'],
};

// Apply other configs in dev
if (process.env.NODE_ENV === 'development') {
  const merge = require('webpack-merge');
  const devConfig = require('./dev.config.js');
  let localConfig;

  // Local config is optional
  try {
    localConfig = require('./local.config.js');
  } catch(error) {}

  config = merge(config, devConfig, localConfig || {});
}

log.debug('Loaded app config', config);

export default config;
