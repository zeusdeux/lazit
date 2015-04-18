"use strict";

var cu = require("auto-curry");

// span :: (a -> Bool) -> [a] -> ([a], [a])
function span(p, a) {
  var l = [];
  var r = [];
  var doneTaking = false;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = a[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var x = _step.value;

      if (p(x) && !doneTaking) l.push(x);else {
        doneTaking = true;
        r.push(x);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return [l, r];
}

module.exports = cu(span);