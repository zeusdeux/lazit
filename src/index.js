/* jshint esnext:true */

var cu = require('auto-curry');

// make Numbers iterable
// so that we can do stuff like [...4] and get [0,1,2,3]
// Number.prototype[Symbol.iterator] = function*() {
//   var i = 0,
//     val = this.valueOf();
//   while (i < val) yield i++;
// };

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
function splitAt(i, a){
  var l = [], r = [];
  for (let x of a){
    if (i) l.push(x), i--;
    else r.push(x);
  }
  return [l, r];
}

// takeWhile :: (a -> Bool) -> [a] -> [a]
function* takeWhile(p, a){
  for (let x of a) {
    if (p(x)) yield x;
    else break;
  }
}

// dropWhile :: (a -> Bool) -> [a] -> [a]
function* dropWhile(p, a){
  var doneDropping = false;
  for (let x of a){
    if (p(x) && !doneDropping) continue;
    else {
      doneDropping = true;
      yield x;
    }
  }
}

// span :: (a -> Bool) -> [a] -> ([a], [a])
function span(p, a){
  var l = [], r = [];
  var doneTaking = false;
  for (let x of a){
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
function spanInv(p, a){
  var l = [], r = [];
  var doneTaking = false;
  for (let x of a){
    if (!p(x) && !doneTaking) l.push(x);
    else {
      doneTaking = true;
      r.push(x);
    }
  }
  return [l, r];
}

// zips

// zip :: [a] -> [b] -> [[a,b]]
function* zip(a, b) {
  for (x of a) {

  }
}

// zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
function* zipWith(f, a, b) {
  var i = 0;
  while (i < a.length && i < b.length) yield f(a[i], b[i]), i++;
}


module.exports = {
  zip: cu(zip),
  zipWith: cu(zipWith),
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
  spanInv: cu(spanInv)
};
