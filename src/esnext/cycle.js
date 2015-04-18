let clone    = require('clone');
let isObject = require('./util').isObject;
let isGenFn  = require('is-generator').fn;


// cycle :: [a] -> [a]
function* cycle(a) {
  let isGenFnFlag = isGenFn(a);
  let tempIt      = isGenFnFlag ? a()[Symbol.iterator]() : a[Symbol.iterator]();

  if (tempIt.next().done) throw new Error('Cannot cycle empty list/iterable');

  function* yieldIt(x) {
    if (!isObject(x)) yield x;
    else yield clone(x);
  }

  while (true) {
    // See the comment in repeat
    if (!isGenFnFlag) for (let x of a) yield* yieldIt(x);
    else for (let x of a()) yield* yieldIt(x);
  }
}

module.exports = cycle;
