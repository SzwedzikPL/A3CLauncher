import axios from 'axios';

import log from '@/utils/log';

const fs = require('fs');
const path = require('path');
const StreamSpeed = require('streamspeed');

const httpAdapter = require('axios/lib/adapters/http');

export function downloadTestPBO () {
  const url = 'http://reborn.arma3coop.pl/repo/test.pbo';

  log.debug('Requesting file', url);
  axios({
    url,
    method: 'GET',
    responseType: 'stream',
    adapter: httpAdapter,
  }).then(response => {
    const {status, headers} = response;

    log.debug('Request response', status, headers);

    const totalLength = response.headers['content-length'];

    log.debug('Downloading file', url);

    const streamSpeed = new StreamSpeed();
    let currentSpeed = '0';

    const writer = fs.createWriteStream(
      path.resolve(process.env.DIST_PATH, 'test.pbo')
    );
    streamSpeed.add(response.data);

    streamSpeed.on('speed', (speed) => {
      currentSpeed = StreamSpeed.toHuman(speed, {timeUnit: 's'});
    });

    let downloadedLength = 0;

    response.data.on('data', chunk => {
      downloadedLength += chunk.length;
      log.debug(downloadedLength, '/', totalLength, '@', currentSpeed);
    });
    response.data.pipe(writer);

    writer.on('finish', () => {
      log.debug('Download finished');
    });
    writer.on('error', error => {
      log.debug('Download error', error);
    });

  }).catch(error => {
    console.log(error);
    log.debug('Request error', error);
  });
}
