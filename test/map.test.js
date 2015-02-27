require('should');

var map     = require('../src/esnext/map');
var take    = require('../src/esnext/take');
var iterate = require('../src/esnext/iterate');

describe('lazit#map', function() {
  it('normal operation check', function() {
    var res;

    res = [...map(v => ++v, [1,2,3,4])];
    res.should.eql([2,3,4,5]);
  });
  it('auto-curry check', function() {
    var res, m;

    m = map(v => v*v); // auto-curry check

    res = [...take(4, m(iterate(v => v+1, 1)))];
    res.should.eql([1,4,9,16]);
  });
  it('custom iterator check', function() {
    var res;

    function* customIterator(){
      yield 1;
      yield 'a';
    }

    res = [...map(v => v+' dude', customIterator())];
    res.should.eql(['1 dude', 'a dude']);
  });
  it('empty list check', function() {
    var res;

    res = [...map(v => ++v, [])];
    res.should.eql([]);
  });
});
