"use strict";

var tail = regeneratorRuntime.mark(

// tail :: [a] -> [a]
// [a] should be non-empty
function tail(a) {
  return regeneratorRuntime.wrap(function tail$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!a[Symbol.iterator]().next().done) {
          context$1$0.next = 2;
          break;
        }

        throw new Error("Cannot get tail of empty list");

      case 2:
        return context$1$0.delegateYield(drop(1, a), "t9", 3);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, tail, this);
});
var drop = require("./drop");

module.exports = tail;