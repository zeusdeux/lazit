"use strict";

var concat = regeneratorRuntime.mark(

// concat :: [a] -> [a] -> [a]
// Append two lists
// If the first list is not finite, the result is the first list.
function concat(a, b) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, x, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2;

  return regeneratorRuntime.wrap(function concat$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 3;
        _iterator = a[Symbol.iterator]();

      case 5:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 12;
          break;
        }

        x = _step.value;
        context$1$0.next = 9;
        return x;

      case 9:
        _iteratorNormalCompletion = true;
        context$1$0.next = 5;
        break;

      case 12:
        context$1$0.next = 18;
        break;

      case 14:
        context$1$0.prev = 14;
        context$1$0.t0 = context$1$0["catch"](3);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 18:
        context$1$0.prev = 18;
        context$1$0.prev = 19;

        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }

      case 21:
        context$1$0.prev = 21;

        if (!_didIteratorError) {
          context$1$0.next = 24;
          break;
        }

        throw _iteratorError;

      case 24:
        return context$1$0.finish(21);

      case 25:
        return context$1$0.finish(18);

      case 26:
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 29;
        _iterator2 = b[Symbol.iterator]();

      case 31:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 38;
          break;
        }

        x = _step2.value;
        context$1$0.next = 35;
        return x;

      case 35:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 31;
        break;

      case 38:
        context$1$0.next = 44;
        break;

      case 40:
        context$1$0.prev = 40;
        context$1$0.t1 = context$1$0["catch"](29);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t1;

      case 44:
        context$1$0.prev = 44;
        context$1$0.prev = 45;

        if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
          _iterator2["return"]();
        }

      case 47:
        context$1$0.prev = 47;

        if (!_didIteratorError2) {
          context$1$0.next = 50;
          break;
        }

        throw _iteratorError2;

      case 50:
        return context$1$0.finish(47);

      case 51:
        return context$1$0.finish(44);

      case 52:
      case "end":
        return context$1$0.stop();
    }
  }, concat, this, [[3, 14, 18, 26], [19,, 21, 25], [29, 40, 44, 52], [45,, 47, 51]]);
});
var cu = require("auto-curry");

module.exports = cu(concat);