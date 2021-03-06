require('should');

var map     = require('../src/esnext/map');
var take    = require('../src/esnext/take');
var foldr   = require('../src/esnext/foldr');
var repeat  = require('../src/esnext/repeat');
var filter  = require('../src/esnext/filter');
var iterate = require('../src/esnext/iterate');
var reverse = require('../src/esnext/reverse');

describe('lazit#foldr', function() {
  it('normal operation check', function() {
    var res;

    res = foldr((el, acc) => el/acc, 1, [1,2,3,4]);
    res.should.eql(0.375);

    res = foldr((el, acc) => el/acc, 1, map(v => ++v, take(5, iterate(v => v*v, 2))));
    res.should.eql(2601.0793774319063);
  });
  it('auto-curry check', function() {
    var res;
    var m = foldr((a,b) => a+b); // auto-curry check
    var n = foldr((a,b) => 0, 0); // auto-curry check

    res = m(0, take(5, repeat(1)));
    res.should.eql(5);

    res = n([1,2,3,4]);
    res.should.eql(0);
  });
  it('custom iterator check', function() {
    var res;
    var acc = [];

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

    res = foldr((a,b) => {
      if ('string' === typeof a) {
       b.push(a);
      }
      return b;
    }, acc, delegator());

    res.should.eql(reverse(filter(v => 'string' === typeof v, delegator())));
    acc.should.eql([]);
  });

  it('empty list check', function() {
    var res;

    res = foldr((a,b) => a+b, 0, []);
    res.should.eql(0);
    res = foldr((a,b) => a+b, 'abcd', []);
    res.should.eql('abcd');
  });
});
