require('should');

var take    = require('../src/esnext/take');
var repeat = require('../src/esnext/repeat');


describe('lazit#repeat', function() {
  it('normal operation check', function() {
    var res;

    res = [...take(4, repeat(1))];
    res.should.eql([1,1,1,1]);
  });
  it('empty list check', function() {
    var res, r;

    r   = repeat([]);
    res = [...take(4, r)];
    res.should.eql([[],[],[],[]]);
  });
});
