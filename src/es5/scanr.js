"use strict";

var clone = require("clone");
var cu = require("auto-curry");
var isObject = require("./util").isObject;

// scanr :: (a -> b -> b) -> b -> [a] -> [b]
function scanr(f, acc, xs) {
  var xsIt = xs[Symbol.iterator]();

  return _scanr(f, acc, xsIt);

  function _scanr(_f, _b, _aIt) {
    var _aObj = _aIt.next();
    var ys = undefined;

    if (_aObj.done) {
      return [_b];
    }ys = _scanr(_f, _b, _aIt);
    ys.unshift(_f(_aObj.value, isObject(ys[0]) ? clone(ys[0]) : ys[0]));
    return ys;
  }
}

module.exports = cu(scanr);