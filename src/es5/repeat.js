"use strict";

var repeat = regeneratorRuntime.mark(

// repeat :: a -> [a]
function repeat(a) {
  return regeneratorRuntime.wrap(function repeat$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!true) {
          context$1$0.next = 10;
          break;
        }

        if (isObject(a)) {
          context$1$0.next = 6;
          break;
        }

        context$1$0.next = 4;
        return a;

      case 4:
        context$1$0.next = 8;
        break;

      case 6:
        context$1$0.next = 8;
        return clone(a);

      case 8:
        context$1$0.next = 0;
        break;

      case 10:
      case "end":
        return context$1$0.stop();
    }
  }, repeat, this);
});
var clone = require("clone");
var isObject = require("./util").isObject;

module.exports = repeat;

// cloning since objects are basically pointers in js.
// If I just `yield a` then all the elements in the resulting
// list will contain reference to the same object and all hell
// will break loose, it'll rain cows and horses, ketchup will
// replace water and all the liquour in the world will disappear.
// Saving your life here, man.