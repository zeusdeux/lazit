"use strict";

var zipWithN = regeneratorRuntime.mark( /*eslint no-loop-func:0*/

// zipWithN :: (a -> b -> .... -> n -> x) -> [a] -> [b] -> .... -> [n] -> [x]
// applies a function to a each element in a zip of n lists and returns new list
// zipWithN does NOT auto-curry since it's variadic
function zipWithN(f) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var iterators, itObjs, temp;
  return regeneratorRuntime.wrap(function zipWithN$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        iterators = args.map(function (v) {
          return v[Symbol.iterator]();
        });
        itObjs = iterators.map(function (v) {
          return v.next();
        });

      case 2:
        if (!(itObjs.filter(function (v) {
          return !v.done;
        }).length === itObjs.length)) {
          context$1$0.next = 9;
          break;
        }

        temp = itObjs.map(function (v) {
          return v.value;
        });
        context$1$0.next = 6;
        return f.apply(null, temp);

      case 6:
        itObjs = iterators.map(function (v) {
          return v.next();
        });
        context$1$0.next = 2;
        break;

      case 9:
      case "end":
        return context$1$0.stop();
    }
  }, zipWithN, this);
});

module.exports = zipWithN;