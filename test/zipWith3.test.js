require('should');

var map      = require('../src/esnext/map');
var take     = require('../src/esnext/take');
var repeat   = require('../src/esnext/repeat');
var iterate  = require('../src/esnext/iterate');
var zipWith3 = require('../src/esnext/zipWith3');


describe('lazit#zipWith3', function() {
  it('normal operation check', function() {
    var res;

    res = [...zipWith3((a,b,c) => a + b + c, [1,2,3], [5,6], [0,1])];
    res.should.eql([6,9]);

    res = [...zipWith3((a,b,c) => a + b + c, repeat(1), [0,1,2,3], map(v => ++v, take(5, iterate(v => v*v, 2))))];
    res.should.eql([4, 7, 20, 261]);

    res = [...zipWith3((a,b,c) => a + b + c, [2,4], ['a','b'], iterate(v => v + 1, 0))];
    res.should.eql(['2a0', '4b1']);
  });
  it('auto-curry check', function() {
    var res;
    var z  = zipWith3((a,b,c) => a);
    var z2 = zipWith3((a,b,c) => a + b + c, ['a',1]); // auto-curry check
    var z3 = zipWith3((a,b,c) => a + b + c, [1], [2,3]); // auto-curry check

    res = [...z([1,2,3], take(5, repeat(1)), [0])];
    res.should.eql([1]);

    res = [...z2([1],[0])];
    res.should.eql(['a10']);

    res = [...z3([0])];
    res.should.eql([3]);
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

    res = [...zipWith3((a,b,c) => a + ' dude ' + b + ' what ' + c, customIterator(), acc, [20, 40])];
    res.should.eql(['a dude c what 20', '1 dude 3 what 40']);
    acc.should.eql(['c', 3]);
  });

  it('empty list check', function() {
    var res;
    var f = () => true;

    res = [...zipWith3(f, [1,2,3], [], [])];
    res.should.eql([]);
    res = [...zipWith3(f, [], [], [])];
    res.should.eql([]);
    res = [...zipWith3(f, [], [1,2,3], [])];
    res.should.eql([]);
    res = [...zipWith3(f, [], [], [1,2,3])];
    res.should.eql([]);
  });
});
