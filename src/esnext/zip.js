let cu = require('auto-curry');


// zip :: [a] -> [b] -> [[a,b]]
function* zip(a, b) {
  let aIterator = a[Symbol.iterator]();
  let bIterator = b[Symbol.iterator]();
  let aObj      = aIterator.next();
  let bObj      = bIterator.next();

  while (!aObj.done && !bObj.done) {
    yield [aObj.value, bObj.value];
    aObj = aIterator.next();
    bObj = bIterator.next();
  }
}


module.exports = cu(zip);
