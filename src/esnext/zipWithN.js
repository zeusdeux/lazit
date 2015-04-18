/*eslint no-loop-func:0*/

// zipWithN :: (a -> b -> .... -> n -> x) -> [a] -> [b] -> .... -> [n] -> [x]
// applies a function to a each element in a zip of n lists and returns new list
// zipWithN does NOT auto-curry since it's variadic
function* zipWithN(f, ...args) {
  let iterators = args.map(v => v[Symbol.iterator]());
  let itObjs    = iterators.map(v => v.next());

  while (itObjs.filter(v => !v.done).length === itObjs.length) {
    let temp = itObjs.map(v => v.value);

    yield f.apply(null, temp);
    itObjs = iterators.map(v => v.next());
  }
}

module.exports = zipWithN;
