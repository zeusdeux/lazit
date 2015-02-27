"use strict";

// check if arg is an object
// isObject :: a -> Bool
exports.isObject = function isObject(arg) {
  return typeof arg === "object" && arg !== null;
};

// get iterator and object returned by iterator
// getIteratorAndObj :: (Iterable a) => a -> Object
exports.getIteratorAndObj = function getIteratorAndObj(iterable) {
  var xsIt = iterable[Symbol.iterator]();
  var itObj = xsIt.next();
  return { xsIt: xsIt, itObj: itObj };
};