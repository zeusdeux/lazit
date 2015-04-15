"use strict";

var cycle = regeneratorRuntime.mark(

// cycle :: [a] -> [a]
function cycle(a) {
  var yieldIt = regeneratorRuntime.mark(function yieldIt(x) {
    return regeneratorRuntime.wrap(function yieldIt$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (isObject(x)) {
            context$2$0.next = 5;
            break;
          }

          context$2$0.next = 3;
          return x;

        case 3:
          context$2$0.next = 7;
          break;

        case 5:
          context$2$0.next = 7;
          return clone(x);

        case 7:
        case "end":
          return context$2$0.stop();
      }
    }, yieldIt, this);
  });

  var isGenFnFlag, tempIt, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, x, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2;

  return regeneratorRuntime.wrap(function cycle$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        isGenFnFlag = isGenFn(a);
        tempIt = isGenFnFlag ? a()[Symbol.iterator]() : a[Symbol.iterator]();

        if (!tempIt.next().done) {
          context$1$0.next = 4;
          break;
        }

        throw new Error("Cannot cycle empty list/iterable");

      case 4:
        if (!true) {
          context$1$0.next = 60;
          break;
        }

        if (isGenFnFlag) {
          context$1$0.next = 33;
          break;
        }

        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 9;
        _iterator = a[Symbol.iterator]();

      case 11:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 17;
          break;
        }

        x = _step.value;
        return context$1$0.delegateYield(yieldIt(x), "t2", 14);

      case 14:
        _iteratorNormalCompletion = true;
        context$1$0.next = 11;
        break;

      case 17:
        context$1$0.next = 23;
        break;

      case 19:
        context$1$0.prev = 19;
        context$1$0.t3 = context$1$0["catch"](9);
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
        context$1$0.next = 58;
        break;

      case 33:
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 36;
        _iterator2 = a()[Symbol.iterator]();

      case 38:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 44;
          break;
        }

        x = _step2.value;
        return context$1$0.delegateYield(yieldIt(x), "t4", 41);

      case 41:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 38;
        break;

      case 44:
        context$1$0.next = 50;
        break;

      case 46:
        context$1$0.prev = 46;
        context$1$0.t5 = context$1$0["catch"](36);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t5;

      case 50:
        context$1$0.prev = 50;
        context$1$0.prev = 51;

        if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
          _iterator2["return"]();
        }

      case 53:
        context$1$0.prev = 53;

        if (!_didIteratorError2) {
          context$1$0.next = 56;
          break;
        }

        throw _iteratorError2;

      case 56:
        return context$1$0.finish(53);

      case 57:
        return context$1$0.finish(50);

      case 58:
        context$1$0.next = 4;
        break;

      case 60:
      case "end":
        return context$1$0.stop();
    }
  }, cycle, this, [[9, 19, 23, 31], [24,, 26, 30], [36, 46, 50, 58], [51,, 53, 57]]);
});
var clone = require("clone");
var isObject = require("./util").isObject;
var isGenFn = require("is-generator").fn;

module.exports = cycle;

// See the comment in repeat