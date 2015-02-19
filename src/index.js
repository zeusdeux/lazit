/* jshint esnext:true */

var cu = require('auto-curry');
var clone = require('clone');

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

// map :: (a -> b) -> [a] -> [b]
function* map(f, a) {
  for (let x of a) yield f(x);
}

// filter :: (a -> Bool) -> [a] -> [a]
function* filter(p, a) {
  for (let x of a)
    if (p(x)) yield x;
}

// head :: [a] -> a
function head(a) {
  if (!a.length) throw new Error('Cannot get head of empty list');
  for (let x of a) {
    return x;
  }
}

// last :: [a] -> a
// [a] must be finite and non-empty
function last(a) {
  if (!a.length) throw new Error('Cannot get last of empty list');
  if (!Array.isArray(a)) a = [...a];
  return a[a.length - 1];
}

// tail :: [a] -> [a]
// [a] should be non-empty
function* tail(a) {
  if (!a.length) throw new Error('Cannot get tail of empty list');
  yield * drop(1, a);
}

// init :: [a] -> [a]
// [a] should be non-empty
// [a] should be finite (diverges from how it is in haskell)
// an infinite [a] is currently impossible to get the init of since
// I can never know when the generator/array is gonna end until it ends
function* init(a) {
  if (!a.length) throw new Error('Cannot get init of empty list');
  if (!Array.isArray(a)) a = [...a];
  yield * take(a.length - 1, a);
}

// null :: [a] -> Bool
// not needed since you can test array.length

// length :: [a] -> Int
// not needed since we have array.length

// reverse :: [a] -> [a]
// [a] should be finite
function* reverse(a) {
  if (!Array.isArray(a)) a = [...a];
  var i = a.length;
  while (i > 0) yield a[--i];
}

// take :: Int -> [a] -> [a]
function* take(n, a) {
  for (let x of a) {
    if (n--) yield x;
    else break;
  }
}

// drop :: Int -> [a] -> [a]
function* drop(n, a) {
  for (let x of a) {
    if (n) {
      --n;
      continue;
    }
    else yield x;
  }
}

// splitAt :: Int -> [a] -> ([a], [a])
function splitAt(i, a) {
  var l = [], r = [];
  for (let x of a) {
    if (i) {
      l.push(x);
      i--;
    }
    else r.push(x);
  }
  return [l, r];
}

// takeWhile :: (a -> Bool) -> [a] -> [a]
function* takeWhile(p, a) {
  for (let x of a) {
    if (p(x)) yield x;
    else break;
  }
}

// dropWhile :: (a -> Bool) -> [a] -> [a]
function* dropWhile(p, a) {
  var doneDropping = false;
  for (let x of a) {
    if (p(x) && !doneDropping) continue;
    else {
      doneDropping = true;
      yield x;
    }
  }
}

// span :: (a -> Bool) -> [a] -> ([a], [a])
function span(p, a) {
  var l = [], r = [];
  var doneTaking = false;
  for (let x of a) {
    if (p(x) && !doneTaking) l.push(x);
    else {
      doneTaking = true;
      r.push(x);
    }
  }
  return [l, r];
}

// break :: (a -> Bool) -> [a] -> ([a], [a])
// calling it spanInv which stands for spanInverse
// since break is a reserved word
function spanInv(p, a) {
  var l = [], r = [];
  var doneTaking = false;
  for (let x of a) {
    if (!p(x) && !doneTaking) l.push(x);
    else {
      doneTaking = true;
      r.push(x);
    }
  }
  return [l, r];
}

// zips

// zipN :: [a] -> [b] .... -> [n] -> [[a..n]]
// zips n lists together
function* zipN(...args) {
  var iterators = args.map(v => v[Symbol.iterator]());
  var itObjs = iterators.map(v => v.next());

  while (itObjs.filter(v => !v.done).length === itObjs.length) {
    yield itObjs.map(v => v.value);
    itObjs = iterators.map(v => v.next());
  }
}

// zipWithN :: (a -> b -> .... -> n -> x) -> [a] -> [b] -> .... -> [n] -> [x]
// applies a function to a each element in a zip of n lists and returns new list
function* zipWithN(f, ...args){
  var iterators = args.map(v => v[Symbol.iterator]());
  var itObjs = iterators.map(v => v.next());

  while (itObjs.filter(v => !v.done).length === itObjs.length) {
    let temp = itObjs.map(v => v.value);
    yield f.apply(null, temp);
    itObjs = iterators.map(v => v.next());
  }
}

// specialized zips below

