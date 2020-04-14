import stringtable from '@/stringtable';

const phrases = {
  failedRequest: 'Request failed with status code ',
  requestTimeout: 'timeout of',
  networkError: 'Network Error',
  requestAborted: 'Request aborted',
}

export default function(message) {
    if (message.startsWith(phrases.failedRequest)) {
      const code = message.replace(phrases.failedRequest, '');
      return stringtable.REQUEST_FAIL_CODE(code);
    }

    if (message.startsWith(phrases.requestTimeout))
      return stringtable.REQUEST_TIMEOUT;

    if (message === phrases.networkError)
      return stringtable.NETWORK_ERROR;

    if (message === phrases.requestAborted)
      return stringtable.REQUEST_ABORTED;

    return message;
}
