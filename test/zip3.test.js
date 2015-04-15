require('should');

var map     = require('../src/esnext/map');
var take    = require('../src/esnext/take');
var zip3    = require('../src/esnext/zip3');
var repeat  = require('../src/esnext/repeat');
var iterate = require('../src/esnext/iterate');


describe('lazit#zip3', function() {
  it('normal operation check', function() {
    var res;

    res = [...zip3([1,2,3], [5,6], [7])];
    res.should.eql([[1,5,7]]);

    res = [...zip3(['a','b','c','d'], [0,1,2,3], map(v => ++v, take(5, iterate(v => v*v, 2))))];
    res.should.eql([['a',0,3], ['b',1,5], ['c',2,17], ['d',3,257]]);

    res = [...zip3(['a','b'], iterate(v => v + 1, 0), [100,200])];
    res.should.eql([['a',0,100], ['b',1,200]]);
  });
  it('auto-curry check', function() {
    var res;
    var z  = zip3(['a',1]); // auto-curry check
    var z2 = z([4,5]);

    res = [...z([20,30], take(5, repeat(1)))];
    res.should.eql([['a',20,1], [1,30,1]]);

    res = [...z2([0])];
    res.should.eql([['a', 4, 0]]);

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

    res = [...zip3(acc, customIterator(), customIterator2())];
    res.should.eql([['dude','a','c'], ['what',1,3]]);
    acc.should.eql(['dude', 'what']);
  });

  it('empty list check', function() {
    var res;

    res = [...zip3([1,2,3], [], [])];
    res.should.eql([]);
    res = [...zip3([], [1,2,3], [])];
    res.should.eql([]);
    res = [...zip3([], [], [1,2,3])];
    res.should.eql([]);
    res = [...zip3([], [])];
    res.should.eql([]);
  });
});
