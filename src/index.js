/* jshint esnext:true */

var cu = require('auto-curry');


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
  var l = [],
    r = [];
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
  var l = [],
    r = [];
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
  var l = [],
    r = [];
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

// zip :: [a] -> [b] -> [[a,b]]
// not lazy on its arguments as of now
function* zip(a, b) {
  var i = 0;
  // eagerly expanding the iterators given to it
  // still have to figure out how I can do this lazily
  // can I delegate to an iterator? like yield* for generators?
  // *assumes the thinker pose*
  a = [...a];
  b = [...b];
  while (i < a.length && i < b.length) {
    yield [a[i], b[i]];
    i++;
  }
}

// zip3 :: [a] -> [b] -> [c] -> [(a, b, c)]
function* zip3(a, b, c) {
  var i = 0;
  // eagerly expanding the iterators given to it
  // still have to figure out how I can do this lazily
  // can I delegate to an iterator? like yield* for generators?
  // *assumes the thinker pose*
  a = [...a];
  b = [...b];
  c = [...c];
  while (i < a.length && i < b.length && i < c.length) {
    yield [a[i], b[i], c[i]];
    i++;
  }
}

// zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
function* zipWith(f, a, b) {
  var i = 0;
  a = [...a];
  b = [...b];
  while (i < a.length && i < b.length) {
    yield f(a[i], b[i]);
    i++;
  }
}

// zipWith3 :: (a -> b -> c -> d) -> [a] -> [b] -> [c] -> [d]
function* zipWith3(f, a, b, c) {
  var i = 0;
  a = [...a];
  b = [...b];
  c = [...c];
  while (i < a.length && i < b.length && i < c.length) {
    yield f(a[i], b[i], c[i]);
    i++;
  }
}

// unzip :: [(a, b)] -> ([a], [b])
function unzip(a) {
  var l = [],
    r = [],
    skip = false;
  for (let x of a) {
    for (let y of x) {
      if (!skip) {
        l.push(y);
        skip = true;
      }
      else r.push(y);
    }
    skip = false;
  }
  return [l, r];
}

// unzip3 :: [(a, b, c)] -> ([a], [b], [c])



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
  zipWith3: cu(zipWith3)
};
