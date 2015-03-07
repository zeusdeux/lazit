require('should');

var map     = require('../src/esnext/map');
var take    = require('../src/esnext/take');
var foldl1  = require('../src/esnext/foldl1');
var repeat  = require('../src/esnext/repeat');
var filter  = require('../src/esnext/filter');
var iterate = require('../src/esnext/iterate');

describe('lazit#foldl1', function() {
  it('normal operation check', function() {
    var res;

    res = foldl1((acc, el) => acc + el, [1,2,3,4]);
    res.should.eql(10);

    res = foldl1((acc, el) => acc + el, map(v => ++v, take(5, iterate(v => v*v, 2))));
    res.should.eql(65819);
  });
  it('auto-curry check', function() {
    var res;
    var m = foldl1((a,b) => a+b); // auto-curry check

    res = m(take(5, repeat(1)));
    res.should.eql(5);
  });
  it('custom iterator check', function() {
    var res;
    var acc = [];

    function* customIterator(){
      yield acc;
      yield 'a';
      yield 1;
      yield 'b';
      yield 2;
    }

    function* delegator(){
      yield* customIterator();
      yield 'c';
      yield 3;
      return 4;
    }

    res = foldl1((a,b) => {
      if ('string' === typeof b) {
        a.push(b);
      }
      return a;
    }, delegator());
    res.should.eql([...filter(v => 'string' === typeof v, delegator())]);
    acc.should.eql([]);
  });

  it('empty list check', function() {
    foldl1.bind(null, (a,b) => a+b, []).should.throw('Cannot apply foldl1 to an empty list');
  });
});
