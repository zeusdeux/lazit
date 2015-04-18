// check if arg is an object
// isObject :: a -> Bool
exports.isObject = function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
};

// get iterator and object returned by iterator
// getIteratorAndObj :: (Iterable a) => a -> Object
exports.getIteratorAndObj = function getIteratorAndObj(iterable) {
  let xsIt  = iterable[Symbol.iterator]();
  let itObj = xsIt.next();

  return {xsIt, itObj};
};
