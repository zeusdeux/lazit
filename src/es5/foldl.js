"use strict";

var cu = require("auto-curry");
var getIteratorAndObj = require("./util").getIteratorAndObj;

// reducing lists
// foldl :: (b -> a -> b) -> b -> [a] -> b
// input list must be finite
function foldl(f, acc, xs) {
  var _getIteratorAndObj = getIteratorAndObj(xs);

  var xsIt = _getIteratorAndObj.xsIt;
  var itObj = _getIteratorAndObj.itObj;

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