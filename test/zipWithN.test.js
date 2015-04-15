require('should');

var map      = require('../src/esnext/map');
var take     = require('../src/esnext/take');
var foldr    = require('../src/esnext/foldr');
var repeat   = require('../src/esnext/repeat');
var iterate  = require('../src/esnext/iterate');
var zipWithN = require('../src/esnext/zipWithN');


describe('lazit#zipWithN', function() {
  it('normal operation check', function() {
    var res;

    res = [...zipWithN((a,b,c) => a + b + c, [1,2,3], [5,6], [0,1])];
    res.should.eql([6,9]);

    res = [...zipWithN((a,b,c) => a + b + c, repeat(1), [0,1,2,3], map(v => ++v, take(5, iterate(v => v*v, 2))))];
    res.should.eql([4, 7, 20, 261]);

    res = [...zipWithN((a,b,c) => a + b + c, [2,4], ['a','b'], iterate(v => v + 1, 0))];
    res.should.eql(['2a0', '4b1']);

    res = [...zipWithN((...args) => foldr((a,b) => a + b, 0, args), [1,2,3])];
    res.should.eql([1,2,3]);
  });
  it('cannot auto-curry since zipWithN is variadic so no check. yay! \\o/', () => null);
  it('custom iterator check', function() {
    var res;
    var acc = ['c', 3];

    function* customIterator(){
      yield 'a';
      yield 1;
      yield 'b';
      yield 2;
    }

    res = [...zipWithN((a,b,c) => a + ' dude ' + b + ' what ' + c, customIterator(), acc, [20, 40])];
    res.should.eql(['a dude c what 20', '1 dude 3 what 40']);
    acc.should.eql(['c', 3]);
  });

  it('empty list check', function() {
    var res;
    var f = () => true;

    res = [...zipWithN(f, [1,2,3], [], [])];
    res.should.eql([]);
    res = [...zipWithN(f, [], [], [])];
    res.should.eql([]);
    res = [...zipWithN(f, [], [1,2,3], [])];
    res.should.eql([]);
    res = [...zipWithN(f, [], [], [1,2,3])];
    res.should.eql([]);
  });
});
