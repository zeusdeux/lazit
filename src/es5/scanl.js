"use strict";

var scanl = regeneratorRuntime.mark(

// scanl :: (b -> a -> b) -> b -> [a] -> [b]
function scanl(f, acc, xs) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, x;

  return regeneratorRuntime.wrap(function scanl$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        acc = isObject(acc) ? clone(acc) : acc;
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 4;
        _iterator = xs[Symbol.iterator]();

      case 6:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 15;
          break;
        }

        x = _step.value;
        context$1$0.next = 10;
        return acc;

      case 10:
        acc = isObject(acc) ? clone(acc) : acc;
        acc = f(acc, x);

      case 12:
        _iteratorNormalCompletion = true;
        context$1$0.next = 6;
        break;

      case 15:
        context$1$0.next = 21;
        break;

      case 17:
        context$1$0.prev = 17;
        context$1$0.t10 = context$1$0["catch"](4);
        _didIteratorError = true;
        _iteratorError = context$1$0.t10;

      case 21:
        context$1$0.prev = 21;
        context$1$0.prev = 22;

        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }

      case 24:
        context$1$0.prev = 24;

        if (!_didIteratorError) {
          context$1$0.next = 27;
          break;
        }

        throw _iteratorError;

      case 27:
        return context$1$0.finish(24);

      case 28:
        return context$1$0.finish(21);

      case 29:
        context$1$0.next = 31;
        return acc;

      case 31:
      case "end":
        return context$1$0.stop();
    }
  }, scanl, this, [[4, 17, 21, 29], [22,, 24, 28]]);
});
var clone = require("clone");
var cu = require("auto-curry");
var isObject = require("./util").isObject;

module.exports = cu(scanl);