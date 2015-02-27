"use strict";

var cu = require("auto-curry");
var getIteratorAndObj = require("./util").getIteratorAndObj;

// foldr1 :: (a -> a -> a) -> [a] -> a
function foldr1(f, xs) {
  var _getIteratorAndObj = getIteratorAndObj(xs);

  var xsIt = _getIteratorAndObj.xsIt;
  var itObj = _getIteratorAndObj.itObj;

  if (itObj.done) throw new Error("Cannot apply foldr1 to an empty list");
  return _foldr1(f, itObj.value, xsIt);

  function _foldr1(_f, _acc, _xsIt) {
    var _itObj = _xsIt.next();
    if (_itObj.done) {
      return _acc;
    }return _f(_acc, _foldr1(_f, _itObj.value, _xsIt));
  }
}

module.exports = cu(foldr1);