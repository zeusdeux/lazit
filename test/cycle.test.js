require('should');

var take  = require('../src/esnext/take');
var cycle = require('../src/esnext/cycle');


describe('lazit#cycle', function() {
  it('normal operation check', function() {
    var res;

    res = [...take(5, cycle([1,2]))];
    res.should.eql([1,2,1,2,1]);
  });
  it('custom iterator check', function() {
    var res;

    function* customIterator(){
      yield 1;
      yield 2;
      yield* boom();
    }
    function* boom(){
      yield 3;
      yield 4;
    }
    // iterators/generators need to passed as is
    // cycle calls it and uses the iterator it returns
    // if you pass the iterator obj or generator obj here
    // then I have no way of restarting it once it ends
    // and I might need to iterate over it more than once
    // if you pull more elements out from it than it actually
    // yields
    res = [...take(5, cycle(customIterator))];
    res.should.eql([1,2,3,4,1]);
  });
  it('empty list check', function(done) {
    try {
      [...cycle([])];
    }
    catch(e){
      e.message.should.eql('Cannot cycle empty list/iterable');
      done();
    }
  });
});
