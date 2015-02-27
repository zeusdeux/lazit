// head :: [a] -> a
function head(a) {
  if (a[Symbol.iterator]().next().done) throw new Error('Cannot get head of empty list');
  for (let x of a) return x;
}

module.exports = head;
