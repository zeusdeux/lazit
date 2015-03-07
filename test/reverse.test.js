require('should');

var map    = require('../src/esnext/map');
var take    = require('../src/esnext/take');
var iterate = require('../src/esnext/iterate');
var reverse = require('../src/esnext/reverse');

describe('lazit#reverse', function() {
  it('normal operation check', function() {
    var res;

    res = reverse([1,2,3,4]);
    res.should.eql([4,3,2,1]);

    res = reverse(map(v => ++v, take(5, iterate(v => v*v, 2))));
    res.should.eql([65537, 257, 17, 5, 3]);
  });
  it('custom iterator check', function() {
    var res;

    function* customIterator(){
      yield 'a';
      yield 1;
      yield 'b';
      yield 2;
    }

    function* delegator(){
      yield* customIterator();
      yield 'c';
      yield 3;
      return 4;
    }

    res = reverse(delegator());
    res.should.eql([3,'c',2,'b',1,'a']);
  });

  it('empty list check', function() {
    var res;

    res = reverse([]);
    res.should.eql([]);
  });
});
