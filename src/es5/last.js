"use strict";

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

// last :: [a] -> a
// [a] must be finite and non-empty
function last(a) {
  if (a[Symbol.iterator]().next().done) throw new Error("Cannot get last of empty list");
  if (!Array.isArray(a)) a = [].concat(_toConsumableArray(a));
  return a[a.length - 1];
}

module.exports = last;