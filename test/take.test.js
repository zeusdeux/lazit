require('should');

var map = require('../src/esnext/map');
var drop = require('../src/esnext/drop');
var take = require('../src/esnext/take');
var iterate = require('../src/esnext/iterate');

describe('lazit#take', function() {
  it('normal operation check', function() {
    var res;
    var arr = [1, 2, 3, 4];

    res = [...take(2, map(v => ++v, [1, 2, 3, 4]))];
    res.should.eql([2, 3]);

    // dropping from an infinite list and taking from the
    // non dropped items from the resultant infinite list
    res = [...take(1, drop(2, map(v => ++v, [1, 2, 3, 4])))];
    res.should.eql([4]);

    // input iterator mutation check
    res = [...take(2, arr)];
    res.should.eql([1, 2]);
    arr.should.eql([1, 2, 3, 4]); //input array should remain unchanged

    // dropping more elements than in list
    res = [...take(5, arr)];
    res.should.eql([1, 2, 3, 4]);
    arr.should.eql([1, 2, 3, 4]);
  });
  it('auto-curry check', function() {
    var res, m, t, d;

    m = map(v => v * v);
    t = take(4); // auto-curry check
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

    res = [...take(3, customIterator())];
    res.should.eql([1, 'a', 2]);
  });
  it('empty list check', function() {
    var res;

    res = [...take(4, [])];
    res.should.eql([]);
  });
});
