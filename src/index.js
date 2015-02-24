/* jshint esnext:true */

var clone             = require('clone');
var cu                = require('auto-curry');
var isObject          = require('./util').isObject;
var getIteratorAndObj = require('./util').getIteratorAndObj;

// flip :: (a -> b -> c) -> b -> a -> c
function flip(f){
  return function(...args){
    return f.call(null, args[1], args[0]);
  };
}

// map :: (a -> b) -> [a] -> [b]
function* map(f, a) {
  for (let x of a) yield f(x);
}

// concat :: [a] -> [a] -> [a]
// Append two lists
// If the first list is not finite, the result is the first list.
function* concat(a, b) {
  for (let x of a) yield x;
  for (let x of b) yield x;
}

// filter :: (a -> Bool) -> [a] -> [a]
function* filter(p, a) {
  for (let x of a)
    if (p(x)) yield x;
}

// head :: [a] -> a
function head(a) {
  if (a[Symbol.iterator]().next().done) throw new Error('Cannot get head of empty list');
  for (let x of a) return x;
}

// last :: [a] -> a
// [a] must be finite and non-empty
function last(a) {
  if (a[Symbol.iterator]().next().done) throw new Error('Cannot get last of empty list');
  if (!Array.isArray(a)) a = [...a];
  return a[a.length - 1];
}

// tail :: [a] -> [a]
// [a] should be non-empty
function* tail(a) {
  if (a[Symbol.iterator]().next().done) throw new Error('Cannot get tail of empty list');
  yield* drop(1, a);
}

// init :: [a] -> [a]
// [a] should be non-empty
function* init(a) {
  if (a[Symbol.iterator]().next().done) throw new Error('Cannot get init of empty list');
  var {xsIt, itObj} = getIteratorAndObj(a);
  xsIt.next(); //drop first element
  while (!itObj.done) yield xsIt.next().value;
}

// null :: [a] -> Bool
// not needed since you can test array.length

// length :: [a] -> Int
// not needed since we have array.length

// reverse :: [a] -> [a]
// [a] should be finite
function reverse(a) {
  var res = [];
  for (let x of a) res.unshift(x);
  return res;
}

// reducing lists
// foldl :: (b -> a -> b) -> b -> [a] -> b
// input list must be finite
function foldl(f, acc, xs) {
  var {xsIt, itObj} = getIteratorAndObj(xs);

  // unrolling recursive foldl definition
  // into a simple loop
  // like a tail call optimizer would have done
  while (!itObj.done) {
    acc = f(acc, itObj.value);
    itObj = xsIt.next();
  }
  return acc;
}

// foldl1 :: (a -> a -> a) -> [a] -> a
function foldl1(f, xs) {
  var {xsIt, itObj} = getIteratorAndObj(xs);
  var acc = itObj.value;
  var nextVal;

  if (itObj.done) throw new Error('Cannot apply foldl1 to an empty list');

  itObj = xsIt.next();
  nextVal = itObj.value;

  while (!itObj.done) {
    acc = f(acc, nextVal);
    itObj = xsIt.next();
    nextVal = itObj.value;
  }
  return acc;
}

// foldr :: (a -> b -> b) -> b -> [a] -> b
function foldr(f, acc, xs) {
  var xsIt = xs[Symbol.iterator]();
  return _foldr(f, acc, xsIt);

  function _foldr(_f, _acc, _xsIt) {
    let _itObj = _xsIt.next();
    if (_itObj.done) return _acc;
    return _f(_itObj.value, _foldr(_f, _acc, _xsIt));
  }
}

// foldr1 :: (a -> a -> a) -> [a] -> a
function foldr1(f, xs) {
  var {xsIt, itObj} = getIteratorAndObj(xs);
  if (itObj.done) throw new Error('Cannot apply foldr1 to an empty list');
  return _foldr1(f, itObj.value, xsIt);

  function _foldr1(_f, _acc, _xsIt) {
    let _itObj = _xsIt.next();
    if (_itObj.done) return _acc;
    return _f(_acc, _foldr1(_f, _itObj.value, _xsIt));
  }
}

