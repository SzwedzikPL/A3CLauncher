const chalk = require('chalk');
const fs = require('fs');
const electron = require('electron');
const path = require('path');
const {spawn} = require('child_process');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackHotMiddleware = require('webpack-hot-middleware');
const formidableMiddleware = require('express-formidable');

const packageConfig = require('../package.json');
const mainConfig = require('../config/webpack.main.config');
const rendererConfig = require('../config/webpack.renderer.config');

let electronProcess = null;
let electronProcessRestart = false;
let hotMiddleware;

function logError(data) {
  console.log(chalk.red.bold(data));
}

function logStats(proc, data) {
  let log = '\n' + chalk.yellow.bold('--- Webpack: ' + proc) + '\n';

  if (typeof data === 'object') {
    log += data.toString({
      colors: true,
      chunks: false
    });
  } else {
    log += data;
  }

  console.log(log);
}

function startRenderer () {
  return new Promise((resolve, reject) => {
    rendererConfig.mode = 'development';
    const compiler = webpack(rendererConfig);
    hotMiddleware = webpackHotMiddleware(compiler, {
      log: false,
      heartbeat: 2500
    });

    let server, serverReloading = false;
    function initServer() {
      if (serverReloading) return;
      serverReloading = true;
      server = new WebpackDevServer(
        compiler,
        {
          contentBase: path.join(__dirname, '../dist'),
          quiet: true,
          clientLogLevel: 'error',
          before(app, ctx) {
            serverApp = app;
            app.use(hotMiddleware);
            app.use(formidableMiddleware());
            ctx.middleware.waitUntilValid(() => resolve());

            // Load current api
            delete require.cache[require.resolve('../api')];
            require('../api')(app);
          }
        }
      );
      server.listen(9080, '127.0.0.1', () => {
        console.log('Server online');
        serverReloading = false;
      });
    }

    compiler.hooks.done.tap('done', stats => {
      logStats('Renderer', stats);
    });

    initServer();

    fs.watch('api', (eventType, filename) => {
      // Api changed, reload server
      if (!server || !server.close || serverReloading) return;
      console.log('Restarting server...');
      server.close(() => {
        initServer();
      });
    });
  });
}

function startMain () {
  return new Promise((resolve, reject) => {
    mainConfig.mode = 'development';
    const compiler = webpack(mainConfig);

    compiler.hooks.watchRun.tapAsync('watch-run', (compilation, done) => {
      hotMiddleware.publish({ action: 'compiling' });
      done();
    });

    compiler.watch({}, (error, stats) => {
      if (error) return logError(error);

      logStats('Main', stats);

      if (electronProcess && electronProcess.kill) {
        console.log('\nRestarting electron...');
        electronProcessRestart = true;
        process.kill(electronProcess.pid);
        electronProcess = null;
      }

      resolve();
    });
  })
}

function startElectron() {
  electronProcess = spawn(electron, [
    '--inspect=5858',
    path.join(__dirname, '..', packageConfig.main)
  ]);
  electronProcessRestart = false;
  console.log('\n' + chalk.yellow.bold('--- Electron process output'));

  electronProcess.stdout.on('data', data => console.log(data.toString()));
  electronProcess.stderr.on('data', data => logError(data.toString()));
  electronProcess.on('close', () => {
    if (!electronProcessRestart) process.exit();
    else startElectron();
  });
}

Promise.all([startRenderer(), startMain()]).then(startElectron).catch(logError);
