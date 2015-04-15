require('should');

var zip     = require('../src/esnext/zip');
var map     = require('../src/esnext/map');
var take    = require('../src/esnext/take');
var repeat  = require('../src/esnext/repeat');
var iterate = require('../src/esnext/iterate');


describe('lazit#zip', function() {
  it('normal operation check', function() {
    var res;

    res = [...zip([1,2,3], [5,6])];
    res.should.eql([[1,5], [2,6]]);

    res = [...zip([0,1,2,3], map(v => ++v, take(5, iterate(v => v*v, 2))))];
    res.should.eql([[0,3], [1,5], [2,17], [3,257]]);

    res = [...zip(['a','b'], iterate(v => v + 1, 0))];
    res.should.eql([['a',0], ['b',1]]);
  });
  it('auto-curry check', function() {
    var res;
    var z = zip(['a',1]); // auto-curry check

    res = [...z(take(5, repeat(1)))];
    res.should.eql([['a',1], [1,1]]);

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

    function* customIterator2(){
      yield 'c';
      yield 3;
      return 4;
    }

    res = [...zip(customIterator(), customIterator2())];
    res.should.eql([['a','c'], [1,3]]);
    acc.should.eql([]);
  });

  it('empty list check', function() {
    var res;

    res = [...zip([1,2,3], [])];
    res.should.eql([]);
    res = [...zip([], [])];
    res.should.eql([]);
    res = [...zip([], [1,2,3])];
    res.should.eql([]);
  });
});
