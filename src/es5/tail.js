"use strict";

var tail = regeneratorRuntime.mark( // tail :: [a] -> [a]
// [a] should be non-empty
function tail(a) {
  var aIt, aObj;
  return regeneratorRuntime.wrap(function tail$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        aIt = a[Symbol.iterator]();
        aObj = aIt.next();

        if (!aObj.done) {
          context$1$0.next = 4;
          break;
        }

        throw new Error("Cannot get tail of empty list");

      case 4:
        if (!true) {
          context$1$0.next = 14;
          break;
        }

        aObj = aIt.next();

        if (!aObj.done) {
          context$1$0.next = 10;
          break;
        }

        return context$1$0.abrupt("break", 14);

      case 10:
        context$1$0.next = 12;
        return aObj.value;

      case 12:
        context$1$0.next = 4;
        break;

      case 14:
      case "end":
        return context$1$0.stop();
    }
  }, tail, this);
});

module.exports = tail;