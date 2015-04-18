let clone    = require('clone');
let cu       = require('auto-curry');
let isObject = require('./util').isObject;


// scanl1 :: (a -> a -> a) -> [a] -> [a]
// scanl1 f [x1, x2, ...] == [x1, x1 `f` x2, ...]
function* scanl1(f, xs) {
  let prev = null;

  for (let x of xs) {
    if (null !== prev) x = f(prev, x);
    yield x;
    x = isObject(x)? clone(x) : x;
    prev = x;
  }
}

module.exports = cu(scanl1);
