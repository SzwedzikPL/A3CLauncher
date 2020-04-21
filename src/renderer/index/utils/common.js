import log from '@/utils/log';

export function memoize(fn, params) {
  let cache = undefined;

  return () => {
    if (cache !== undefined) {
      if (params.logSource)
        log.debug(params.name, 'Getting result from cache:', params.logResult ? cache : '');
      return cache;
    }

    if (params.logSource) log.debug(params.name, 'Calculating result...');
    cache = fn();
    if (params.logResult) log.debug(params.name, 'Result:', cache);
    return cache;
  }
}

// Add if needed in future
// export function memoizeWithArgs(fn) {
//   const cache = {};
//
//   return function() {
//     const args = Array.from(arguments);
//     const cacheKey = JSON.stringify(args);
//     if (cacheKey in cache) return cache[cacheKey];
//     return cache[cacheKey] = fn.apply({}, args);
//   };
// }
