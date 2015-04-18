let cu = require('auto-curry');


// zip3 :: [a] -> [b] -> [c] -> [(a, b, c)]
function* zip3(a, b, c) {
  let aIterator = a[Symbol.iterator]();
  let bIterator = b[Symbol.iterator]();
  let cIterator = c[Symbol.iterator]();
  let aObj      = aIterator.next();
  let bObj      = bIterator.next();
  let cObj      = cIterator.next();

  while (!aObj.done && !bObj.done && !cObj.done) {
    yield [aObj.value, bObj.value, cObj.value];
    aObj = aIterator.next();
    bObj = bIterator.next();
    cObj = cIterator.next();
  }
}


module.exports = cu(zip3);
