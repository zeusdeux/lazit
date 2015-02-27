var cu = require('auto-curry');


// zip :: [a] -> [b] -> [[a,b]]
function* zip(a, b) {
  var aIterator = a[Symbol.iterator]();
  var bIterator = b[Symbol.iterator]();
  var aObj = aIterator.next();
  var bObj = bIterator.next();
  while (!aObj.done && !bObj.done) {
    yield [aObj.value, bObj.value];
    aObj = aIterator.next();
    bObj = bIterator.next();
  }
}


module.exports = cu(zip);
