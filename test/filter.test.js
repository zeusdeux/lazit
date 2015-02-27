require('should');

var filter     = require('../src/esnext/filter');
var take    = require('../src/esnext/take');
var iterate = require('../src/esnext/iterate');

describe('lazit#filter', function() {
  it('normal operation check', function() {
    var res;

    res = [...filter(v => v > 2, [1,2,3,4])];
    res.should.eql([3,4]);

    res = [...filter(v => v > 200, [1,2,3,4])];
    res.should.eql([]);
  });
  it('auto-curry check', function() {
    var res, m;

    m = filter(v => v < 9); // auto-curry check

    res = [...take(5, m(iterate(v => v+1, 1)))];
    res.should.eql([1,2,3,4,5]);
  });
  it('custom iterator check', function() {
    var res;

    function* customIterator(){
      yield 'a';
      yield 1;
      yield 'b';
      yield 2;
    }

    res = [...filter(v => 'string' === typeof v, customIterator())];
    res.should.eql(['a', 'b']);
  });
  it('empty list check', function() {
    var res;

    res = [...filter(v => v > 10, [])];
    res.should.eql([]);
  });
});
