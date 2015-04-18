"use strict";

// head :: [a] -> a
function head(a) {
  var first = a[Symbol.iterator]().next();

  if (first.done) throw new Error("Cannot get head of empty list");
  return first.value;
}

module.exports = head;