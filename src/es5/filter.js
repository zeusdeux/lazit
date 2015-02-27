"use strict";

var filter = regeneratorRuntime.mark(

// filter :: (a -> Bool) -> [a] -> [a]
function filter(p, a) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, x;

  return regeneratorRuntime.wrap(function filter$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 3;
        _iterator = a[Symbol.iterator]();

      case 5:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 13;
          break;
        }

        x = _step.value;

        if (!p(x)) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 10;
        return x;

      case 10:
        _iteratorNormalCompletion = true;
        context$1$0.next = 5;
        break;

      case 13:
        context$1$0.next = 19;
        break;

      case 15:
        context$1$0.prev = 15;
        context$1$0.t5 = context$1$0["catch"](3);
        _didIteratorError = true;
        _iteratorError = context$1$0.t5;

      case 19:
        context$1$0.prev = 19;
        context$1$0.prev = 20;

        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }

      case 22:
        context$1$0.prev = 22;

        if (!_didIteratorError) {
          context$1$0.next = 25;
          break;
        }

        throw _iteratorError;

      case 25:
        return context$1$0.finish(22);

      case 26:
        return context$1$0.finish(19);

      case 27:
      case "end":
        return context$1$0.stop();
    }
  }, filter, this, [[3, 15, 19, 27], [20,, 22, 26]]);
});
var cu = require("auto-curry");

module.exports = cu(filter);