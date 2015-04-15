require('should');

var map       = require('../src/esnext/map');
var take      = require('../src/esnext/take');
var iterate   = require('../src/esnext/iterate');
var dropWhile = require('../src/esnext/dropWhile');

describe('lazit#dropWhile', function() {
  it('normal operation check', function() {
    var res;
    var arr = [1, 2, 3, 4];

    res = [...dropWhile(v => v < 4, map(v => ++v, [1, 2, 3, 4]))];
    res.should.eql([4, 5]);

    // dropping from an infinite list and taking from the
    // non dropped items from the resultant infinite list
    res = [...take(1, dropWhile(v => v < 10, iterate(v => v + 1, 0)))];
    res.should.eql([10]);

    // input iterator mutation check
    res = [...dropWhile(v => v < 3, arr)];
    res.should.eql([3, 4]);
    arr.should.eql([1, 2, 3, 4]); //input array should remain unchanged

    // dropping more elements than in list
    res = [...dropWhile(v => v < 10, arr)];
    res.should.eql([]);
    arr.should.eql([1, 2, 3, 4]);
  });
  it('auto-curry check', function() {
    var res, m, t, d;

    m = map(v => v * v);
    t = take(4);
    d = dropWhile(v => v < 9); // auto-curry check

    res = [...d(t(m(iterate(v => v + 1, 1))))];
    res.should.eql([9, 16]);
  });
  it('custom iterator check', function() {
    var res;

    function* customIterator() {
      yield 1;
      yield 'a';
      yield 2;
      yield 'b';
    }

    res = [...dropWhile(v => 'number' === typeof v, customIterator())];
    res.should.eql(['a', 2, 'b']);
  });
  it('empty list check', function() {
    var res;

    res = [...dropWhile(() => true, [])];
    res.should.eql([]);
  });
});
