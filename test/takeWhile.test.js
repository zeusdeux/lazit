require('should');

var map       = require('../src/esnext/map');
var drop      = require('../src/esnext/drop');
var iterate   = require('../src/esnext/iterate');
var takeWhile = require('../src/esnext/takeWhile');

describe('lazit#takeWhile', function() {
  it('normal operation check', function() {
    var res;
    var arr = [1, 2, 3, 4];

    res = [...takeWhile(v => v < 3, map(v => ++v, [1, 2, 3, 4]))];
    res.should.eql([2]);

    // dropping from an infinite list and taking from the
    // non dropped items from the resultant infinite list
    res = [...takeWhile(v => v < 5, drop(2, map(v => ++v, [1, 2, 3, 4])))];
    res.should.eql([4]);

    // input iterator mutation check
    res = [...takeWhile(v => v > 0 && v < 3, arr)];
    res.should.eql([1, 2]);
    arr.should.eql([1, 2, 3, 4]); //input array should remain unchanged

    // dropping more elements than in list
    res = [...takeWhile(() => true, arr)];
    res.should.eql([1, 2, 3, 4]);
    arr.should.eql([1, 2, 3, 4]);
  });
  it('auto-curry check', function() {
    var res, m, t, d;

    m = map(v => v * v);
    t = takeWhile(v => v < 37); // auto-curry check
    d = drop(2);

    res = [...t(d(m(iterate(v => v + 1, 1))))];
    res.should.eql([9, 16, 25, 36]);
  });
  it('custom iterator check', function() {
    var res;

    function* customIterator() {
      yield 1;
      yield 'a';
      yield 2;
      yield 'b';
    }

    res = [...takeWhile(v => 'string' === typeof v, customIterator())];
    res.should.eql([]);
  });
  it('empty list check', function() {
    var res;

    res = [...takeWhile(() => true, [])];
    res.should.eql([]);
  });
});
