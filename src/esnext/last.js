// last :: [a] -> a
// [a] must be finite and non-empty
function last(a) {
  if (a[Symbol.iterator]().next().done) throw new Error('Cannot get last of empty list');
  if (!Array.isArray(a)) a = [...a];
  return a[a.length - 1];
}

module.exports = last;
