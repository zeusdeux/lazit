require('should');

var flip = require('../src/esnext/flip');
var div  = (a,b) => a/b;

describe('lazit#flip', function() {
  it('normal operation check', function() {
    var res = flip(div)(2,3);

    res.should.eql(1.5);
  });
});
