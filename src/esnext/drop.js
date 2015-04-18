let cu = require('auto-curry');


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

module.exports = cu(drop);
