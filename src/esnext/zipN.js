/*eslint no-loop-func:0*/

// zipN :: [a] -> [b] .... -> [n] -> [[a..n]]
// zips n lists together
// zipN does NOT auto-curry since there's no way of
// knowing it's arity till it's called i.e., it's
// variadic and hence cannot be curried in javascript
function* zipN(...args) {
  let iterators = args.map(v => v[Symbol.iterator]());
  let itObjs = iterators.map(v => v.next());

  while (itObjs.filter(v => !v.done).length === itObjs.length) {
    yield itObjs.map(v => v.value);
    itObjs = iterators.map(v => v.next());
  }
}


module.exports = zipN;
