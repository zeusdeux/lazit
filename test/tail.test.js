require('should');

var map     = require('../src/esnext/map');
var tail    = require('../src/esnext/tail');
var take    = require('../src/esnext/take');
var iterate = require('../src/esnext/iterate');


describe('lazit#tail', function() {
  it('normal operation check', function() {
    var res;

    res = [...tail([1,2,3,4])];
    res.should.eql([2,3,4]);

    res = [...tail(map(v => ++v, take(5, iterate(v => v*v, 2))))];
    res.should.eql([5,17,257,65537]);
  });
  it('custom iterator check', function() {
    var res;

    function* customIterator(){
      yield 'a';
      yield 1;
      yield 'b';
      yield 2;
    }

    res = [...tail(customIterator())];
    res.should.eql([1, 'b', 2]);
  });
  it('empty list check', function(done) {
    try {
      // throw mofo
      for (let x of tail([])) console.log(x);
    }
    catch(e){
      e.message.should.eql('Cannot get tail of empty list');
      done();
    }
  });
});
