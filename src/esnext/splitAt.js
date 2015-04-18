let cu = require('auto-curry');


// splitAt :: Int -> [a] -> ([a], [a])
function splitAt(i, a) {
  let l = [], r = [];

  for (let x of a) {
    if (i) {
      l.push(x);
      i--;
    }
    else r.push(x);
  }
  return [l, r];
}


module.exports = cu(splitAt);
