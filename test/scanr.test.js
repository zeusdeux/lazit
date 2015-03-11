require('should');

var map     = require('../src/esnext/map');
var take    = require('../src/esnext/take');
var scanr   = require('../src/esnext/scanr');
var repeat  = require('../src/esnext/repeat');
var iterate = require('../src/esnext/iterate');


describe('lazit#scanr', function() {
  it('normal operation check', function() {
    var res;

    res = scanr((el, acc) => el/acc, 1, [1,2,3,4]);
    res.should.eql([0.375,2.6666666666666665,0.75,4.0,1.0]);

    res = scanr((el, acc) => el/acc, 1, map(v => ++v, take(5, iterate(v => v*v, 2))));
    res.should.eql([2601.0793774319063,1.153367338970622e-3,4335.1322957198445,3.9214489525001145e-3,65537.0,1.0]);
  });
  it('auto-curry check', function() {
    var res;
    var m = scanr((a,b) => a+b); // auto-curry check
    var n = scanr((a,b) => 0, 0); // auto-curry check

    res = m(0, take(5, repeat(1)));
    res.should.eql([5,4,3,2,1,0]);

    res = n([1,2,3,4]);
    res.should.eql([0,0,0,0,0]);
  });
  it('custom iterator check', function() {
    var res;
    var acc = [];

    function* customIterator(){
      yield 'a';
      yield 'b';
    }

    function* delegator(){
      yield* customIterator();
      yield 'c';
    }

    res = scanr((a,b) => {
      if ('string' === typeof a) {
       b.unshift(a);
      }
      return b;
    }, acc, delegator());

    res.should.eql([['a','b','c'], ['b','c'], ['c'], []]);
    acc.should.eql([]);
  });

  it('empty list check', function() {
    var res;

    res = scanr((a,b) => a+b, 0, []);
    res.should.eql([0]);
    res = scanr((a,b) => a+b, 'abcd', []);
    res.should.eql(['abcd']);
  });
});
