"use strict";

var cu = require("auto-curry");

// scanr :: (a -> b -> b) -> b -> [a] -> [b]
function scanr(f, acc, xs) {
  var xsIt = xs[Symbol.iterator]();
  return _scanr(f, acc, xsIt);

  function _scanr(_f, _b, _aIt) {
    var _aObj = _aIt.next();
    if (_aObj.done) {
      return [_b];
    }var ys = _scanr(_f, _b, _aIt);
    ys.unshift(_f(_aObj.value, ys[0]));
    return ys;
  }
}

module.exports = cu(scanr);