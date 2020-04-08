import {app, BrowserWindow} from 'electron';

let mainWindow;

if (process.env.NODE_ENV === 'development') {
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
    width: 0,
    height: 0,
    show: false,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true
    },
  });

  if (process.env.NODE_ENV === 'development')
    mainWindow.webContents.openDevTools({mode: 'detach'});

  mainWindow.loadURL(process.env.NODE_ENV === 'development' ?
  'http://localhost:9080' : `file://${__dirname}/index.html`);

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
