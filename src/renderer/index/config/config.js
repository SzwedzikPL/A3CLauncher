import log from '@/log';

const appName = process.env.PRODUCT_NAME;

// Production config
let config = {
  links: {
    forum: 'https://arma3coop.pl',
    recovery: 'https://arma3coop.pl/ucp.php?mode=sendpassword'
  },
  credentialsService: appName,
  api: 'https://arma3coop.pl/api'
};

// Apply other configs in dev
if (process.env.NODE_ENV === 'development') {
  const merge = require('webpack-merge');
  const devConfig = require('./dev.config.js').default;
  let localConfig;

  // Local config is optional
  try {
    localConfig = require('./local.config.js').default;
  } catch(error) {}

  config = merge(config, devConfig, localConfig || {});
}

log.debug('Loaded app config', config);

export default config;
