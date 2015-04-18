let clone             = require('clone');
let cu                = require('auto-curry');
let isObject          = require('./util').isObject;
let getIteratorAndObj = require('./util').getIteratorAndObj;


// foldl1 :: (a -> a -> a) -> [a] -> a
function foldl1(f, xs) {
  let {xsIt, itObj} = getIteratorAndObj(xs);
  // because pass by reference
  let acc = isObject(itObj.value)? clone(itObj.value) : itObj.value;
  let nextVal;

  if (itObj.done) throw new Error('Cannot apply foldl1 to an empty list');

  itObj = xsIt.next();
  nextVal = itObj.value;

  while (!itObj.done) {
    acc = f(acc, nextVal);
    itObj = xsIt.next();
    nextVal = itObj.value;
  }
  return acc;
}

module.exports = cu(foldl1);
