"use strict";

var iterate = regeneratorRuntime.mark(

// iterate :: (a -> a) -> a -> [a]
function iterate(f, a) {
  return regeneratorRuntime.wrap(function iterate$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!true) {
          context$1$0.next = 11;
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
        a = f(a);
        context$1$0.next = 0;
        break;

      case 11:
      case "end":
        return context$1$0.stop();
    }
  }, iterate, this);
});
var clone = require("clone");
var cu = require("auto-curry");
var isObject = require("./util").isObject;

module.exports = cu(iterate);

// See the comment in repeat