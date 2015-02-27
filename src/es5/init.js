"use strict";

var init = regeneratorRuntime.mark(

// init :: [a] -> [a]
// [a] should be non-empty
function init(a) {
  var _getIteratorAndObj, xsIt, itObj;

  return regeneratorRuntime.wrap(function init$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!a[Symbol.iterator]().next().done) {
          context$1$0.next = 2;
          break;
        }

        throw new Error("Cannot get init of empty list");

      case 2:
        _getIteratorAndObj = getIteratorAndObj(a);
        xsIt = _getIteratorAndObj.xsIt;
        itObj = _getIteratorAndObj.itObj;

        xsIt.next();

      case 6:
        if (itObj.done) {
          context$1$0.next = 11;
          break;
        }

        context$1$0.next = 9;
        return xsIt.next().value;

      case 9:
        context$1$0.next = 6;
        break;

      case 11:
      case "end":
        return context$1$0.stop();
    }
  }, init, this);
});
var getIteratorAndObj = require("./util").getIteratorAndObj;

module.exports = init;
//drop first element