// @ts-check
'use strict';

const Cache = require('./index.js');
const should = require('chai').should();

describe('Cache', () => {
  describe('basic', () => {
    /**
     * @type {Cache}
     */
    let cache;

    beforeEach(() => {
      cache = new Cache();
    });

    it('should put a value and get it success', () => {
      cache.put('test', 1);
      should.equal(cache.get('test'), 1);
    });

    it('should return null if do not hit the cache', () => {
      should.equal(null, cache.get('qweasdzxc'));
    });

    it('should delete cache success', () => {
      cache.put('test', 1);
      cache.del('test');
      should.equal(null, cache.get('test'));
    });

    it('should accept a string as get method key', () => {
      // @ts-ignore
      (() => cache.get(1)).should.throw(TypeError);
    });

    it('should accept a string as put method key', () => {
      // @ts-ignore
      (() => cache.put(1)).should.throw(TypeError);
    });

    it('should accept a string as del method key', () => {
      // @ts-ignore
      (() => cache.del(1)).should.throw(TypeError);
    });

    it('should clear all cached items', () => {
      cache.put('test', 1);
      should.equal(1, cache.get('test'));
      cache.clear();
      should.equal(null, cache.get('test'));
    });

  });

  describe('cache with ttl', () => {
    /**
     * @type {Cache}
     */
    let cache;

    beforeEach(() => {
      cache = new Cache();
    });

    it('should be null after ttl', done => {
      cache.put('test', 1, 100);
      should.equal(cache.get('test'), 1);
      setTimeout(() => {
        should.equal(null, cache.get('test'));
        done();
      }, 200);
    });

    it('should clear timeout after put new value', done => {
      cache.put('test', 1, 100);
      cache.put('test', 2);
      setTimeout(() => {
        should.equal(2, cache.get('test'));
        done();
      }, 200);
    });

  });

  describe('with no deepClone enabled', () => {
    /**
     * @type {Cache}
     */
    let cache;

    beforeEach(() => {
      cache = new Cache();
    });

    it('should save the reference', () => {
      let obj = {
        a: 1
      };
      cache.put('test', obj);
      should.equal(1, cache.get('test').a);
      obj.a = 2;
      should.equal(2, cache.get('test').a);
    });

  });

  describe('with deepClone is true', () => {

    /**
     * @type {Cache}
     */
    let cache;

    beforeEach(() => {
      cache = new Cache({
        deepClone: true
      });
    });

    it('should save the clone obj', () => {
      let obj = {
        a: 1
      };
      cache.put('test', obj);
      should.equal(1, cache.get('test').a);
      obj.a = 2;
      should.equal(1, cache.get('test').a);
    });

  });

  describe('statistics', () => {
    /**
     * @type {Cache}
     */
    let cache;

    beforeEach(() => {
      cache = new Cache({
        deepClone: true
      });
    });

    it('should get count and hit right', () => {
      let stat = cache.statistics();
      should.equal(0, stat.count);
      should.equal(0, stat.hit);

      cache.put('test', 1);
      cache.get('data');

      stat = cache.statistics();
      should.equal(1, stat.count);
      should.equal(0, stat.hit);

      cache.get('test');

      stat = cache.statistics();
      should.equal(2, stat.count);
      should.equal(1, stat.hit);
    });
  });
});
