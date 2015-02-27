"use strict";

var zip3 = regeneratorRuntime.mark(

// zip3 :: [a] -> [b] -> [c] -> [(a, b, c)]
function zip3(a, b, c) {
  var aIterator, bIterator, cIterator, aObj, bObj, cObj;
  return regeneratorRuntime.wrap(function zip3$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        aIterator = a[Symbol.iterator]();
        bIterator = b[Symbol.iterator]();
        cIterator = c[Symbol.iterator]();
        aObj = aIterator.next();
        bObj = bIterator.next();
        cObj = cIterator.next();

      case 6:
        if (!(!aObj.done && !bObj.done && !cObj.done)) {
          context$1$0.next = 14;
          break;
        }

        context$1$0.next = 9;
        return [aObj.value, bObj.value, cObj.value];

      case 9:
        aObj = aIterator.next();
        bObj = bIterator.next();
        cObj = cIterator.next();
        context$1$0.next = 6;
        break;

      case 14:
      case "end":
        return context$1$0.stop();
    }
  }, zip3, this);
});
var cu = require("auto-curry");

module.exports = cu(zip3);