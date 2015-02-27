"use strict";

var cycle = regeneratorRuntime.mark(

// cycle :: [a] -> [a]
function cycle(a) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, x;

  return regeneratorRuntime.wrap(function cycle$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!true) {
          context$1$0.next = 34;
          break;
        }

        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 4;
        _iterator = a[Symbol.iterator]();

      case 6:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 18;
          break;
        }

        x = _step.value;

        if (isObject(x)) {
          context$1$0.next = 13;
          break;
        }

        context$1$0.next = 11;
        return x;

      case 11:
        context$1$0.next = 15;
        break;

      case 13:
        context$1$0.next = 15;
        return clone(x);

      case 15:
        _iteratorNormalCompletion = true;
        context$1$0.next = 6;
        break;

      case 18:
        context$1$0.next = 24;
        break;

      case 20:
        context$1$0.prev = 20;
        context$1$0.t2 = context$1$0["catch"](4);
        _didIteratorError = true;
        _iteratorError = context$1$0.t2;

      case 24:
        context$1$0.prev = 24;
        context$1$0.prev = 25;

        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }

      case 27:
        context$1$0.prev = 27;

        if (!_didIteratorError) {
          context$1$0.next = 30;
          break;
        }

        throw _iteratorError;

      case 30:
        return context$1$0.finish(27);

      case 31:
        return context$1$0.finish(24);

      case 32:
        context$1$0.next = 0;
        break;

      case 34:
      case "end":
        return context$1$0.stop();
    }
  }, cycle, this, [[4, 20, 24, 32], [25,, 27, 31]]);
});
var clone = require("clone");
var isObject = require("./util").isObject;

module.exports = cycle;

// See the comment in repeat