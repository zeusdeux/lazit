require('should');

var take    = require('../src/esnext/take');
var iterate = require('../src/esnext/iterate');


describe('lazit#iterate', function() {
  it('normal operation check', function() {
    var res;

    res = [...take(4, iterate(v => v+1, 1))];
    res.should.eql([1,2,3,4]);
  });
  it('auto-curry check', function() {
    var res;
    var m = iterate(a => a); // auto-curry check

    res = [...take(4, m(1))];
    res.should.eql([1,1,1,1]);
  });
  it('empty list check', function() {
    var res, i;

    i   = iterate(v => v, []);
    res = [...take(4, i)];
    res.should.eql([[],[],[],[]]);
  });
});
