"use strict";

var init = regeneratorRuntime.mark(

// init :: [a] -> [a]
// [a] should be non-empty
function init(a) {
  var _getIteratorAndObj, xsIt, itObj, nextObj;

  return regeneratorRuntime.wrap(function init$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _getIteratorAndObj = getIteratorAndObj(a);
        xsIt = _getIteratorAndObj.xsIt;
        itObj = _getIteratorAndObj.itObj;
        nextObj = xsIt.next();

        if (!itObj.done) {
          context$1$0.next = 6;
          break;
        }

        throw new Error("Cannot get init of empty list");

      case 6:
        if (nextObj.done) {
          context$1$0.next = 13;
          break;
        }

        context$1$0.next = 9;
        return itObj.value;

      case 9:
        itObj = nextObj;
        nextObj = xsIt.next();
        context$1$0.next = 6;
        break;

      case 13:
      case "end":
        return context$1$0.stop();
    }
  }, init, this);
});
var getIteratorAndObj = require("./util").getIteratorAndObj;

module.exports = init;