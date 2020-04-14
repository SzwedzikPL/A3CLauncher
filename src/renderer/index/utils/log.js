import logger from 'electron-log';

const {remote} = require('electron');

const args = remote.process.argv;

const isDev = process.env.NODE_ENV === 'development';
const debugEnabled = isDev || args.includes('-debug');
const infoEnabled = isDev || debugEnabled || args.includes('-logs');

// Disable writing logs to files in dev
if (process.env.NODE_ENV === 'development') {
  logger.transports.file.level = false;
}

function parseArguments(logArguments) {
  return Array.from(logArguments).map(argument => {
    if (typeof argument !== 'object') return argument;
    return JSON.stringify(argument, null, '  ');
  });
}

const log = function() {
  if (!infoEnabled) return;
  logger.info(...parseArguments(arguments));
};

log.debug = function() {
  if (!debugEnabled) return;
  logger.debug(...parseArguments(arguments));
}

log.info = function() {
  if (!infoEnabled) return;
  logger.info(...parseArguments(arguments));
}

log.error = function() {
  logger.error(...parseArguments(arguments));
}

export default log;
