require('should');

var map     = require('../src/esnext/map');
var init    = require('../src/esnext/init');
var take    = require('../src/esnext/take');
var iterate = require('../src/esnext/iterate');


describe('lazit#init', function() {
  it('normal operation check', function() {
    var res;

    res = [...init([1,2,3,4])];
    res.should.eql([1,2,3]);

    res = [...init(map(v => ++v, take(5, iterate(v => v*v, 2))))];
    res.should.eql([3,5,17,257]);
  });
  it('custom iterator check', function() {
    var res;

    function* customIterator(){
      yield 'a';
      yield 1;
      yield 'b';
      yield 2;
    }

    function* delegator(){
      yield* customIterator();
      yield 'c';
      yield 3;
      return 4;
    }

    res = [...init(delegator())];
    res.should.eql(['a', 1, 'b', 2, 'c']);
  });
  it('empty list check', function(done) {
    try {
      // throw mofo
      for (let x of init([])) console.log(x);
    }
    catch(e){
      e.message.should.eql('Cannot get init of empty list');
      done();
    }
  });
});
