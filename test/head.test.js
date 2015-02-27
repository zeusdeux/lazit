require('should');

var head     = require('../src/esnext/head');
var iterate = require('../src/esnext/iterate');

describe('lazit#head', function() {
  it('normal operation check', function() {
    var res;

    res = head([1,2,3,4]);
    res.should.eql(1);

    res = head(iterate(v => v+1, 10));
    res.should.eql(10);
  });
  it('custom iterator check', function() {
    var res;

    function* customIterator(){
      yield 'a';
      yield 1;
    }

    res = head(customIterator());
    res.should.eql('a');
  });
  it('empty list check', function() {
    var res;

    res = head.bind(null, []).should.throw('Cannot get head of empty list');
  });
});
