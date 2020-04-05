
const appName = process.env.PRODUCT_NAME;
const config = {
  links: {
    forum: 'https://arma3coop.pl',
    recovery: 'https://arma3coop.pl/ucp.php?mode=sendpassword'
  },
  credentialsService: appName,
  api: '/api'
};

if (process.env.NODE_ENV === 'production') {
  config.api = 'https://arma3coop.pl/api';
} else {

}

export default config;
