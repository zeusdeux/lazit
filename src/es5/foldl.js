"use strict";

var clone = require("clone");
var cu = require("auto-curry");
var isObject = require("./util").isObject;
var getIteratorAndObj = require("./util").getIteratorAndObj;

// reducing lists
// foldl :: (b -> a -> b) -> b -> [a] -> b
// input list must be finite
function foldl(f, acc, xs) {
  var _getIteratorAndObj = getIteratorAndObj(xs);

  var xsIt = _getIteratorAndObj.xsIt;
  var itObj = _getIteratorAndObj.itObj;

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