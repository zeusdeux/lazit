var drop = require('./drop');


// tail :: [a] -> [a]
// [a] should be non-empty
function* tail(a) {
  if (a[Symbol.iterator]().next().done) throw new Error('Cannot get tail of empty list');
  yield* drop(1, a);
}

module.exports = tail;
