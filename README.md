# node-cache-deep

Node.js cache library with deep clone

[![NPM Version](https://img.shields.io/npm/v/cache-deep.svg)](https://npmjs.org/package/cache-deep)
[![Build Status](https://travis-ci.org/Heatwave/node-cache-deep.svg?branch=master)](https://travis-ci.org/Heatwave/node-cache-deep)
[![Coverage Status](https://coveralls.io/repos/github/Heatwave/node-cache-deep/badge.svg?branch=master)](https://coveralls.io/github/Heatwave/node-cache-deep?branch=master)

## Installation

```bash
npm install cache-deep --save
```

> Note: cache-deep requires Node.js version >= 6.x

## Features

1. deep clone option

## Usage

1. normal

```javascript
const CacheDeep = require('cache-deep');
const cache = new CacheDeep();

cache.put('data', 123, 1000 * 60 * 20);   // put 123 to key 'data' and 20 minutes to live
let data = cache.get('data');  // data = 123
cache.del('data');

data = cache.get('data');  // data = null
cache.clear();
```

1. with deep-clone option

```javascript
const CacheDeep = require('cache-deep');
const cache = new CacheDeep({
    deepClone: true
});

let obj = {
  a: 1
};
cache.put('data', obj);
let data = cache.get('data').a;   // data = 1
obj.a = 2;
data = cache.get('data').a;   // data = 1
```

## API

## new CacheDeep([options])

Added in: v1.0.0

Cache constructor

**Param:**

* **options** <Object\> cache config options
    * **deepClone** <boolean\> if true, use the lodash.deepClone to clone to cached value

**Returns:**

instance of cache

```javascript
const CacheDeep = require('cache-deep');
const cache = new CacheDeep({
    deepClone: true
});
```

## put(key, value, ttl)

Added in: v1.0.0

pput a value to the cache by key

**Param:**

* **key** <string\> cache key to save the value to cache
* **value** <*\> the value want to cached
* **ttl** <number\> time to live, the cache should be delete after this millisecond, if not given, keep the cache forever

**Returns:**

undefined

**Throws:**

* **TypeError** when the key is not string

```javascript
cache.put('data', 123, 1000 * 60 * 20);   // put 123 to key 'data' and 20 minutes to live
```

## get(key)

Added in: v1.0.0

get a cached value by key

**Param:**

* **key** <string\> cache key to get the value

**Returns:**

cached value, or null if not hit

**Throws:**

* **TypeError** when the key is not string

```javascript
let data = cache.get('data');
```

## del(key)

Added in: v1.0.0

delete a cached value by key

**Param:**

* **key** <string\> cache key to delete the cache

**Returns:**

undefined

**Throws:**

* **TypeError** when the key is not string

```javascript
cache.del('data');
```

## clear()

Added in: v1.0.0

empty the cache

```javascript
cache.clear();
```

## statistics()

Added in: v1.1.0

get the cache hit rate info

**Returns:**

* <Object\>
  * **count** <number\> count of get cache
  * **hit** <number\> the number of get cache hit the right key

```javascript
const stat = cache.statistics();
const cacheHitRate = stat.hit / stat.count;
```


# License

  [MIT](LICENSE)
