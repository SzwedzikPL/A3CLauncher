import {app, BrowserWindow} from 'electron';

let mainWindow;
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

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 450,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true
    }
  });


  if (isDev) mainWindow.webContents.openDevTools({mode: 'detach'});

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