// zip :: [a] -> [b] -> [[a,b]]
// not lazy on its arguments as of now
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

// zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
function* zipWith(f, a, b) {
  var aIterator = a[Symbol.iterator]();
  var bIterator = b[Symbol.iterator]();
  var aObj = aIterator.next();
  var bObj = bIterator.next();
  while (!aObj.done && !bObj.done) {
    yield f(aObj.value, bObj.value);
    aObj = aIterator.next();
    bObj = bIterator.next();
  }
}

// zipWith3 :: (a -> b -> c -> d) -> [a] -> [b] -> [c] -> [d]
function* zipWith3(f, a, b, c) {
  var aIterator = a[Symbol.iterator]();
  var bIterator = b[Symbol.iterator]();
  var cIterator = c[Symbol.iterator]();
  var aObj = aIterator.next();
  var bObj = bIterator.next();
  var cObj = cIterator.next();
  while (!aObj.done && !bObj.done && !cObj.done) {
    yield f(aObj.value, bObj.value, cObj.value);
    aObj = aIterator.next();
    bObj = bIterator.next();
    cObj = cIterator.next();
  }
}

// unzipN :: [(a, b, .... , n)] -> ([a], [b], ...., [n])
function unzipN(a){
  var res = [...replicate(a.length, [])];
  for (let x of a) {
    for (let y of x) {
      let curr = res.shift();
      curr.push(y);
      res.push(curr);
    }
  }
  return res;
}

// unzip :: [(a, b)] -> ([a], [b])
function unzip(a) {
  var res = [[], []];
  for (let x of a) {
    for (let y of x) {
      let curr = res.shift();
      curr.push(y);
      res.push(curr);
    }
  }
  return res;
}

// unzip3 :: [(a, b, c)] -> ([a], [b], [c])
function unzip3(a){
  var res = [[], [], []];
  for (let x of a) {
    for (let y of x) {
      let curr = res.shift();
      curr.push(y);
      res.push(curr);
    }
  }
  return res;
}

// building lists

// scans
// scanl :: (b -> a -> b) -> b -> [a] -> [b]
function* scanl(f, b, a){
  for (let x of a) {
    yield b;
    b = f(b, x);
  }
  yield b;
}

// scanl1 :: (a -> a -> a) -> [a] -> [a]
// scanl1 f [x1, x2, ...] == [x1, x1 `f` x2, ...]
function* scanl1(f, a){
  var prev = null;
  for (let x of a){
    if (null !== prev) x = f(prev, x);
    yield x;
    prev = x;
  }
}

// scanr :: (a -> b -> b) -> b -> [a] -> [b]
// function* scanr(f, b, a){

// }


// infinite lists
// iterate :: (a -> a) -> a -> [a]
function* iterate(f, a){
  while(true) {
    // See the comment in repeat
    if (!isObject(a)) yield a; else yield clone(a);
    a = f(a);
  }
}

// repeat :: a -> [a]
function* repeat(a){
  // cloning since objects are basically pointers in js.
  // If I just `yield a` then all the elements in the resulting
  // list will contain reference to the same object and all hell
  // will break loose, it'll rain cows and horses, ketchup will
  // replace water and all the liquour in the world will disappear.
  // Saving your life here, man.
  while(true) if (!isObject(a)) yield a; else yield clone(a);
}

// replicate :: Int -> a -> [a]
function replicate(n, a){
  var res = [];
  // See the comment in repeat
  while (n--) if (!isObject(a)) res.push(a); else res.push(clone(a));
  return res;
}

// cycle :: [a] -> [a]
function* cycle(a){
  while(true){
    // See the comment in repeat
    for (let x of a) if (!isObject(x)) yield x; else yield clone(x);
  }
}

module.exports = {
  map: cu(map),
  filter: cu(filter),
  head: head,
  last: last,
  tail: tail,
  init: init,
  reverse: reverse,
  take: cu(take),
  drop: cu(drop),
  splitAt: cu(splitAt),
  takeWhile: cu(takeWhile),
  dropWhile: cu(dropWhile),
  span: cu(span),
  spanInv: cu(spanInv),
  zip: cu(zip),
  zip3: cu(zip3),
  zipWith: cu(zipWith),
  zipWith3: cu(zipWith3),
  zipN: cu(zipN),
  zipWithN: cu(zipWithN),
  unzip: unzip,
  unzip3: unzip3,
  scanl: cu(scanl),
  scanl1: cu(scanl1),
  iterate: cu(iterate),
  repeat: repeat,
  replicate: cu(replicate),
  cycle: cycle
};
