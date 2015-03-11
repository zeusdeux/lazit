require('should');

var replicate = require('../src/esnext/replicate');


describe('lazit#replicate', function() {
  it('normal operation check', function() {
    var res;

    res = replicate(4, 1);
    res.should.eql([1,1,1,1]);
  });
  it('auto-curry check', function() {
    var res;
    var m = replicate(5); // auto-curry check

    res = m([]);
    res.should.eql([[],[],[],[],[]]);
  });
  it('empty list check', function() {
    var res;

    res   = replicate(4, []);
    res.should.eql([[],[],[],[]]);
  });
});
