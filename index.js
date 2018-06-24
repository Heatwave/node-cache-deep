// @ts-check
'use strict';

const cloneDeep = require('lodash.clonedeep');

function checkKeyIsString(key) {
  if (typeof key !== 'string') throw new TypeError('cache key must be a string');
}

// use closure and WeakMap for private property
const Cache = (() => {
  const _cache = new WeakMap();
  const _cacheTimeout = new WeakMap();
  const _options = new WeakMap();
  const _statistics = new WeakMap();

  class Cache {

    /**
     * Cache constructor
     *
     * #### Example usage
     *
     * ```javascript
     * // without options
     * const cache = new CacheDeep();
     *
     * // with deepClone options
     * const cache = new CacheDeep({ deepClone: true });
     * ```
     *
     * @param {object} [options={}] cache options setting
     * @param {boolean} [options.deepClone=false] turn on deep clone for cache put or not
     */
    constructor(options) {
      if (!options || typeof options !== 'object') options = {};

      options.deepClone = options.deepClone === true ? true : false;

      _cache.set(this, {});
      _cacheTimeout.set(this, {});
      _options.set(this, {
        deepClone: options.deepClone
      });
      _statistics.set(this, {
        count: 0,
        hit: 0
      });

      this.get = this.get.bind(this);
      this.put = this.put.bind(this);
      this.del = this.del.bind(this);
      this.clear = this.clear.bind(this);
    }

    /**
     * get a cached value by key
     * @param {string} key cache key to get the value
     * @throws {TypeError} when the key is not string
     */
    get(key) {
      checkKeyIsString(key);

      _statistics.get(this).count += 1;

      const result = _cache.get(this)[key] === undefined ? null : _cache.get(this)[key];

      if (result !== null) {
        _statistics.get(this).hit +=1;
      }

      return result;
    }

    /**
     * put a value to the cache by key
     * @param {string} key cache key to save the value to cache
     * @param {*} value the value want to cached
     * @param {number} [ttl] time to live, the cache should be delete after this millisecond, if not given, keep the cache forever
     * @throws {TypeError} when the key is not string
     */
    put(key, value, ttl) {
      checkKeyIsString(key);

      clearTimeout(_cacheTimeout.get(this)[key]);

      if (_options.get(this).deepClone) {
        _cache.get(this)[key] = cloneDeep(value);
      } else {
        _cache.get(this)[key] = value;
      }

      if (typeof ttl === 'number') {
        _cacheTimeout.get(this)[key] = setTimeout(() => {
          _cache.get(this)[key] = null;
        }, ttl);
      }
    }

    /**
     * delete a cached value by key
     * @param {string} key cache key to delete the cache
     * @throws {TypeError} when the key is not string
     */
    del(key) {
      checkKeyIsString(key);
      _cache.get(this)[key] = null;
    }

    /**
     * clear all cached items
     */
    clear() {
      _cacheTimeout.set(this, {});
      _cache.set(this, {});
    }

    statistics() {
      const stat = _statistics.get(this);

      return {
        count: stat.count,
        hit: stat.hit
      };
    }
  }

  return Cache;
})();

module.exports = Cache;
