"use strict";

var take = regeneratorRuntime.mark(

// take :: Int -> [a] -> [a]
function take(n, a) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, x;

  return regeneratorRuntime.wrap(function take$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 3;
        _iterator = a[Symbol.iterator]();

      case 5:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 23;
          break;
        }

        x = _step.value;

        if (!(n > 1)) {
          context$1$0.next = 13;
          break;
        }

        context$1$0.next = 10;
        return x;

      case 10:
        n--;
        context$1$0.next = 20;
        break;

      case 13:
        if (!(n === 1)) {
          context$1$0.next = 19;
          break;
        }

        context$1$0.next = 16;
        return x;

      case 16:
        return context$1$0.abrupt("break", 23);

      case 19:
        return context$1$0.abrupt("break", 23);

      case 20:
        _iteratorNormalCompletion = true;
        context$1$0.next = 5;
        break;

      case 23:
        context$1$0.next = 29;
        break;

      case 25:
        context$1$0.prev = 25;
        context$1$0.t12 = context$1$0["catch"](3);
        _didIteratorError = true;
        _iteratorError = context$1$0.t12;

      case 29:
        context$1$0.prev = 29;
        context$1$0.prev = 30;

        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }

      case 32:
        context$1$0.prev = 32;

        if (!_didIteratorError) {
          context$1$0.next = 35;
          break;
        }

        throw _iteratorError;

      case 35:
        return context$1$0.finish(32);

      case 36:
        return context$1$0.finish(29);

      case 37:
      case "end":
        return context$1$0.stop();
    }
  }, take, this, [[3, 25, 29, 37], [30,, 32, 36]]);
});
var cu = require("auto-curry");

module.exports = cu(take);

// this condition makes sure that we yield only
// exactly n times and not n + 1 times which
// would happen if we were using the old if (n--) code