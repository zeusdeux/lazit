let cu = require('auto-curry');


// zipWith3 :: (a -> b -> c -> d) -> [a] -> [b] -> [c] -> [d]
function* zipWith3(f, a, b, c) {
  let aIterator = a[Symbol.iterator]();
  let bIterator = b[Symbol.iterator]();
  let cIterator = c[Symbol.iterator]();
  let aObj      = aIterator.next();
  let bObj      = bIterator.next();
  let cObj      = cIterator.next();

  while (!aObj.done && !bObj.done && !cObj.done) {
    yield f(aObj.value, bObj.value, cObj.value);
    aObj = aIterator.next();
    bObj = bIterator.next();
    cObj = cIterator.next();
  }
}


module.exports = cu(zipWith3);
