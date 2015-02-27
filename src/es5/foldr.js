"use strict";

var cu = require("auto-curry");

// foldr :: (a -> b -> b) -> b -> [a] -> b
function foldr(f, acc, xs) {
  var xsIt = xs[Symbol.iterator]();
  return _foldr(f, acc, xsIt);

  function _foldr(_f, _acc, _xsIt) {
    var _itObj = _xsIt.next();
    if (_itObj.done) {
      return _acc;
    }return _f(_itObj.value, _foldr(_f, _acc, _xsIt));
  }
}

module.exports = cu(foldr);