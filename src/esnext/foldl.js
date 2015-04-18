let clone             = require('clone');
let cu                = require('auto-curry');
let isObject          = require('./util').isObject;
let getIteratorAndObj = require('./util').getIteratorAndObj;


// reducing lists
// foldl :: (b -> a -> b) -> b -> [a] -> b
// input list must be finite
function foldl(f, acc, xs) {
  let {xsIt, itObj} = getIteratorAndObj(xs);

  // clone to prevent input mutation
  if (isObject(acc)) acc = clone(acc);

  // unrolling recursive foldl definition
  // into a simple loop
  // like a tail call optimizer would have done
  while (!itObj.done) {
    acc = f(acc, itObj.value);
    itObj = xsIt.next();
  }
  return acc;
}

module.exports = cu(foldl);
