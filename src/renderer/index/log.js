import logger from 'electron-log';

const isDev = process.env.NODE_ENV === 'development';
const debugEnabled = isDev || process.argv.includes('-debug');
const infoEnabled = isDev || debugEnabled || process.argv.includes('-logs');

// Disable writing logs to files in dev
if (process.env.NODE_ENV === 'development') {
  logger.transports.file.level = false;
}

function parseArguments(logArguments) {
  return Array.from(logArguments).map(argument => {
    if (typeof argument === 'object')
      return JSON.stringify(argument, null, '  ');
    else
      return argument;
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
