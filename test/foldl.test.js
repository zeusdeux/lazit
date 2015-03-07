require('should');

var map     = require('../src/esnext/map');
var take    = require('../src/esnext/take');
var foldl   = require('../src/esnext/foldl');
var repeat  = require('../src/esnext/repeat');
var filter  = require('../src/esnext/filter');
var iterate = require('../src/esnext/iterate');

describe('lazit#foldl', function() {
  it('normal operation check', function() {
    var res;

    res = foldl((acc, el) => acc + el, 0, [1,2,3,4]);
    res.should.eql(10);

    res = foldl((acc, el) => acc + el, 0, map(v => ++v, take(5, iterate(v => v*v, 2))));
    res.should.eql(65819);
  });
  it('auto-curry check', function() {
    var res;
    var m = foldl((a,b) => a+b); // auto-curry check
    var n = foldl((a,b) => 0, 0); // auto-curry check

    res = m(0, take(5, repeat(1)));
    res.should.eql(5);

    res = n([1,2,3,4]);
    res.should.eql(0);
  });
  it('custom iterator check', function() {
    var res;
    var acc = [];

    function* customIterator(){
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

    res = foldl((a,b) => {
      if ('string' === typeof b) {
        a.push(b);
      }
      return a;
    }, acc, delegator());
    res.should.eql([...filter(v => 'string' === typeof v, delegator())]);
    acc.should.eql([]);
  });

  it('empty list check', function() {
    var res;

    res = foldl((a,b) => a+b, 0, []);
    res.should.eql(0);
    res = foldl((a,b) => a+b, 'abcd', []);
    res.should.eql('abcd');
  });
});
