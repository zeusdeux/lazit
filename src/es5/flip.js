"use strict";

// flip :: (a -> b -> c) -> b -> a -> c
function flip(f) {
  return function () {
    return f.call(null, arguments[1], arguments[0]);
  };
}

module.exports = flip;