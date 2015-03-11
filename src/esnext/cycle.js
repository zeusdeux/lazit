var clone    = require('clone');
var isObject = require('./util').isObject;
var isGenFn  = require('is-generator').fn;

// cycle :: [a] -> [a]
function* cycle(a) {
  var isGenFnFlag = isGenFn(a);
  var tempIt = isGenFnFlag ? a()[Symbol.iterator]() : a[Symbol.iterator]() ;

  if (tempIt.next().done) throw new Error('Cannot cycle empty list/iterable');

  function* yieldIt(x) {
    if (!isObject(x)) yield x;
    else yield clone(x);
  }

  while (true) {
    if (!isGenFnFlag) {
      // See the comment in repeat
      for (let x of a) yield* yieldIt(x);
    }
    else {
      for (let x of a()) yield* yieldIt(x);
    }
  }
}

module.exports = cycle;
