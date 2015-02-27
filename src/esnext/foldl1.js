var cu                = require('auto-curry');
var getIteratorAndObj = require('./util').getIteratorAndObj;


// foldl1 :: (a -> a -> a) -> [a] -> a
function foldl1(f, xs) {
  var {xsIt, itObj} = getIteratorAndObj(xs);
  var acc = itObj.value;
  var nextVal;

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
