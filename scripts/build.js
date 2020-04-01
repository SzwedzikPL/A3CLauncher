process.env.NODE_ENV = 'production';

const chalk = require('chalk');
const del = require('del');
const {spawn} = require('child_process');
const path = require('path');
const webpack = require('webpack');

const {build} = require('../package.json');
const mainConfig = require('../config/webpack.main.config');
const rendererConfig = require('../config/webpack.renderer.config');

function pack(config) {
  return new Promise((resolve, reject) => {
    config.mode = 'production';
    webpack(config, (error, stats) => {
      if (error) reject(error.stack || error);
      else {
        (stats.hasErrors() ? reject : resolve)(stats.toString({
          chunks: false,
          colors: true
        }));
      }
    });
  });
}

console.log('Clearing output dirs...');

del.sync([
  path.join(mainConfig.output.path, '*'),
  path.join(build.directories.output, '*')
]);

console.log('Building production bundles...\n');

const tasks = [
  {name: 'main', config: mainConfig},
  {name: 'renderer', config: rendererConfig}
].map(task => pack(task.config).then(result => {
    console.log(chalk.yellow.bold('--- Webpack: ' + task.name) + '\n' + result + '\n');
  }).catch(error => {
    console.log(chalk.yellow.bold('--- Webpack: ') + chalk.bgRed.white(task.name) +
    '\n' + chalk.red.bold(error));
    process.exit(1);
  })
);

Promise.all(tasks).then(() => {
  console.log('Building production app...\n');
  process.exit();
});
