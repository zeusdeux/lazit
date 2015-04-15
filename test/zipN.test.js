require('should');

var map     = require('../src/esnext/map');
var zipN    = require('../src/esnext/zipN');
var take    = require('../src/esnext/take');
var iterate = require('../src/esnext/iterate');


describe('lazit#zipN', function() {
  it('normal operation check', function() {
    var res;

    res = [...zipN([1,2,3], [5,6], [7])];
    res.should.eql([[1,5,7]]);

    res = [...zipN(['a','b','c','d'], [0,1,2,3], map(v => ++v, take(5, iterate(v => v*v, 2))))];
    res.should.eql([['a',0,3], ['b',1,5], ['c',2,17], ['d',3,257]]);

    res = [...zipN(['a','b'], iterate(v => v + 1, 0), [100,200])];
    res.should.eql([['a',0,100], ['b',1,200]]);

    res = [...zipN([1,2,3])];
    res.should.eql([[1], [2], [3]]);

    res = [...zipN([1,2,3], [2,3,4], [3,4,5], [4,5,6], [5,6,7])];
    res.should.eql([[1,2,3,4,5], [2,3,4,5,6], [3,4,5,6,7]]);
  });
  it('cannot auto-curry since zipN is variadic so no check. yay! \\o/', function() {
  });
  it('custom iterator check', function() {
    var res;
    var acc = ['dude', 'what'];

    function* customIterator(){
      yield 'a';
      yield 1;
      yield 'b';
      yield 2;
    }

    function* customIterator2(){
      yield 'c';
      yield 3;
      return 4;
    }

    res = [...zipN(acc, customIterator(), customIterator2())];
    res.should.eql([['dude','a','c'], ['what',1,3]]);
    acc.should.eql(['dude', 'what']);
  });

  it('empty list check', function() {
    var res;

    res = [...zipN([1,2,3], [], [])];
    res.should.eql([]);
    res = [...zipN([], [1,2,3], [])];
    res.should.eql([]);
    res = [...zipN([], [], [1,2,3])];
    res.should.eql([]);
    res = [...zipN([], [])];
    res.should.eql([]);
    res = [...zipN([])];
    res.should.eql([]);
  });
});
