var cu = require('auto-curry');


// zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
function* zipWith(f, a, b) {
  var aIterator = a[Symbol.iterator]();
  var bIterator = b[Symbol.iterator]();
  var aObj      = aIterator.next();
  var bObj      = bIterator.next();

  while (!aObj.done && !bObj.done) {
    yield f(aObj.value, bObj.value);
    aObj = aIterator.next();
    bObj = bIterator.next();
  }
}


module.exports = cu(zipWith);
