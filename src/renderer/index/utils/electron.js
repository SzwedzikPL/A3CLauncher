const {remote} = require('electron');

export const appName = process.env.NODE_ENV === 'development' ? process.env.PRODUCT_NAME : remote.app.name;
export const appVersion = process.env.NODE_ENV === 'development' ? process.env.PRODUCT_VERSION : remote.app.getVersion();
export const appId = process.env.PRODUCT_ID;
