require('should');

var map     = require('../src/esnext/map');
var take    = require('../src/esnext/take');
var span    = require('../src/esnext/span');
var iterate = require('../src/esnext/iterate');

describe('lazit#span', function() {
  it('normal operation check', function() {
    var res;
    var arr = [1, 2, 3, 4];

    res = span(v => v < 4, map(v => ++v, [1, 2, 3, 4]));
    res.should.eql([[2,3],[4, 5]]);

    // input iterator mutation check
    res = span(v => v < 3, arr);
    res.should.eql([[1,2],[3, 4]]);
    arr.should.eql([1, 2, 3, 4]); //input array should remain unchanged

    // dropping more elements than in list
    res = span(v => v < 10, arr);
    res.should.eql([[1,2,3,4], []]);
    arr.should.eql([1, 2, 3, 4]);
  });
  it('auto-curry check', function() {
    var res, m, t, s;

    m = map(v => v * v);
    t = take(4);
    s = span(v => v < 9); // auto-curry check

    res = s(t(m(iterate(v => v + 1, 1))));
    res.should.eql([[1, 4],[9, 16]]);
  });
  it('custom iterator check', function() {
    var res;

    function* customIterator() {
      yield 1;
      yield 'a';
      yield 2;
      yield 'b';
    }

    res = span(v => 'number' === typeof v, customIterator());
    res.should.eql([[1],['a', 2, 'b']]);
  });
  it('empty list check', function() {
    var res;

    res = span(() => true, []);
    res.should.eql([[],[]]);
  });
});
