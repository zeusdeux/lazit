let clone    = require('clone');
let cu       = require('auto-curry');
let isObject = require('./util').isObject;


// scanl :: (b -> a -> b) -> b -> [a] -> [b]
function* scanl(f, acc, xs) {
  acc = isObject(acc)? clone(acc) : acc;
  for (let x of xs) {
    yield acc;
    acc = isObject(acc)? clone(acc) : acc;
    acc = f(acc, x);
  }
  yield acc;
}

module.exports = cu(scanl);
