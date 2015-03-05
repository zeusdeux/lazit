// tail :: [a] -> [a]
// [a] should be non-empty
function* tail(a) {
  var aIt  = a[Symbol.iterator]();
  var aObj = aIt.next();

  if (aObj.done) throw new Error('Cannot get tail of empty list');
  while (true) {
    aObj = aIt.next();
    if (aObj.done) break;
    else yield aObj.value;
  }
}

module.exports = tail;
