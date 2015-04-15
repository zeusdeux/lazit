require('should');

var unzip3 = require('../src/esnext/unzip3');


describe('lazit#unzip3', function() {
  it('normal operation check', function() {
    var res;

    res = unzip3([[1,5,4], [2,6,5]]);
    res.should.eql([[1,2], [5,6], [4,5]]);

    res = unzip3([[0,3,10], [1,5,30], [2,17,50], [3,257,70]]);
    res.should.eql([[0,1,2,3], [3,5,17,257], [10,30,50,70]]);

    res = unzip3.bind(null, [[1,5,4,0], [2,6,5,1]]);
    res.should.throw();
  });
  it('custom iterator check', function() {
    var res;

    function* customIterator(){
      yield ['a', 'c', 'd'];
      yield [1, 3, 5];
    }

    res = unzip3(customIterator());
    res.should.eql([['a', 1], ['c', 3], ['d', 5]]);
  });
  it('empty list check', function() {
    var res;

    res = unzip3([]);
    res.should.eql([[],[],[]]);
  });
});
