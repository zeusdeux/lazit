var cu = require('auto-curry');


// scanl :: (b -> a -> b) -> b -> [a] -> [b]
function* scanl(f, acc, xs) {
  for (let x of xs) {
    yield acc;
    acc = f(acc, x);
  }
  yield acc;
}

module.exports = cu(scanl);
