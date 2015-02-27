"use strict";

var drop = regeneratorRuntime.mark(

// drop :: Int -> [a] -> [a]
function drop(n, a) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, x;

  return regeneratorRuntime.wrap(function drop$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 3;
        _iterator = a[Symbol.iterator]();

      case 5:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 17;
          break;
        }

        x = _step.value;

        if (!n) {
          context$1$0.next = 12;
          break;
        }

        --n;
        return context$1$0.abrupt("continue", 14);

      case 12:
        context$1$0.next = 14;
        return x;

      case 14:
        _iteratorNormalCompletion = true;
        context$1$0.next = 5;
        break;

      case 17:
        context$1$0.next = 23;
        break;

      case 19:
        context$1$0.prev = 19;
        context$1$0.t3 = context$1$0["catch"](3);
        _didIteratorError = true;
        _iteratorError = context$1$0.t3;

      case 23:
        context$1$0.prev = 23;
        context$1$0.prev = 24;

        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }

      case 26:
        context$1$0.prev = 26;

        if (!_didIteratorError) {
          context$1$0.next = 29;
          break;
        }

        throw _iteratorError;

      case 29:
        return context$1$0.finish(26);

      case 30:
        return context$1$0.finish(23);

      case 31:
      case "end":
        return context$1$0.stop();
    }
  }, drop, this, [[3, 19, 23, 31], [24,, 26, 30]]);
});
var cu = require("auto-curry");

module.exports = cu(drop);