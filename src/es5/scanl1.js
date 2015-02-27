"use strict";

var scanl1 = regeneratorRuntime.mark(

// scanl1 :: (a -> a -> a) -> [a] -> [a]
// scanl1 f [x1, x2, ...] == [x1, x1 `f` x2, ...]
function scanl1(f, xs) {
  var prev, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, x;

  return regeneratorRuntime.wrap(function scanl1$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        prev = null;
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

        if (null !== prev) x = f(prev, x);
        context$1$0.next = 11;
        return x;

      case 11:
        prev = x;

      case 12:
        _iteratorNormalCompletion = true;
        context$1$0.next = 6;
        break;

      case 15:
        context$1$0.next = 21;
        break;

      case 17:
        context$1$0.prev = 17;
        context$1$0.t8 = context$1$0["catch"](4);
        _didIteratorError = true;
        _iteratorError = context$1$0.t8;

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
      case "end":
        return context$1$0.stop();
    }
  }, scanl1, this, [[4, 17, 21, 29], [22,, 24, 28]]);
});
var cu = require("auto-curry");

module.exports = cu(scanl1);