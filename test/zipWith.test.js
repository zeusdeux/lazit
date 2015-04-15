require('should');

var map     = require('../src/esnext/map');
var take    = require('../src/esnext/take');
var repeat  = require('../src/esnext/repeat');
var iterate = require('../src/esnext/iterate');
var zipWith = require('../src/esnext/zipWith');


describe('lazit#zipWith', function() {
  it('normal operation check', function() {
    var res;

    res = [...zipWith((a,b) => a + b, [1,2,3], [5,6])];
    res.should.eql([6,8]);

    res = [...zipWith((a,b) => a + b, [0,1,2,3], map(v => ++v, take(5, iterate(v => v*v, 2))))];
    res.should.eql([3, 6, 19, 260]);

    res = [...zipWith((a,b) => a + b, ['a','b'], iterate(v => v + 1, 0))];
    res.should.eql(['a0', 'b1']);
  });
  it('auto-curry check', function() {
    var res;
    var z  = zipWith((a,_) => a);
    var z2 = zipWith((a,b) => a + b, ['a',1]); // auto-curry check

    res = [...z([1,2,3], take(5, repeat(1)))];
    res.should.eql([1,2,3]);

    res = [...z2([0])];
    res.should.eql(['a0']);
  });
  it('custom iterator check', function() {
    var res;
    var acc = ['c', 3];

    function* customIterator(){
      yield 'a';
      yield 1;
      yield 'b';
      yield 2;
    }

    res = [...zipWith((a,b) => a + ' dude ' + b, customIterator(), acc)];
    res.should.eql(['a dude c', '1 dude 3']);
    acc.should.eql(['c', 3]);
  });

  it('empty list check', function() {
    var res;
    var f = (a,b) => true;

    res = [...zipWith(f, [1,2,3], [])];
    res.should.eql([]);
    res = [...zipWith(f, [], [])];
    res.should.eql([]);
    res = [...zipWith(f, [], [1,2,3])];
    res.should.eql([]);
  });
});
