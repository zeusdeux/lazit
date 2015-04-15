// zipN :: [a] -> [b] .... -> [n] -> [[a..n]]
// zips n lists together
// zipN does NOT auto-curry since there's no way of
// knowing it's arity till it's called i.e., it's
// variadic and hence cannot be curried in javascript
function* zipN(...args) {
  var iterators = args.map(v => v[Symbol.iterator]());
  var itObjs = iterators.map(v => v.next());

  while (itObjs.filter(v => !v.done).length === itObjs.length) {
    yield itObjs.map(v => v.value);
    itObjs = iterators.map(v => v.next());
  }
}


module.exports = zipN;
