require('should');

var unzipN = require('../src/esnext/unzipN');


describe('lazit#unzipN', function() {
  it('normal operation check', function() {
    var res;

    res = unzipN([[1,5], [2,6], [0,1], [2,4]]);
    res.should.eql([[1,2,0,2], [5,6,1,4]]);

    res = unzipN([[0,3,10], [1,5,20], [2,17,30], [3,257,40]]);
    res.should.eql([[0,1,2,3], [3,5,17,257], [10,20,30,40]]);
  });
  it('custom iterator check', function() {
    var res;

    function* customIterator(){
      yield ['a', 'c', 'm', 't'];
      yield [1, 3, 5, 200];
      yield [0,0,0,1];
      yield ['d','u','d','e'];
    }

    res = unzipN(customIterator());
    res.should.eql([['a', 1, 0, 'd'], ['c', 3, 0, 'u'], ['m', 5, 0, 'd'], ['t', 200, 1, 'e']]);
  });

  it('empty list check', function() {
    var res;

    res = unzipN([]);
    res.should.eql([]);
    res = unzipN([[],[]]);
    res.should.eql([]);
  });
});
