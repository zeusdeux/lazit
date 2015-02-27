require('should');

var concat     = require('../src/esnext/concat');
var take    = require('../src/esnext/take');
var repeat = require('../src/esnext/repeat');

describe('lazit#concat', function() {
  it('normal operation check', function() {
    var res;

    res = [...concat([1,2,3,4], [5,6,7,8])];
    res.should.eql([1,2,3,4,5,6,7,8]);
  });
  it('auto-curry check', function() {
    var res, c;

    c = concat([...take(4, repeat('a'))]); // auto-curry check

    res = [...c([1,2,3,4])];
    res.should.eql(['a','a','a','a',1,2,3,4]);
  });
  it('custom iterator check', function() {
    var res;

    function* customIterator(){
      yield 1;
      yield 'a';
      yield 'b';
      yield 10;
    }

    res = [...concat(['x'], customIterator())];
    res.should.eql(['x', 1, 'a', 'b', 10]);
  });
  it('empty list check', function() {
    var res;

    res = [...concat([],[])];
    res.should.eql([]);

    res = [...concat([], [1])];
    res.should.eql([1]);

    res = [...concat([1], [])];
    res.should.eql([1]);
  });
});
