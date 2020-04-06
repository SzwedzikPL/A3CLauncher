import logger from 'electron-log';

const isDev = process.env.NODE_ENV === 'development';
const debugEnabled = isDev || process.argv.includes('-debug');
const infoEnabled = isDev || debugEnabled || process.argv.includes('-logs');

// Disable writing logs to files in dev
if (process.env.NODE_ENV === 'development') {
  logger.transports.file.level = false;
}

const log = function() {
  if (!infoEnabled) return;
  logger.info(...arguments);
};

log.debug = function() {
  if (!debugEnabled) return;
  logger.debug(...arguments);
}

log.info = function() {
  if (!infoEnabled) return;
  logger.info(...arguments);
}

log.error = function() {
  logger.error(...arguments);
}

export default log;
