# node-cache-deep

Node.js cache library with deep clone

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

## License

  [MIT](LICENSE)
