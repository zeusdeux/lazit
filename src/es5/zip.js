"use strict";

var zip = regeneratorRuntime.mark(

// zip :: [a] -> [b] -> [[a,b]]
function zip(a, b) {
  var aIterator, bIterator, aObj, bObj;
  return regeneratorRuntime.wrap(function zip$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        aIterator = a[Symbol.iterator]();
        bIterator = b[Symbol.iterator]();
        aObj = aIterator.next();
        bObj = bIterator.next();

      case 4:
        if (!(!aObj.done && !bObj.done)) {
          context$1$0.next = 11;
          break;
        }

        context$1$0.next = 7;
        return [aObj.value, bObj.value];

      case 7:
        aObj = aIterator.next();
        bObj = bIterator.next();
        context$1$0.next = 4;
        break;

      case 11:
      case "end":
        return context$1$0.stop();
    }
  }, zip, this);
});
var cu = require("auto-curry");

module.exports = cu(zip);