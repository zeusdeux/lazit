require('should');

var unzip = require('../src/esnext/unzip');


describe('lazit#unzip', function() {
  it('normal operation check', function() {
    var res;

    res = unzip([[1,5], [2,6]]);
    res.should.eql([[1,2], [5,6]]);

    res = unzip([[0,3], [1,5], [2,17], [3,257]]);
    res.should.eql([[0,1,2,3], [3,5,17,257]]);

    res = unzip.bind(null, [[1,5,10], [2,6,20]]);
    res.should.throw();
  });
  it('custom iterator check', function() {
    var res;

    function* customIterator(){
      yield ['a', 'c'];
      yield [1, 3];
    }

    res = unzip(customIterator());
    res.should.eql([['a', 1], ['c', 3]]);
  });

  it('empty list check', function() {
    var res;

    res = unzip([]);
    res.should.eql([[],[]]);
  });
});
