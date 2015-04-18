"use strict";

var zipN = regeneratorRuntime.mark( /*eslint no-loop-func:0*/

// zipN :: [a] -> [b] .... -> [n] -> [[a..n]]
// zips n lists together
// zipN does NOT auto-curry since there's no way of
// knowing it's arity till it's called i.e., it's
// variadic and hence cannot be curried in javascript
function zipN() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var iterators, itObjs;
  return regeneratorRuntime.wrap(function zipN$(context$1$0) {
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
          context$1$0.next = 8;
          break;
        }

        context$1$0.next = 5;
        return itObjs.map(function (v) {
          return v.value;
        });

      case 5:
        itObjs = iterators.map(function (v) {
          return v.next();
        });
        context$1$0.next = 2;
        break;

      case 8:
      case "end":
        return context$1$0.stop();
    }
  }, zipN, this);
});

module.exports = zipN;