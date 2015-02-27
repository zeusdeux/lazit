"use strict";

var map = regeneratorRuntime.mark(

// map :: (a -> b) -> [a] -> [b]
function map(f, a) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, x;

  return regeneratorRuntime.wrap(function map$(context$1$0) {
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
        return f(x);

      case 9:
        _iteratorNormalCompletion = true;
        context$1$0.next = 5;
        break;

      case 12:
        context$1$0.next = 18;
        break;

      case 14:
        context$1$0.prev = 14;
        context$1$0.t6 = context$1$0["catch"](3);
        _didIteratorError = true;
        _iteratorError = context$1$0.t6;

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
      case "end":
        return context$1$0.stop();
    }
  }, map, this, [[3, 14, 18, 26], [19,, 21, 25]]);
});
var cu = require("auto-curry");

module.exports = cu(map);