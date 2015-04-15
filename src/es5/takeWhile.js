"use strict";

var takeWhile = regeneratorRuntime.mark(

// takeWhile :: (a -> Bool) -> [a] -> [a]
function takeWhile(p, a) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, x;

  return regeneratorRuntime.wrap(function takeWhile$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 3;
        _iterator = a[Symbol.iterator]();

      case 5:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 16;
          break;
        }

        x = _step.value;

        if (!p(x)) {
          context$1$0.next = 12;
          break;
        }

        context$1$0.next = 10;
        return x;

      case 10:
        context$1$0.next = 13;
        break;

      case 12:
        return context$1$0.abrupt("break", 16);

      case 13:
        _iteratorNormalCompletion = true;
        context$1$0.next = 5;
        break;

      case 16:
        context$1$0.next = 22;
        break;

      case 18:
        context$1$0.prev = 18;
        context$1$0.t13 = context$1$0["catch"](3);
        _didIteratorError = true;
        _iteratorError = context$1$0.t13;

      case 22:
        context$1$0.prev = 22;
        context$1$0.prev = 23;

        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }

      case 25:
        context$1$0.prev = 25;

        if (!_didIteratorError) {
          context$1$0.next = 28;
          break;
        }

        throw _iteratorError;

      case 28:
        return context$1$0.finish(25);

      case 29:
        return context$1$0.finish(22);

      case 30:
      case "end":
        return context$1$0.stop();
    }
  }, takeWhile, this, [[3, 18, 22, 30], [23,, 25, 29]]);
});
var cu = require("auto-curry");

module.exports = cu(takeWhile);