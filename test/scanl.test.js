require('should');

var map     = require('../src/esnext/map');
var take    = require('../src/esnext/take');
var scanl   = require('../src/esnext/scanl');
var repeat  = require('../src/esnext/repeat');
var iterate = require('../src/esnext/iterate');

describe('lazit#scanl', function() {
  it('normal operation check', function() {
    var res;

    res = [...scanl((acc, el) => acc + el, 0, [1,2,3,4])];
    res.should.eql([0,1,3,6,10]);

    res = [...scanl((acc, el) => acc + el, 0, map(v => ++v, take(5, iterate(v => v*v, 2))))];
    res.should.eql([0,3,8,25,282,65819]);
  });
  it('auto-curry check', function() {
    var res;
    var m = scanl((a,b) => a+b); // auto-curry check
    var n = scanl((a,b) => 0, 0); // auto-curry check

    res = [...m(0, take(5, repeat(1)))];
    res.should.eql([0,1,2,3,4,5]);

    res = [...n([1,2,3,4])];
    res.should.eql([0,0,0,0,0]);
  });
  it('custom iterator check', function() {
    var res;
    var acc = [];

    function* customIterator(){
      yield 'a';
      yield 'b';
      yield 'c';
    }

    res = [...scanl((a,b) => {
      if ('string' === typeof b) {
        a.unshift(b);
      }
      return a;
    }, acc, customIterator())];

    res.should.eql([[],['a'],['b','a'],['c','b','a']]);
    acc.should.eql([]);
  });
  it('empty list check', function() {
    var res;

    res = [...scanl((a,b) => a+b, 0, [])];
    res.should.eql([0]);
    res = [...scanl((a,b) => a+b, 'abcd', [])];
    res.should.eql(['abcd']);
  });
});
