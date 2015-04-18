let cu = require('auto-curry');


// zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
function* zipWith(f, a, b) {
  let aIterator = a[Symbol.iterator]();
  let bIterator = b[Symbol.iterator]();
  let aObj      = aIterator.next();
  let bObj      = bIterator.next();

  while (!aObj.done && !bObj.done) {
    yield f(aObj.value, bObj.value);
    aObj = aIterator.next();
    bObj = bIterator.next();
  }
}


module.exports = cu(zipWith);