// building lists

// scans
// scanl :: (b -> a -> b) -> b -> [a] -> [b]
function* scanl(f, acc, xs) {
  for (let x of xs) {
    yield acc;
    acc = f(acc, x);
  }
  yield acc;
}

// scanl1 :: (a -> a -> a) -> [a] -> [a]
// scanl1 f [x1, x2, ...] == [x1, x1 `f` x2, ...]
function* scanl1(f, xs) {
  var prev = null;
  for (let x of xs) {
    if (null !== prev) x = f(prev, x);
    yield x;
    prev = x;
  }
}

// scanr :: (a -> b -> b) -> b -> [a] -> [b]
function scanr(f, acc, xs){
  var xsIt = xs[Symbol.iterator]();
  return _scanr(f, acc, xsIt);

  function _scanr(_f, _b, _aIt) {
    let _aObj = _aIt.next();
    if (_aObj.done) return [_b];
    let ys = _scanr(_f, _b, _aIt);
    ys.unshift(_f(_aObj.value, ys[0]));
    return ys;
  }
}

// fix this implementation ffs
// scanr1 :: (a -> a -> a) -> [a] -> [a]
// function scanr1(f, xs){
//   var itObj = xs[Symbol.iterator]().next();
//   if (itObj.done) return [];
//   else return _scanr1(f, itObj.value, xs[Symbol.iterator]());

//   function _scanr1(_f, _b, _aIt) {
//     let _aObj = _aIt.next();
//     if (_aObj.done) return _b;
//     let ys = _scanr1(_f, _b, _aIt);
//     if (Array.isArray(ys)) ys.unshift(_f(_aObj.value, ys[0]));
//     else {
//       let temp = [];
//       temp.push(_f(_aObj.value, ys));
//       ys = temp;
//     }
//     return ys;
//   }
// }

// infinite lists
// iterate :: (a -> a) -> a -> [a]
function* iterate(f, a) {
  while (true) {
    // See the comment in repeat
    if (!isObject(a)) yield a;
    else yield clone(a);
    a = f(a);
  }
}

// repeat :: a -> [a]
function* repeat(a) {
  // cloning since objects are basically pointers in js.
  // If I just `yield a` then all the elements in the resulting
  // list will contain reference to the same object and all hell
  // will break loose, it'll rain cows and horses, ketchup will
  // replace water and all the liquour in the world will disappear.
  // Saving your life here, man.
  while (true) {
    if (!isObject(a)) yield a;
    else yield clone(a);
  }
}

// replicate :: Int -> a -> [a]
function replicate(n, a) {
  var res = [];
  // See the comment in repeat
  while (n--) {
    if (!isObject(a)) res.push(a);
    else res.push(clone(a));
  }
  return res;
}

// cycle :: [a] -> [a]
function* cycle(a) {
  while (true) {
    // See the comment in repeat
    for (let x of a) {
      if (!isObject(x)) yield x;
      else yield clone(x);
    }
  }
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
function* zipWithN(f, ...args) {
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
function unzipN(a) {
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
  var res = [
    [],
    []
  ];
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
function unzip3(a) {
  var res = [
    [],
    [],
    []
  ];
  for (let x of a) {
    for (let y of x) {
      let curr = res.shift();
      curr.push(y);
      res.push(curr);
    }
  }
  return res;
}

module.exports = {
  flip: flip,
  map: cu(map),
  concat: cu(concat),
  filter: cu(filter),
  head: head,
  last: last,
  tail: tail,
  init: init,
  reverse: reverse,
  foldl: cu(foldl),
  foldl1: cu(foldl1),
  foldr: cu(foldr),
  foldr1: cu(foldr1),
  scanl: cu(scanl),
  scanl1: cu(scanl1),
  scanr: cu(scanr),
//  scanr1: cu(scanr1),
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
  unzipN: unzipN,
  iterate: cu(iterate),
  repeat: repeat,
  replicate: cu(replicate),
  cycle: cycle
};
