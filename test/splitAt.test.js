require('should');

var map     = require('../src/esnext/map');
var take    = require('../src/esnext/take');
var iterate = require('../src/esnext/iterate');
var splitAt = require('../src/esnext/splitAt');

describe('lazit#splitAt', function() {
  it('normal operation check', function() {
    var res;
    var arr = [1,2,3,4];

    res = splitAt(2, take(4, map(v => ++v, [1,2,3,4])));
    res.should.eql([[2,3],[4,5]]);

    res = splitAt(1, take(1, map(v => ++v, [1,2,3,4])));
    res.should.eql([[2], []]);

    // input iterator mutation check
    res = splitAt(2, arr);
    res.should.eql([[1,2], [3,4]]);
    arr.should.eql([1,2,3,4]); //input array should remain unchanged

    // splitAtping more elements than in list
    res = splitAt(5, arr);
    res.should.eql([[1,2,3,4],[]]);
    arr.should.eql([1,2,3,4]);
  });
  it('auto-curry check', function() {
    var res, m, t, d;

    m = map(v => v*v);
    t = take(4);
    d = splitAt(2); // auto-curry check

    res = d(t(m(iterate(v => v+1, 1))));
    res.should.eql([[1,4], [9,16]]);
  });
  it('custom iterator check', function() {
    var res;

    function* customIterator(){
      yield 1;
      yield 'a';
      yield 2;
      yield 'b';
    }

    res = splitAt(3, customIterator());
    res.should.eql([[1,'a',2], ['b']]);
  });
  it('empty list check', function() {
    var res;

    res = splitAt(4, []);
    res.should.eql([[],[]]);
  });
});
