require('should');

var last     = require('../src/esnext/last');
var take    = require('../src/esnext/take');
var iterate = require('../src/esnext/iterate');

describe('lazit#last', function() {
  it('normal operation check', function() {
    var res;

    res = last([1,2,3,4]);
    res.should.eql(4);

    res = last(take(4, iterate(v => v + 1, 0)));
    res.should.eql(3);
  });
  it('custom iterator check', function() {
    var res;

    function* customIterator(){
      yield 'a';
      yield 1;
      yield 'b';
      yield 2;
    }

    res = last(customIterator());
    res.should.eql(2);
  });
  it('empty list check', function() {
    last.bind(null, []).should.throw('Cannot get last of empty list');
  });
});
