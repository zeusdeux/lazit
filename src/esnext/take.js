var cu = require('auto-curry');


// take :: Int -> [a] -> [a]
function* take(n, a) {
  for (let x of a) {
    if (n--) {
      yield x;
    }
    else {
      break;
    }
  }
}

module.exports = cu(take);
