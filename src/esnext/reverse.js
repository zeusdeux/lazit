// reverse :: [a] -> [a]
// [a] should be finite
function reverse(a) {
  let res = [];

  for (let x of a) res.unshift(x);
  return res;
}

module.exports = reverse;
