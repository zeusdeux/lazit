var cu = require('auto-curry');


// zipWith3 :: (a -> b -> c -> d) -> [a] -> [b] -> [c] -> [d]
function* zipWith3(f, a, b, c) {
  var aIterator = a[Symbol.iterator]();
  var bIterator = b[Symbol.iterator]();
  var cIterator = c[Symbol.iterator]();
  var aObj      = aIterator.next();
  var bObj      = bIterator.next();
  var cObj      = cIterator.next();

  while (!aObj.done && !bObj.done && !cObj.done) {
    yield f(aObj.value, bObj.value, cObj.value);
    aObj = aIterator.next();
    bObj = bIterator.next();
    cObj = cIterator.next();
  }
}


module.exports = cu(zipWith3);
