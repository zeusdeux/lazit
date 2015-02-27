var cu = require('auto-curry');


// zip3 :: [a] -> [b] -> [c] -> [(a, b, c)]
function* zip3(a, b, c) {
  var aIterator = a[Symbol.iterator]();
  var bIterator = b[Symbol.iterator]();
  var cIterator = c[Symbol.iterator]();
  var aObj = aIterator.next();
  var bObj = bIterator.next();
  var cObj = cIterator.next();
  while (!aObj.done && !bObj.done && !cObj.done) {
    yield [aObj.value, bObj.value, cObj.value];
    aObj = aIterator.next();
    bObj = bIterator.next();
    cObj = cIterator.next();
  }
}


module.exports = cu(zip3);
