import {app, BrowserWindow} from 'electron';

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  app.on('ready', () => {
    const installExtension = require('electron-devtools-installer');
    installExtension.default(installExtension.VUEJS_DEVTOOLS)
      .then(() => {
        require('devtron').install();
      })
      .catch(error => console.log('Unable to install `vue-devtools`: \n', error));
  });
}

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (isDev) mainWindow.webContents.openDevTools();

  mainWindow.loadURL(isDev ? 'http://localhost:9080' : `file://${__dirname}/index.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
