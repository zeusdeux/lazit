require('should');

var map     = require('../src/esnext/map');
var take    = require('../src/esnext/take');
var foldr1  = require('../src/esnext/foldr1');
var repeat  = require('../src/esnext/repeat');
var filter  = require('../src/esnext/filter');
var iterate = require('../src/esnext/iterate');
var reverse = require('../src/esnext/reverse');


describe('lazit#foldr1', function() {
  it('normal operation check', function() {
    var res;

    res = foldr1((el, acc) => el / acc, [1,2,3,4]);
    res.should.eql(0.375);

    res = foldr1((el, acc) => el / acc, map(v => ++v, take(5, iterate(v => v*v, 2))));
    res.should.eql(2601.0793774319063);
  });
  it('auto-curry check', function() {
    var res;
    var m = foldr1((a,b) => a+b); // auto-curry check

    res = m(take(5, repeat(1)));
    res.should.eql(5);
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
      yield acc;
      return 4;
    }

    res = foldr1((el, acc) => {
      if ('string' === typeof el) acc.push(el);
      return acc;
    }, delegator());
    res.should.eql(reverse(filter(v => 'string' === typeof v, delegator())));
    acc.should.eql([]);
  });

  it('empty list check', function() {
    foldr1.bind(null, (a,b) => a+b, []).should.throw('Cannot apply foldr1 to an empty list');
  });
});
